<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>My Shop</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="() => router.push({ name: 'HomeView' })">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    <v-badge
      :content="cartCount"
      :value="cartCount > 0"
      color="error"
      overlap
      offset-x="8"
      offset-y="8"
    >
      <v-btn icon @click="() => router.push({ name: 'CartView' })">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-badge>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list class="menu-list-width mx-auto">
        <v-list-item @click="Logout()" title="Logout"></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/plugins/stores/cart'
import { computed } from 'vue'
const router = useRouter()
const cart = useCartStore()
const cartCount = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))

function Logout() {
  localStorage.removeItem('auth_token');
  router.push({ name: 'LoginView' })
  console.log('Logout clicked');
}
</script>

<style scoped>
.menu-list-width {
  min-width: 120px;
  max-width: 180px;
  width: 100%;
}

@media (max-width: 600px) {
  .menu-list-width {
    min-width: 90px;
    max-width: 120px;
  }
}
</style>
