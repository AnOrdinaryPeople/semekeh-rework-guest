<template>
    <div>
        <bread :title="data.title ? data.title : null" :use-bread="data.title ? false : true" />

        <b-container v-if="ready" class="my-4">
            <b-row>
                <b-col sm="12" md="8" lg="8">
                    <div class="detail-img">
                        <img :src="sauce('storage/' + data.banner)" :alt="appName" />
                    </div>
                    <div class="detail-post">
                        <div class="detail-label">
                            <p>{{ $t('media') }}</p>
                        </div>

                        <div class="mb-3">
                            <strong>{{ dateFormat(data.created_at) }}</strong>
                        </div>

                        <markdown :content="data.content" />

                        <share :title="data.title" />
                    </div>
                </b-col>
                <b-col sm="12" md="4" lg="4">
                    <h3 class="text-bpi-blue">{{ $t('other_news') }}</h3>
                    <b-row>
                        <b-col v-for="(i, k) in other" :key="k" cols="12" class="my-3">
                            <nuxt-link class="news-card" :to="`/information-media/news/${i.slug}`">
                                <b-aspect aspect="19:8">
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
                                </b-aspect>
                            </nuxt-link>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <b-container v-else class="my-5">
            <b-row>
                <b-col sm="12" md="8">
                    <b-skeleton-img height="320px" />
                    <skeleton v-for="(i, k) in 4" :key="k" class="mb-4" />

                    <b-row>
                        <b-col v-for="(i, k) in 4" :key="k" cols="1">
                            <b-skeleton type="avatar" />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col sm="12" md="4">
                    <b-skeleton width="55%" />
                    <div v-for="(i, k) in 3" :key="k" class="my-3">
                        <b-skeleton-img no-aspect height="230px" />
                    </div>
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
        data: { title: "" },
        other: [],
        ready: false,
    }),
    async fetch() {
        await this.render();
    },
    methods: {
        async render() {
            const slug = this.$route.params.id,
                g = this.newsDetail[slug];

            this.ready = false;

            if (g) {
                if (typeof g.data === "boolean") this.$router.push("/404");
                else
                    await new Promise((dispatch) =>
                        setTimeout(() => {
                            dispatch(this.setData(g));
                        }, 250)
                    );
            } else
                await (this as any).$axios
                    .get("news/" + slug)
                    .then((r: any) => {
                        if (r.data) {
                            if (!g) {
                                this.setData(r.data);
                                this.setNewsDetail({
                                    name: slug,
                                    data: r.data,
                                });
                            }
                        } else {
                            this.setNewsDetail({ name: slug, data: false });
                            this.$router.push("/404");
                        }
                    });
        },
        setData(data: any) {
            this.data = data.news;
            this.other = data.other;

            (this as any).setMetaHead({
                title: data.news.title,
                desc: data.news.content,
            });

            this.ready = true;
        },
        ...mapActions(["setNewsDetail"]),
    },
    computed: {
        ...mapGetters(["newsDetail"]),
    },
    watch: {
        "$route.params.id": function () {
            this.render();
        },
    },
});
</script>
