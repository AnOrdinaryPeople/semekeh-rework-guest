<template>
    <!-- optional chaining at template available in vue 3 -,-" -->
    <div v-if="welcome.section && welcome.section.length > 0">
        <swiper ref="carousel" :options="carouselConfig">
            <swiper-slide
                v-for="(i, k) in welcome.carousel"
                :key="k"
                :class="i.type === 3 ? 'd-block' : ''"
            >
                <div v-if="i.type === 1" class="col-md-12 slider-content">
                    <div class="slider-text">
                        <span class="slider-text-header">{{ i.title }}</span>
                        <p>{{ i.description }}</p>
                    </div>
                    <div class="slider-img">
                        <b-img fluid :src="sauce(i.url)" width="100%" height="100%" :alt="i.title" />
                    </div>
                </div>
                <div v-else-if="i.type === 2" class="slider-content-two">
                    <b-col md="5" lg="4" class="slider-text-two">
                        <div class="slider-text-margin">
                            <span class="slider-text-header-two">{{ i.title }}</span>
                            <div class="slider-caption">{{ i.description }}</div>
                        </div>
                    </b-col>
                </div>

                <b-img
                    :class="i.type === 1 ? 'slider-img-back' : ''"
                    :src="i.type === 1 ? 'img/back-slider.webp' : sauce(i.url)"
                    width="100%"
                    height="100%"
                    :alt="i.title || appName"
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

        <div v-if="welcome.video && welcome.video.length" class="bpi-video">
            <div class="container">
                <b-row>
                    <b-col cols="12">
                        <div class="section-heading">
                            <span>{{ welcome.section[0].title }}</span>
                            <p>{{ welcome.section[0].subtitle }}</p>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <swiper class="swiper-bpi-video" :options="videoConfig">
                        <swiper-slide class="img-video" v-for="(i, k) in welcome.video" :key="k">
                            <b-img
                                width="240"
                                height="150"
                                :src="sauce(i.thumbnail)"
                                :alt="appName"
                                @click="openVideo(i.video, i.thumbnail)"
                            />
                        </swiper-slide>
                    </swiper>
                </b-row>
            </div>
        </div>

        <b-container v-if="welcome.about" fluid>
            <b-row>
                <b-col class="about-content" sm="12" lg="6">
                    <span class="about-content-title">{{ welcome.section[1].title }}</span>
                    <p class="about-content-sub">{{ welcome.section[1].subtitle }}</p>

                    <markdown :content="welcome.about.content" />
                </b-col>
                <b-col sm="12" lg="1" />
                <b-col
                    class="about-img img-fluid"
                    sm="12"
                    lg="5"
                    :style="`background-image: url(${sauce(welcome.about.url)})`"
                />
            </b-row>
        </b-container>

        <b-container v-if="welcome.agenda" class="my-4">
            <b-row>
                <b-col cols="12">
                    <div class="section-heading">
                        <span class="about-content-title">{{ welcome.section[2].title }}</span>
                        <p>{{ welcome.section[2].subtitle }}</p>
                    </div>
                </b-col>
            </b-row>
            <b-row class="justify-content-center">
                <b-col sm="12" md="6" lg="4">
                    <router-link :to="'/information-media/agenda/' + welcome.agenda.slug">
                        <div class="card agenda-card text-center">
                            <div class="position-relative">
                                <img
                                    class="card-img"
                                    width="450"
                                    height="100%"
                                    :src="sauce(welcome.agenda.banner)"
                                    :alt="appName"
                                />
                                <div class="card-body card-img-overlay">
                                    <span class="card-title">{{ welcome.agenda.title }}</span>
                                    <p
                                        class="card-subtitle text-muted mb-2"
                                    >{{ welcome.agenda.time }}</p>
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
        </b-container>

        <b-container v-if="welcome.prestation && welcome.prestation.length" class="my-4">
            <b-row>
                <b-col cols="12">
                    <div class="section-heading">
                        <span>{{ welcome.section[3].title }}</span>
                        <p>{{ welcome.section[3].subtitle }}</p>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-for="(i, k) in welcome.prestation" :key="k" sm="12" lg="4">
                    <div class="single-thumb-one mb-4">
                        <div class="card-img-thumb">
                            <b-img
                                fluid
                                width="450"
                                height="350"
                                :src="sauce(i.url)"
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
        </b-container>

        <b-container v-if="welcome.alumni && welcome.alumni.length" fluid class="bg-bpi-blue py-4">
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <div class="section-heading">
                            <span class="text-light">{{ welcome.section[4].title }}</span>
                            <p class="text-bpi-yellow">{{ welcome.section[4].subtitle }}</p>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        v-for="(i, k) in welcome.alumni"
                        :key="k"
                        sm="12"
                        md="6"
                        lg="4"
                        class="single-card"
                    >
                        <div class="single-thumb-two">
                            <div class="card-img-thumb">
                                <b-img
                                    fluid
                                    width="420"
                                    height="350"
                                    :src="sauce(i.url)"
                                    :alt="i.name"
                                />
                            </div>
                            <b-row>
                                <b-col sm="12" md="8">
                                    <b-row>
                                        <div class="single-date">
                                            <b-row>
                                                <b-col cols="12" class="pt-2">
                                                    <p>{{ i.company }}</p>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <div class="card-body pt-0">
                                <span class="single-header text-bpi-blue">{{ i.name }}</span>
                                <div class="single-info border-top border-bpi-blue pt-2">
                                    <p>{{ i.content }}</p>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>

        <b-container v-if="welcome.company && welcome.company.length" class="my-4">
            <b-row>
                <b-col cols="12">
                    <div class="section-heading">
                        <span>{{ welcome.section[5].title }}</span>
                        <p>{{ welcome.section[5].subtitle }}</p>
                    </div>
                </b-col>
            </b-row>

            <div class="text-center">
                <b-btn variant="bpi-blue" @click="prevv()">
                    <fa icon="chevron-left" />
                    <span class="sr-only">{{ $t('rick_roll') }}</span>
                </b-btn>
                <b-btn variant="bpi-blue" @click="nextt()">
                    <fa icon="chevron-right" />
                    <span class="sr-only">{{ $t('rick_roll') }}</span>
                </b-btn>
            </div>

            <swiper ref="company" :options="companyConfig">
                <swiper-slide v-for="(i, k) in welcome.company" :key="k" class="company-slider">
                    <a class="company-img" :href="i.link" target="_blank" rel="noopener">
                        <b-img fluid width="450" height="75" :src="sauce(i.url)" :alt="appName" />
                    </a>
                </swiper-slide>
            </swiper>
        </b-container>

        <b-modal id="video-modal" :title="$t('video')" hide-footer>
            <b-embed controls type="video" :poster="sauce(modalVideo.thumbnail)">
                <source :src="sauce(modalVideo.video)" />
            </b-embed>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

