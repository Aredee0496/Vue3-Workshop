<template>
  <p class="test">Home page</p>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
  .test {
    @include gradient($primary, $tertiary);
  }
</style>
