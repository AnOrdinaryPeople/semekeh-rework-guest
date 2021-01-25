<template>
    <div>
        <b-container v-if="ready" class="my-5">
            <b-row>
                <b-col sm="12" md="8">
                    <markdown :content="content.content" />
                </b-col>
                <b-col sm="12" md="4">
                    <swiper :options="carouselConfig" ref="carousel">
                        <swiper-slide v-for="(i, k) in img" :key="k">
                            <b-img
                                fluid
                                :src="sauce('storage/' + i.url)"
                                :alt="appName"
                                width="350"
                                height="350"
                                style="height: auto"
                            />
                        </swiper-slide>

                        <div class="swiper-pagination" slot="pagination" />

                        <div
                            class="swiper-button-prev swiper-button carousel-btn-prev"
                            slot="button-prev"
                            @click="prev()"
                        >
                            <fa icon="chevron-left" />
                            <span class="sr-only">{{ $t('rick_roll') }}</span>
                        </div>
                        <div
                            class="swiper-button-next swiper-button carousel-btn-next"
                            slot="button-next"
                            @click="next()"
                        >
                            <fa icon="chevron-right" />
                            <span class="sr-only">{{ $t('rick_roll') }}</span>
                        </div>
                    </swiper>
                </b-col>
            </b-row>

            <b-row v-if="council.json.length" class="my-4">
                <b-col cols="12">
                    <div class="my-4">
                        <h1 class="pb-3 mb-3 border-bottom markdown-header">{{ council.title }}</h1>
                        <chart :obj="council.json" :config="config" />
                    </div>
                </b-col>
            </b-row>

            <share :title="content.title" />
        </b-container>
        <b-container v-else class="my-5">
            <b-row>
                <b-col sm="12" md="8">
                    <skeleton v-for="(i, k) in 4" :key="k" class="mb-4" />

                    <b-row>
                        <b-col v-for="(i, k) in 4" :key="k" cols="1">
                            <b-skeleton type="avatar" />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col sm="12" md="4">
                    <b-skeleton-img height="250px" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import { mapGetters, mapActions } from "vuex";

SwiperCore.use([Pagination, Autoplay]);

interface Content {
    [key: string]: any;
}

export default Vue.extend({
    components: {
        Swiper,
        SwiperSlide,
    },
    data: () => ({
        ready: false,
        content: {} as Content,
        img: [],
        carouselConfig: {
            loop: true,
            autoplay: {
                delay: 5500,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".carousel-btn-next",
                prevEl: ".carousel-btn-prev",
            },
        },
        council: {
            title: "",
            json: [],
        },
        config: {
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                field_2: "sub",
            },
        },
    }),
    async fetch() {
        await this.render();
    },
    methods: {
        async render() {
            this.ready = false;

            if (this.id > 0) {
                const g = this.profile["p" + this.id];

                if (g)
                    new Promise((dispatch) =>
                        setTimeout(() => {
                            dispatch(this.setData(g));
                        }, 250)
                    );
                else
                    await (this as any).$axios
                        .get("profile/" + this.id)
                        .then((r: any) => {
                            this.setData(r.data);
                            this.setProfile({
                                name: "p" + this.id,
                                data: r.data,
                            });
                        });
            } else this.$router.push("/404");
        },
        async setData(data: any) {
            this.content = data.content;
            this.img = data.img;

            if (this.id === 3 && data.council)
                this.council = {
                    title: data.council.title,
                    json: JSON.parse(data.council.json),
                };
            else this.council = { title: "", json: [] };

            const c = this.content;

            (this as any).setMetaHead({
                title: c.title,
                desc: c.content,
            });

            this.$emit("ready", {
                title: c.title,
                subtitle: c.subtitle,
            });

            await Vue.set(this, "ready", true);
        },
        next() {
            this.swiper?.slideNext();
        },
        prev() {
            this.swiper?.slidePrev();
        },
        ...mapActions(["setProfile"]),
    },
    computed: {
        id(): number {
            const id: string = this.$route.params.id;

            return id === "public"
                ? 1
                : id === "vision-mission"
                ? 2
                : id === "student-council"
                ? 3
                : id === "extracurricular"
                ? 4
                : 0;
        },
        swiper(): any {
            const swiperRef: any = this.$refs.carousel;

            return swiperRef?.$swiper;
        },
        ...mapGetters(["profile"]),
    },
    directives: {
        swiper: directive,
    },
    watch: {
        "$route.params.id": function () {
            this.render();
        },
    },
});
</script>
