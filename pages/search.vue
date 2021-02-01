<template>
    <div>
        <!-- I NEED NULL COALESCE REEEEE (2) -->
        <bread
            :title="$route.query.q ? $route.query.q : null"
            :use-bread="$route.query.q ? false : true"
        />

        <b-container v-if="ready" class="my-4">
            <div v-if="agenda.length">
                <b-row no-gutters>
                    <b-col>
                        <hr class="bg-bpi-blue line" />
                    </b-col>
                    <b-col sm="3" lg="2" class="mx-2">
                        <h3 class="text-bpi-blue text-center">{{ $t('medias.agenda') }}</h3>
                    </b-col>
                    <b-col>
                        <hr class="bg-bpi-blue line" />
                    </b-col>
                </b-row>

                <b-row id="agenda-list">
                    <b-col v-for="(i, k) in loop" :key="k" sm="12" md="6" lg="4" class="my-3">
                        <router-link :to="'/information-media/agenda/' + i.slug">
                            <div class="card agenda-card text-center">
                                <div class="position-relative">
                                    <img
                                        class="card-img"
                                        width="450"
                                        height="100%"
                                        :src="sauce('storage/' + i.banner)"
                                        :alt="appName"
                                    />
                                    <div class="card-body card-img-overlay">
                                        <span class="card-title">{{ i.title }}</span>
                                        <p class="card-subtitle text-muted mb-2">{{ i.time }}</p>
                                    </div>
                                    <div class="agenda-footer">
                                        <span class="text-center">
                                            <fa icon="chevron-up" />
                                            <br />
                                            {{ $t('readmore') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </b-col>
                </b-row>

                <b-pagination
                    v-if="agenda.length > 9"
                    class="mt-3"
                    v-model="current"
                    :total-rows="agenda.length"
                    :per-page="perPage"
                    aria-controls="agenda-list"
                />
            </div>
            <div v-else>
                <h1
                    class="text-center text-bpi-blue"
                >{{ $t('search_not_found', { type: $t('medias.agenda'), q: $route.query.q }) }}</h1>
            </div>

            <div v-if="pres.length">
                <b-row no-gutters class="my-3">
                    <b-col>
                        <hr class="bg-bpi-blue line" />
                    </b-col>
                    <b-col sm="3" lg="2" class="mx-2">
                        <h3 class="text-bpi-blue text-center">{{ $t('medias.prestations') }}</h3>
                    </b-col>
                    <b-col>
                        <hr class="bg-bpi-blue line" />
                    </b-col>
                </b-row>

                <b-row id="search-pres">
                    <b-col v-for="(i, k) in nani" :key="k" sm="12" lg="4">
                        <div class="single-thumb-one mb-4">
                            <div class="card-img-thumb">
                                <b-img-lazy
                                    fluid
                                    width="450"
                                    height="350"
                                    :src="sauce('storage/' + i.url)"
                                    :alt="i.title"
                                />
                            </div>
                            <div class="card-body text-center bg-white border-left border-right">
                                <span class="single-header text-bpi-blue">{{ i.title }}</span>
                            </div>
                            <div class="card-footer text-center bg-bpi-blue">
                                <b-row class="justify-content-md-center">
                                    <b-col cols="6" class="p-0 border-right border-white">
                                        <p class="m-0 text-white">{{ $t('rank') }}</p>
                                        <p class="m-0 text-bpi-yellow">{{ i.rank }}</p>
                                    </b-col>
                                    <b-col cols="6" class="p-0">
                                        <p class="m-0 text-white">{{ $t('year') }}</p>
                                        <p class="m-0 text-bpi-yellow">{{ i.year }}</p>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-col>
                </b-row>

                <b-pagination
                    v-if="pres.length > 9"
                    v-model="currentt"
                    :total-rows="pres.length"
                    :per-page="perPagee"
                    aria-controls="search-pres"
                />
            </div>
            <div v-else>
                <h1
                    class="text-center text-bpi-blue"
                >{{ $t('search_not_found', {type: $t('medias.prestations'), q: $route.query.q}) }}</h1>
            </div>
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

<style scoped>
h1.text-bpi-blue.text-center {
    word-break: break-word;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data: () => ({
        agenda: [],
        pres: [],
        current: 1,
        perPage: 9,
        currentt: 1,
        perPagee: 9,
        ready: false,
    }),
    async fetch() {
        await this.render();
    },
    methods: {
        async render() {
            await (this as any).$axios
                .get("search?q=" + this.$route.query.q)
                .then((r: any) => {
                    this.agenda = r.data.agenda;
                    this.pres = r.data.pres;

                    (this as any).setMetaHead({
                        title: this.$route.query.q,
                    });

                    this.ready = true;
                });
        },
    },
    computed: {
        loop(): any {
            return this.agenda.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            );
        },
        nani(): any {
            return this.pres.slice(
                (this.currentt - 1) * this.perPagee,
                this.currentt * this.perPagee
            );
        },
    },
    watch: {
        "$route.query.q": {
            async handler() {
                await this.render();
            },
        },
    },
});
</script>
