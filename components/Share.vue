<template>
    <b-row class="my-4">
        <b-col class="share-text" cols="12">
            <a
                class="mx-1"
                :href="`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url || appHref}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa :icon="['fab', 'twitter']" />
                </b-avatar>
                <span class="sr-only">{{ $t('rick_roll') }}</span>
            </a>
            <a
                class="mx-1"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${url || appHref}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa :icon="['fab', 'facebook-f']" />
                </b-avatar>
                <span class="sr-only">{{ $t('rick_roll') }}</span>
            </a>
            <a
                class="mx-1"
                :href="`https://web.whatsapp.com/send?text=${url || appHref}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa :icon="['fab', 'whatsapp']" />
                </b-avatar>
                <span class="sr-only">{{ $t('rick_roll') }}</span>
            </a>
            <a
                class="mx-1"
                :href="`mailto:?subject=${encodeURIComponent(title)}&amp;body=${url || appHref}`"
                target="_blank"
                rel="noopener"
            >
                <b-avatar variant="bpi-blue">
                    <fa icon="envelope" />
                </b-avatar>
                <span class="sr-only">{{ $t('rick_roll') }}</span>
            </a>
        </b-col>
    </b-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: {
            required: true,
            type: String,
        },
        url: {
            type: String,
        },
    },
    data: () => ({
        appHref: window.location.href,
    }),
});
</script>
