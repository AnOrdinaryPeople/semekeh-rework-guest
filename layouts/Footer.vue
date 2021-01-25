<template>
    <div class="footer">
        <b-container>
            <b-row class="back-footer justify-content-center">
                <b-col sm="12" md="6" lg="4" class="p-4">
                    <span class="footer-header">{{ $t('about') }}</span>
                    <hr class="line" />
                    <dl v-for="(i, k) in foot.footer" :key="k" class="text-light">
                        <dt>{{ i.key }}</dt>
                        <dd>{{ i.value }}</dd>
                    </dl>
                </b-col>
                <b-col sm="12" md="6" lg="4" class="p-4">
                    <span class="footer-header">{{ $t('medias.social') }}</span>
                    <hr class="line" />
                    <ul class="list-unstyled">
                        <li>
                            <a
                                v-for="(i, k) in social"
                                :key="k"
                                class="py-2 pr-2"
                                :href="i.link"
                                target="_blank"
                                rel="noopener"
                            >
                                <b-avatar size="2rem" variant="bpi-yellow">
                                    <fa class="text-bpi-blue" :icon="['fab', i.icon]" />
                                    <span class="sr-only">{{ $t('rick_roll') }}</span>
                                </b-avatar>
                            </a>
                        </li>
                    </ul>
                </b-col>
                <b-col sm="12" md="6" lg="4" class="p-4">
                    <span class="footer-header">{{ $t('medias.agenda') }}</span>
                    <hr class="line" />
                    <nuxt-link
                        v-if="foot.agenda"
                        class="text-decoration-none"
                        :to="`/information-agenda/${foot.agenda.slug}`"
                    >
                        <b-row class="footer-agenda" no-gutters>
                            <b-col sm="12" md="4" lg="4">
                                <b-img
                                    class="mb-2"
                                    fluid
                                    width="500"
                                    height="320"
                                    :src="sauce('storage/' + foot.agenda.banner)"
                                    :alt="appName"
                                />
                            </b-col>
                            <b-col sm="12" md="8" lg="8">
                                <div class="px-2">
                                    <p class="text-bpi-yellow mb-1">{{ foot.agenda.time }}</p>
                                    <p class="text-white">{{ foot.agenda.title }}</p>
                                </div>
                            </b-col>
                        </b-row>
                    </nuxt-link>
                </b-col>
            </b-row>
        </b-container>
        <div class="copyright">
            <p>
                {{ `${$t('copyright')} &copy; ${new Date().getFullYear()} - ` }}
                <nuxt-link to="/about">
                    <strong>{{ appName }}</strong>
                </nuxt-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
    computed: {
        ...mapGetters(["foot", "social"]),
    },
});
</script>
