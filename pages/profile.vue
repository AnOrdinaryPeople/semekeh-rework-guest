<template>
    <div>
        <!-- I NEED NULL COALESCE REEEEE -->
        <bread
            :title="content.title ? content.title : null"
            :use-bread="content.title ? false : true"
            :sub-title="content.subtitle ? content.subtitle : null"
        />

        <nuxt-child keep-alive @ready="update" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data: () => ({
        content: {},
    }),
    methods: {
        update(data: any) {
            this.content = data;
        },
    },
});
</script>
