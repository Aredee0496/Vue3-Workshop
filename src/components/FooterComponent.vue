<template>
  <v-footer app
    class="elevation-2 d-flex justify-center align-center "
    color="grey-lighten-4"
    border
  >
    © {{ new Date().getFullYear() }} MyWebsite — All rights reserved.
  </v-footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
.v-footer {
  font-size: 0.85rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}
</style>
