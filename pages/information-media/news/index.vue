<template>
    <div>
        <bread :title="$t('medias.news')" />

        <b-container v-if="ready" class="my-4">
            <b-row id="news-list">
                <b-col v-for="(i, k) in data" :key="k" sm="12" md="4" class="mb-3">
                    <nuxt-link class="news-card" :to="`/information-media/news/${i.slug}`">
                        <div class="card agenda-card">
                            <div class="position-relative">
                                <div class="text-center">
                                    <img
                                        class="card-img"
                                        fluid
                                        :src="sauce('storage/' + i.banner)"
                                        :alt="i.title"
                                    />
                                </div>
                                <div class="agenda-footer px-4">
                                    <span class="news-title">{{ i.title }}</span>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </b-col>
            </b-row>

            <b-pagination
                v-if="data.length > 9"
                class="mt-3"
                v-model="current"
                :total-rows="data.length"
                :per-page="perPage"
                aria-controls="news-list"
            />
        </b-container>
        <b-container v-else class="my-5">
            <b-row>
                <b-col v-for="(i, k) in 8" :key="k" sm="12" md="6" lg="4" class="mb-4">
                    <b-skeleton-img no-aspect height="230px" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
    data: () => ({
        data: [],
        current: 1,
        perPage: 9,
        ready: false,
    }),
    async fetch() {
        if (this.news.length)
            await new Promise((dispatch) =>
                setTimeout(() => {
                    dispatch(this.setData(this.news));
                }, 250)
            );
        else
            await (this as any).$axios.get("news").then((r: any) => {
                this.setData(r.data);
                this.setNews(r.data);
            });
    },
    methods: {
        setData(data: any) {
            this.data = data;
            this.ready = true;

            (this as any).setMetaHead({
                title: this.$t("medias.news"),
            });
        },
        ...mapActions(["setNews"]),
    },
    computed: {
        loop(): any {
            return this.data.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            );
        },
        ...mapGetters(["news"]),
    },
});
</script>
