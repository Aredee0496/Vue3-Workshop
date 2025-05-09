<template>
  <v-container class="pa-0 fill-height">
    <!-- Carousel Section -->
    <v-row class="w-100">
      <v-col cols="12">
        <v-carousel
          height="400"
          show-arrows="hover"
        >
          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          ></v-carousel-item>

          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
            cover
          ></v-carousel-item>

          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!-- Product Grid Section -->
    <v-row class="w-100">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex justify-center my-4"
      >
        <product-card
          :id="product.id"
          :img="product.image"
          :title="product.title"
          :price="product.price"
          @goToProduct="goToProduct"
        />
      </v-col>
    </v-row>
    </v-container>
</template>

<script setup lang="ts">
  import ProductCard from '@/components/cards/ProductCard.vue'
  import productApi from '@/services/api/features/product.ts'
  import type { Product } from '@/types/product'

  const router = useRouter()

  const products = ref<Product[]>([])

  function goToProduct (id: number) {
    console.log('goToProduct', id)
    router.push({
      name: 'ProductView',
      params: { id }
    })
    console.log('id', id)
  }

  async function getProducts () {
    try {
      console.log('getProducts')
      const response = await productApi.getAll<Product>()
      console.log('response', response)
      products.value = response
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  onMounted(() => {
    getProducts()
  })
</script>

<style lang="scss" scoped>
  .test {
    @include gradient($primary, $tertiary);
  }
</style>