import { mapGetters } from "vuex";

SwiperCore.use([Pagination, Autoplay]);

export default Vue.extend({
    head: {
        link: [{ rel: "canonical", href: window.location.href }],
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    data: () => ({
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
        videoConfig: {
            slidesPerView: 4,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                0: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                },
            },
        },
        modalVideo: {},
        companyConfig: {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: ".comp-next",
                prevEl: ".comp-prev",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            },
        },
    }),
    mounted() {
        if (this.welcome?.carousel?.length) {
            (this as any).swiper?.slideTo(1);
            (this as any).swiper?.autoplay?.stop();
            (this as any).swiper?.autoplay?.start();
        }
    },
    created() {
        this.$store.dispatch("setWelcome");
    },
    methods: {
        next() {
            (this as any).swiper?.slideNext();
        },
        prev() {
            (this as any).swiper?.slidePrev();
        },
        nextt() {
            (this as any).sComp?.slideNext();
        },
        prevv() {
            (this as any).sComp?.slidePrev();
        },
        openVideo(video: string, thumbnail: string) {
            this.modalVideo = {
                video,
                thumbnail,
            };
            (this as any).$bvModal.show("video-modal");
        },
    },
    // setup() only available in vue 3 --"
    computed: {
        swiper() {
            return this.$refs.carousel?.$swiper;
        },
        sComp() {
            return this.$refs.company?.$swiper;
        },
        ...mapGetters(["welcome"]),
    },
    directives: {
        swiper: directive,
    },
});
</script>
