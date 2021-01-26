<template>
    <div>
        <bread :title="data.title || $t('medias.agenda')" />

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

                        <markdown :content="data.content" />

                        <swiper ref="carousel" :options="carouselConfig">
                            <swiper-slide v-for="(i, k) in img" :key="k">
                                <img
                                    class="img-fluid"
                                    :src="
                                        sauce('storage/' + i.url)
                                    "
                                    :alt="i.title || appName"
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
                            </div>
                            <div
                                class="swiper-button-next swiper-button carousel-btn-next"
                                slot="button-next"
                                @click="next()"
                            >
                                <fa icon="chevron-right" />
                            </div>
                        </swiper>

                        <share :title="data.title" />
                    </div>
                </b-col>
                <b-col sm="12" md="4" lg="4">
                    <h3 class="text-bpi-blue">{{ $t('other_agenda') }}</h3>
                    <b-row>
                        <b-col v-for="(i, k) in other" :key="k" cols="12" class="my-3">
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
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import { mapGetters, mapActions } from "vuex";

SwiperCore.use([Pagination, Autoplay]);

export default Vue.extend({
    components: {
        Swiper,
        SwiperSlide,
    },
    data: () => ({
        data: { title: "" },
        img: [],
        other: [],
        ready: false,
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
    }),
    async fetch() {
        await this.render();
    },
    methods: {
        async render() {
            const slug = this.$route.params.id,
                g = this.agendaDetail[slug];

            this.ready = false;

            if (g) {
                if (typeof g.data === "boolean") this.$router.push("/404");
                else
                    await new Promise((dispatch) =>
                        setTimeout(() => {
                            dispatch(this.setData(g));
                        }, 250)
                    );
            }

            await (this as any).$axios.get("agenda/" + slug).then((r: any) => {
                if (r.data) {
                    this.other = r.data.other;

                    if (!g) {
                        this.setData(r.data);
                        this.setAgendaDetail({ name: slug, data: r.data });
                    }
                } else {
                    this.setAgendaDetail({ name: slug, data: false });
                    this.$router.push("/404");
                }
            });
        },
        setData(data: any) {
            this.data = data.agenda;
            this.img = data.img;

            (this as any).setMetaHead({
                title: data.agenda.title,
                desc: data.agenda.content,
            });

            this.ready = true;
        },
        next() {
            this.swiper?.slideNext();
        },
        prev() {
            this.swiper?.slidePrev();
        },
        ...mapActions(["setAgendaDetail"]),
    },
    computed: {
        swiper(): any {
            const swiperRef: any = this.$refs.carousel;

            return swiperRef?.$swiper;
        },
        ...mapGetters(["agendaDetail"]),
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
