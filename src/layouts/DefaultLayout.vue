<template>
  <v-app>
    <AppbarComponent />

    <v-main class="d-flex">
        <RouterView />
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import AppbarComponent from '@/components/AppbarComponent.vue';

</script>

<style lang="scss" scoped>

</style>
