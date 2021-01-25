<template>
    <div>
        <b-skeleton v-for="(i, j) in number" :key="j" :width="rng() + '%'" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        number: {
            type: Number,
            default: 5,
        },
    },
});
</script>
