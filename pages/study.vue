<template>
    <div>
        <!-- I NEED NULL COALESCE REEEEE (2) -->
        <bread use-bread :disable="[0]" />

        <nuxt-child />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
