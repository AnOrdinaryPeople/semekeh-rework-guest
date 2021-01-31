<template>
    <b-container class="h-75-vh">
        <b-row class="h-100 align-items-center">
            <b-col cols="12" class="text-center">
                <h1 class="text-bpi-yellow">{{ error.statusCode }}</h1>
                <div class="text-bpi-yellow-two">
                    <span
                        class="yeet cursor-pointer no-select"
                        @click="hover = !hover"
                    >{{ hover ? '(╯°□°）╯︵ ┻━┻' : '┬─┬ ノ( ゜-゜ノ)' }}</span>
                </div>
                <strong
                    v-if="error.statusCode === 404"
                    class="text-bpi-blue"
                >{{ rng(1, 25, true) ? quote[Math.floor(Math.random() * quote.length)] : '&nbsp;' }}</strong>
                <span v-else class="text-bpi-blue">
                    Something unexpected happened, we're deeply apologize&nbsp;
                    <fa icon="skull-crossbones" />
                </span>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped>
h1 {
    font-size: 5rem;
    margin: 0;
}
.yeet {
    font-size: 1.5rem;
}
strong {
    font-size: 1rem;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ["error"],
    layout: "error",
    data: () => ({
        quote: [
            "Oh no, Anyway..",
            "Hmmm yes, this page was made out of page",
            "Finally, not found",
            "r/woosh",
            "This quote will be displayed with a 25% chance ;)",
        ],
        hover: false,
    }),
});
</script>
