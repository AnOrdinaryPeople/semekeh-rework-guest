<template>
    <div>
        <bread :title="$t('employees')" />

        <b-container v-if="ready" class="my-4">
            <swiper ref="carousel" :options="carouselConfig" class="mb-4">
                <swiper-slide v-for="(i, k) in img" :key="k">
                    <b-img
                        fluid
                        class="bpi-employees"
                        :src="sauce('storage/' + i.url)"
                        :alt="appName"
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

            <b-card>
                <div v-for="(i, k) in Object.keys(data)" :key="k" class="mb-4">
                    <h3 class="text-bpi-blue border-bottom border-bpi-blue pb-2">{{ $t(title[k]) }}</h3>
                    <b-row class="justify-content-center">
                        <b-col
                            v-for="(j, kk) in data[i]"
                            :key="k + '-' + kk"
                            sm="12"
                            md="6"
                            lg="4"
                            class="respon-card"
                        >
                            <div class="border rounded single-thumb-two">
                                <div class="card-img-thumb">
                                    <img :src="sauce('storage/' + j.url)" :alt="appName" />
                                </div>
                                <div class="card-body">
                                    <h5 class="text-bpi-blue">{{ j.name }}</h5>
                                    <div class="single-info border-top pt-2">
                                        <p>{{ j.title }}</p>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-card>
        </b-container>
        <b-container v-else class="my-5">
            <b-skeleton-img no-aspect height="450px" />

            <b-card class="mt-4">
                <b-row>
                    <b-col v-for="(i, k) in 3" :key="k" sm="12" lg="4" class="mb-4">
                        <b-card no-body img-top>
                            <b-skeleton-img card-img="top" no-aspect height="350px" />
                            <b-card-body>
                                <skeleton />
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-card>
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
        title: [
            "structural",
            "head_study",
            "productive",
            "teacher",
            "employees",
        ],
        data: {
            first: [],
            firstt: [],
            firsttt: [],
            second: [],
            third: [],
        },
        img: [],
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
        if (this.employees?.employee)
            await new Promise((dispatch) =>
                setTimeout(() => {
                    dispatch(this.setData(this.employees));
                }, 250)
            );
        else
            await (this as any).$axios.get("employee").then((r: any) => {
                this.setData(r.data);
                this.setEmployees(r.data);
            });
    },
    methods: {
        setData(d: any) {
            const t = d.employee;
            let a = this.data;

            a.first = t.filter((i: any) => i.type === 1 && i.child_type === 1);
            a.firstt = t.filter((i: any) => i.type === 1 && i.child_type === 2);
            a.firsttt = this.sort(
                t.filter((i: any) => i.type === 1 && i.child_type === 3)
            );
            a.second = this.sort(t.filter((i: any) => i.type === 2));
            a.third = this.sort(t.filter((i: any) => i.type === 3));

            this.img = d.img;

            (this as any).setMetaHead({
                title: this.$t("employees"),
            });

            this.ready = true;
        },
        next() {
            this.swiper?.slideNext();
        },
        prev() {
            this.swiper?.slidePrev();
        },
        sort(data: any) {
            return data.sort((a: any, b: any) =>
                a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            );
        },
        ...mapActions(["setEmployees"]),
    },
    computed: {
        swiper(): any {
            const ref: any = this.$refs.carousel;

            return ref?.$swiper;
        },
        ...mapGetters(["employees"]),
    },
    directives: {
        swiper: directive,
    },
});
</script>
