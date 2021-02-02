<template>
    <!-- I NEED NULL COALESCE REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE -->
    <swiper :options="config" ref="carousel">
        <swiper-slide v-for="(i, k) in data" :key="k">
            <b-img
                fluid
                :class="classImg"
                :src="sauce('storage/' + i.url)"
                :alt="appName"
                :width="width"
                :height="height"
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
</template>

<script lang="ts">
import Vue from "vue";
import { directive } from "vue-awesome-swiper";

export default Vue.extend({
    props: {
        width: {
            default: "auto",
        },
        height: {
            default: "auto",
        },
        data: {
            required: true,
            type: Array,
        },
        propsConfig: {
            type: Object,
        },
        classImg: {
            type: String,
        },
    },
    data: () => ({
        config: {
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
    mounted() {
        if (this.propsConfig)
            this.config = {
                ...this.config,
                ...this.propsConfig,
            };
    },
    methods: {
        next() {
            this.swiper?.slideNext();
        },
        prev() {
            this.swiper?.slidePrev();
        },
    },
    computed: {
        swiper() {
            const swiperRef: any = this.$refs.carousel;

            return swiperRef?.$swiper;
        },
    },
    directives: {
        swiper: directive,
    },
});
</script>
