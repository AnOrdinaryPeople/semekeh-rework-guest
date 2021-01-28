<template>
    <div>
        <b-col md="12" class="navbar-bpi">
            <b-container>
                <ul class="justify-content-md-center">
                    <li class="search mt-2 col-md-6">
                        <form @submit.prevent="search()">
                            <label for="app-nav-search" class="sr-only">{{ $t('rick_roll') }}</label>
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-btn type="submit" variant="bpi-blue">
                                        <fa icon="search" />
                                        <span class="sr-only">{{ $t('rick_roll') }}</span>
                                    </b-btn>
                                </b-input-group-prepend>
                                <b-form-input
                                    id="app-nav-search"
                                    class="bg-bpi-blue text-light border-0"
                                    type="search"
                                    v-model="q"
                                    :placeholder="$t('search')"
                                />
                            </b-input-group>
                        </form>
                    </li>
                    <li class="social-media col-md-6">
                        <a
                            v-for="(i, k) in social"
                            :key="k"
                            :href="i.link"
                            target="_blank"
                            rel="noopener"
                        >
                            <div class="nav-fb">
                                <fa :icon="['fab', i.icon]" />
                                <span class="sr-only">{{ $t('rick_roll') }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </b-container>
        </b-col>

        <div class="navbar-wrapper">
            <b-navbar id="app-nav" type="dark" variant="white">
                <b-container>
                    <b-col md="6">
                        <nuxt-link to="/">
                            <b-img
                                fluid
                                width="400"
                                height="69"
                                src="/img/logo.webp"
                                :alt="appName"
                            />
                        </nuxt-link>
                    </b-col>

                    <navbar-menu cls="menu" />
                </b-container>
            </b-navbar>
        </div>

        <div class="navbar-responsive col-md-12">
            <div class="logo">
                <nuxt-link to="/">
                    <b-img fluid width="350" height="60" src="/img/logo.webp" :alt="appName" />
                </nuxt-link>
            </div>
            <div class="menu-responsive" :class="toggle ? 'change' : ''" v-b-toggle:app-mobile-nav>
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <span class="sr-only">{{ $t('rick_roll') }}</span>
            </div>
        </div>

        <b-collapse id="app-mobile-nav" v-model="toggle" class="sidenav">
            <navbar-menu :cls="null" />
        </b-collapse>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import NavbarMenu from "./NavbarMenu.vue";

export default Vue.extend({
    components: {
        NavbarMenu,
    },
    data: () => ({
        q: "",
        toggle: false,
    }),
    mounted() {
        let nav = this.getId("app-nav")?.style,
            main = this.getId("app-main")?.style;

        if (document.documentElement.clientWidth > 1104)
            window.addEventListener("scroll", () => {
                if (document.documentElement.clientWidth > 1104)
                    this.scroll(nav, main);

                let drop = [
                    this.getId("app-nav-prof"),
                    this.getId("app-nav-study"),
                    this.getId("app-nav-media"),
                ];

                drop.forEach((d) => {
                    try {
                        this.setStyle(
                            d?.style,
                            "absolute",
                            window.pageYOffset > 5 ? "25px" : "45px",
                            "auto"
                        );
                    } catch (e) {}
                });
            });
        else this.setD(nav, "none");

        window.addEventListener("resize", (e) => {
            if (document.documentElement.clientWidth > 1104) {
                this.setD(nav, "flex");
                this.scroll(nav, main);
            } else {
                this.setD(nav, "none");
                this.setStyle(main, "inherit", "0px", "auto");
            }
        });
    },
    methods: {
        getId(id: string) {
            return document.getElementById(id);
        },
        setStyle(s: any, ...styles: any) {
            s.position = styles[0];
            s.marginTop = styles[1];
            s.height = styles[2];
        },
        scroll(nav: any, main: any) {
            if (window.pageYOffset > 5) {
                this.setStyle(nav, "fixed", "-60px", "80px");
                this.setStyle(main, "inherit", "0px", "auto");
            } else {
                this.setStyle(nav, "none", "0px", "120px");
                this.setStyle(main, "inherit", "0px", "auto");
            }
        },
        setD(nav: any, display: string) {
            nav.display = display;
        },
        search() {
            if (this.q !== "" && this.q.length > 2) {
                if (this.$router.currentRoute.name === "search")
                    this.$router.replace({ query: { q: this.q } });
                else
                    this.$router.push({
                        path: "/search",
                        query: { q: this.q },
                    });
            } else {
                (this as any).$bvToast.toast(this.$t("search_warn"), {
                    title: this.$t("warn"),
                    variant: "danger",
                    toaster: "b-toaster-bottom-center",
                });
            }
        },
    },
    computed: {
        ...mapGetters(["social"]),
    },
});
</script>
