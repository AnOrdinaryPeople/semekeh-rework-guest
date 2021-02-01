<template>
    <div>
        <bread :title="$t('medias.prestations')" />

        <b-container v-if="ready" class="my-4">
            <b-row id="ehe-te-nandayo">
                <b-col v-for="(i, k) in data" :key="k" sm="12" lg="4">
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
                v-if="data.length > 9"
                v-model="current"
                :total-rows="data.length"
                :per-page="perPage"
                aria-controls="ehe-te-nandayo"
            />
        </b-container>
        <b-container v-else class="my-5">
            <b-row>
                <b-col v-for="(i, k) in 6" :key="k" sm="12" lg="4" class="mb-4">
                    <b-card no-body img-top>
                        <b-skeleton-img card-img="top" no-aspect height="350px" />
                        <b-card-body>
                            <skeleton />
                        </b-card-body>
                    </b-card>
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
        if (this.prestation.length > 0)
            await new Promise((dispatch) =>
                setTimeout(() => {
                    dispatch(this.setData(this.prestation));
                }, 250)
            );
        else
            await (this as any).$axios.get("prestation").then((r: any) => {
                this.setData(r.data);
                this.setPrestation(r.data);
            });
    },
    methods: {
        setData(data: any) {
            this.data = data;

            (this as any).setMetaHead({
                title: this.$t("medias.prestations"),
            });

            this.ready = true;
        },
        ...mapActions(["setPrestation"]),
    },
    computed: {
        nani(): any {
            return this.data.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            );
        },
        ...mapGetters(["prestation"]),
    },
});
</script>
