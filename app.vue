<script setup lang="ts">
import { computed } from "vue";
import useRouteTransitionName from "~/composables/transitions";
import useKeepalive from "~/composables/keepalive";

useHead({
  title: " biu-cher",
});

const keepAliveRouteNames = computed(() => {
  return useKeepalive().routeCaches as string[];
});

const transitionName = computed(() => {
  return useRouteTransitionName().routeTransitionName;
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      :keepalive="{ include: keepAliveRouteNames }"
      :transition="{ name: transitionName }"
    />
  </NuxtLayout>
</template>
