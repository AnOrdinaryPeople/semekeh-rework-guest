import Vue from 'vue'
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

SwiperCore.use([Pagination, Autoplay]);

Vue.component('swiper', Swiper)
Vue.component('swiper-slide', SwiperSlide)
