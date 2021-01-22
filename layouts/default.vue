<template>
    <div>
        <navbar />

        <main id="app-main">
            <transition name="fade" mode="out-in">
                <Nuxt />
            </transition>
        </main>

        <app-footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import Navbar from "./Navbar.vue";
import AppFooter from "./Footer.vue";

export default Vue.extend({
    components: {
        Navbar,
        AppFooter,
    },
    created() {
        this.$store.dispatch("getApp");
    },
});
</script>
