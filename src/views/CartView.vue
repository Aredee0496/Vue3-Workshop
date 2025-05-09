<template>
  <v-container class="py-8">
    <h2 class="text-h5 mb-6">ตะกร้าสินค้า</h2>
    <v-list v-if="cart.items.length" class="cart-list cart-list-full">
      <template v-for="(item, idx) in cart.items" :key="item.id">
        <v-list-item class="align-center cart-list-item">
          <template #prepend>
            <v-img :src="item.image" height="56" width="56" cover class="rounded mx-2" />
          </template>
          <div class="item-content-row">
            <div class="font-weight-bold text-truncate">{{ item.title }}</div>
            <div class="text-grey-darken-1 price-info">฿{{ formatNumber(item.price) }} x {{ item.quantity }}</div>
          </div>
          <template #append>
            <v-btn icon color="error" variant="text" @click="remove(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
        <v-divider v-if="idx < cart.items.length - 1" class="my-2" />
      </template>
    </v-list>
    <div v-else class="text-center text-grey">ไม่มีสินค้าในตะกร้า</div>
    <v-divider class="my-6" />
    <div class="text-right text-h6">
      รวมทั้งหมด: ฿{{ formatNumber(total) }}
    </div>
    <v-btn color="primary" class="mt-4" :disabled="!cart.items.length" @click="checkout">
      สั่งซื้อสินค้า
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useCartStore } from '@/plugins/stores/cart'
import { formatnumber } from '@/utilities/format'

const cart = useCartStore()

function formatNumber(price: number): string {
  return formatnumber(price)
}

function remove(id: number) {
  cart.removeFromCart(id)
}

const total = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function checkout() {
  alert('ขอบคุณสำหรับการสั่งซื้อ!')
  cart.clearCart()
}
</script>

<style scoped>
.cart-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cart-list-full {
  width: 100%;
  padding: 0;
}

.cart-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-content {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-content-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.price-info {
  margin-left: 16px;
  white-space: nowrap;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
