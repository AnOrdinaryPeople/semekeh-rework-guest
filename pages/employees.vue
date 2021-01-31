<template>
    <div>
        <bread :title="$t('employees')" />

        <b-container v-if="ready" class="my-4">
            <slider class="mb-4" class-img="bpi-employees" :data="img" />

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
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
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
        sort(data: any) {
            return data.sort((a: any, b: any) =>
                a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            );
        },
        ...mapActions(["setEmployees"]),
    },
    computed: {
        ...mapGetters(["employees"]),
    },
});
</script>
