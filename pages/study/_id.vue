<template>
    <div>
        <b-container v-if="ready" class="my-4">
            <b-row>
                <b-col sm="12" md="8">
                    <div class="detail-img">
                        <b-img fluid :src="sauce('storage/' + data.banner)" :alt="appName" />
                    </div>
                    <div class="detail-post">
                        <div class="detail-label">
                            <p>{{ $t('study') }}</p>
                        </div>
                        <markdown :content="data.content" />
                        <share :title="data.title" />
                    </div>
                </b-col>
                <b-col sm="12" md="4">
                    <h3 class="text-bpi-blue">{{ dataa.title }}</h3>
                    <b-img fluid :src="sauce('storage/' + dataa.url)" :alt="appName" class="my-2" />
                    <markdown :content="dataa.content" />
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
                    <b-skeleton width="60%" />
                    <b-skeleton-img height="250px" />
                    <skeleton class="mt-3" />
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
        data: null,
        dataa: null,
        ready: false,
    }),
    async fetch() {
        await this.render();
    },
    methods: {
        async render() {
            const g = this.study[this.id];

            this.ready = false;

            if (g) {
                if (typeof g.data === "boolean") this.$router.push("/404");
                else
                    await new Promise((dispatch) =>
                        setTimeout(() => {
                            dispatch(this.setData(g));
                        }, 250)
                    );
            } else
                await (this as any).$axios
                    .get("study/" + this.id)
                    .then((r: any) => {
                        if (r.data) {
                            this.setData(r.data);
                            this.setStudy({ name: this.id, data: r.data });
                        } else {
                            this.setStudy({ name: this.id, data: false });
                            this.$router.push("/404");
                        }
                    });
        },
        setData(data: any) {
            this.data = data;
            this.dataa = JSON.parse(data.content_2);

            (this as any).setMetaHead({
                // is this the safest way? probably not..
                // title: this.nav.study.filter((i: any) => i.slug === this.id)[0]
                //     .title,
                title: this.id
                    .split("-")
                    .map((i) => i.charAt(0).toUpperCase() + i.substring(1))
                    .join(" "),
            });

            this.ready = true;
        },
        ...mapActions(["setStudy"]),
    },
    computed: {
        id(): string {
            return this.$route.params.id;
        },
        ...mapGetters(["study" /*, "nav"*/]),
    },
    watch: {
        "$route.params.id": function () {
            this.render();
        },
    },
});
</script>
