<template>
    <div>
        <bread use-bread :disable="[0]" />

        <nuxt-child />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
