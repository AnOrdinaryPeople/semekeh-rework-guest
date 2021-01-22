<template>
    <b-col :md="cls ? 6 : 12" sm="12">
        <ul :class="cls">
            <li v-if="cls === null" class="search-mobile">
                <form>
                    <b-input-group class="pt-2">
                        <b-input-group-prepend>
                            <b-btn type="submit" variant="white">
                                <fa icon="search" />
                                <span class="sr-only">{{ $t('rick_roll') }}</span>
                            </b-btn>
                        </b-input-group-prepend>
                        <b-form-input
                            class="bg-white text-dark border-0"
                            type="search"
                            v-model="q"
                            :placeholder="$t('search')"
                        />
                    </b-input-group>
                </form>
            </li>
            <li>
                <nuxt-link class="dropbtn" to="/employees">{{ $t('employees') }}</nuxt-link>
            </li>
            <li>
                <a
                    class="dropbtn"
                    href="#"
                    @click.prevent
                    v-b-toggle="cls ? 'app-nav-media' : 'app-nav-media-mobile'"
                >{{ $t('media') }}</a>

                <div v-if="cls" id="app-nav-media" class="dropdown-content">
                    <nuxt-link
                        v-for="(i, k) in media"
                        :key="k"
                        class="dropdown-item"
                        :to="'/information-media/' + i"
                    >{{ $t('medias.' + i) }}</nuxt-link>
                </div>
                <b-collapse v-else id="app-nav-media-mobile">
                    <nuxt-link
                        v-for="(i, k) in media"
                        :key="k"
                        class="dropdown-item-responsive"
                        :to="'/information-media/' + i"
                    >{{ $t('medias.' + i) }}</nuxt-link>
                </b-collapse>
            </li>
            <li>
                <a
                    class="dropbtn"
                    href="#"
                    @click.prevent
                    v-b-toggle="cls ? 'app-nav-study' : 'app-nav-study-mobile'"
                >{{ $t('study') }}</a>

                <div v-if="cls" id="app-nav-study" class="dropdown-content">
                    <nuxt-link
                        v-for="(i, k) in nav.study"
                        :key="k"
                        class="dropdown-item"
                        :to="'/study/' + i.slug"
                    >{{ i.title }}</nuxt-link>
                </div>
                <b-collapse v-else id="app-nav-study-mobile">
                    <nuxt-link
                        v-for="(i, k) in nav.study"
                        :key="k"
                        class="dropdown-item-responsive"
                        :to="'/study/' + i.slug"
                    >{{ i.title }}</nuxt-link>
                </b-collapse>
            </li>
            <li>
                <a
                    class="dropbtn"
                    href="#"
                    @click.prevent
                    v-b-toggle="cls ? 'app-nav-prof' : 'app-nav-prof-mobile'"
                >{{ $t('profile') }}</a>

                <div v-if="cls" id="app-nav-prof" class="dropdown-content">
                    <nuxt-link
                        v-for="(i, k) in profile"
                        :key="k"
                        class="dropdown-item"
                        :to="'/profile/' + i"
                    >{{ $t('profiles.' + i.replace(/-/, '_')) }}</nuxt-link>
                    <a
                        class="dropdown-item"
                        :href="nav.bpi"
                        target="_blank"
                        rel="noopener"
                    >{{ $t("profiles.foundation") }}</a>
                </div>
                <b-collapse v-else id="app-nav-prof-mobile">
                    <nuxt-link
                        v-for="(i, k) in profile"
                        :key="k"
                        class="dropdown-item-responsive"
                        :to="'/profile/' + i"
                    >{{ $t('profiles.' + i.replace(/-/, '_')) }}</nuxt-link>
                    <a
                        class="dropdown-item-responsive"
                        :href="nav.bpi"
                        target="_blank"
                        rel="noopener"
                    >{{ $t("profiles.foundation") }}</a>
                </b-collapse>
            </li>
        </ul>
    </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
    props: ["cls"],
    data: () => ({
        q: "",
        profile: [
            "public",
            "vision-mission",
            "student-council",
            "extracurricular",
        ],
        media: ["agenda", "prestations", "galleries"],
    }),
    computed: {
        ...mapGetters(["nav"]),
    },
});
</script>
