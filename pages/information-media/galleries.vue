<template>
    <div>
        <bread :title="$t('medias.galleries')" />

        <b-container v-if="ready" class="my-4">
            <b-card-group columns id="pres-video">
                <div
                    v-for="(i, k) in nanii"
                    :key="k"
                    class="card img-view"
                    @click="open(sauce('storage/' + i.video), sauce('storage/' + i.thumbnail))"
                >
                    <b-img
                        class="card-img"
                        fluid
                        :src="sauce('storage/' + i.thumbnail)"
                        :alt="appName"
                    />
                </div>
            </b-card-group>

            <b-pagination
                v-if="video.length > 9"
                v-model="currentt"
                :total-rows="video.length"
                :per-page="perPage"
                aria-controls="pres-video"
            />

            <hr class="bg-bpi-blue line" />

            <b-card-group columns id="pres-gallery">
                <div
                    v-for="(i, k) in nani"
                    :key="k"
                    class="card img-view"
                    @click="open(sauce('storage/' + i.url))"
                >
                    <b-img class="card-img" fluid :src="sauce('storage/' + i.url)" :alt="appName" />
                </div>
            </b-card-group>

            <b-pagination
                v-if="data.length > 9"
                v-model="current"
                :total-rows="data.length"
                :per-page="perPage"
                aria-controls="pres-gallery"
            />
        </b-container>
        <b-container v-else class="my-5">
            <b-row>
                <b-col v-for="(i, k) in 8" :key="k" sm="12" md="6" lg="4" class="mb-4">
                    <b-skeleton-img no-aspect height="230px" />
                </b-col>
            </b-row>
        </b-container>

        <b-modal id="come-here-mortal" hide-header hide-footer size="lg">
            <div v-if="isVideo !== ''">
                <b-embed controls type="video" :poster="isVideo">
                    <source :src="view" />
                </b-embed>
            </div>
            <div v-else class="text-center">
                <b-img fluid :src="view" :alt="appName" />
            </div>

            <b-row class="px-3">
                <share :title="appName" :url="view" />
            </b-row>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
    data: () => ({
        data: [],
        video: [],
        current: 1,
        currentt: 1,
        perPage: 9,
        ready: false,
        view: "",
        isVideo: "",
    }),
    async fetch() {
        if (this.img?.img || this.img?.video)
            await new Promise((dispatch) =>
                setTimeout(() => {
                    dispatch(this.setData(this.img));
                }, 250)
            );
        else
            await (this as any).$axios.get("gallery").then((r: any) => {
                this.setData(r.data);
                this.setImg(r.data);
            });
    },
    methods: {
        open(sauce: string, video = "") {
            this.view = sauce;
            this.isVideo = video;

            (this as any).$bvModal.show("come-here-mortal");
        },
        setData(data: any) {
            this.data = data?.img;
            this.video = data?.video;

            (this as any).setMetaHead({
                title: this.$t("medias.galleries"),
            });

            this.ready = true;
        },
        ...mapActions(["setImg"]),
    },
    computed: {
        nani(): any {
            return this.data.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            );
        },
        nanii(): any {
            return this.video.slice(
                (this.currentt - 1) * this.perPage,
                this.currentt * this.perPage
            );
        },
        ...mapGetters(["img"]),
    },
});
</script>
