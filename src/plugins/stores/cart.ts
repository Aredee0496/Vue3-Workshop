import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

export type CartProduct = Product & { quantity: number }

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartProduct[],
  }),
  actions: {
    addToCart(product: Product) {
      const found = this.items.find(item => item.id === product.id)
      if (found) {
        found.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id)
    },
    clearCart() {
      this.items = []
    }
  },
})
