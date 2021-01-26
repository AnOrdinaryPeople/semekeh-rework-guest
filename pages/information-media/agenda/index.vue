<template>
    <div>
        <bread :title="$t('medias.agenda')" />

        <b-container v-if="ready" class="my-4">
            <b-row id="agenda-list">
                <b-col v-for="(i, k) in loop" :key="k" sm="12" md="6" lg="4" class="my-3">
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

            <b-pagination
                v-if="data.length > 9"
                class="mt-3"
                v-model="current"
                :total-rows="data.length"
                :per-page="perPage"
                aria-controls="agenda-list"
            />
        </b-container>
        <b-container v-else class="my-5">
            <b-row>
                <b-col v-for="(i, k) in 8" :key="k" sm="12" md="6" lg="4" class="mb-4">
                    <b-skeleton-img no-aspect height="230px" />
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
        data: [],
        current: 1,
        perPage: 9,
        ready: false,
    }),
    async fetch() {
        if (this.agenda.length)
            await new Promise((dispatch) =>
                setTimeout(() => {
                    dispatch(this.setData(this.agenda));
                }, 250)
            );
        else
            await (this as any).$axios.get("agenda").then((r: any) => {
                this.setData(r.data);
                this.setAgenda(r.data);
            });
    },
    methods: {
        setData(data: any) {
            this.data = data;
            this.ready = true;

            (this as any).setMetaHead({
                title: this.$t("medias.agenda"),
            });
        },
        ...mapActions(["setAgenda"]),
    },
    computed: {
        loop(): any {
            return this.data.slice(
                (this.current - 1) * this.perPage,
                this.current * this.perPage
            );
        },
        ...mapGetters(["agenda"]),
    },
});
</script>
