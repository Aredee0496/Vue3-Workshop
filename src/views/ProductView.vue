<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <template v-if="product">
          <v-row>
            <!-- รูปภาพสินค้า -->
            <v-col cols="12" md="6" class="d-flex align-center justify-center mb-4 mb-md-0">
              <v-img
                :src="product?.image"
                height="320"
                max-width="100%"
                cover
                class="rounded-lg"
              />
            </v-col>

            <!-- รายละเอียดสินค้า -->
            <v-col cols="12" md="6">
              <v-card flat>
                <!-- ชื่อสินค้า -->
                <v-card-title class="text-h5 text-md-h4 font-weight-bold pb-2">
                  {{ product?.title }}
                </v-card-title>

                <!-- หมวดหมู่ -->
                <v-chip class="mb-4" color="primary" label>
                  {{ product?.category }}
                </v-chip>

                <!-- ราคาและคะแนน -->
                <v-row class="mb-4" no-gutters>
                  <v-col cols="12" sm="6">
                    <div class="text-h4 font-weight-bold text-primary">
                      ฿{{ formatNumber(product?.price || 0) }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="d-flex align-center">
                    <v-rating
                      :model-value="product?.rating?.rate || 0"
                      color="warning"
                      density="compact"
                      readonly
                      half-increments
                    />
                    <span class="text-body-2 ml-2">({{ product?.rating?.count || 0 }} รีวิว)</span>
                  </v-col>
                </v-row>

                <!-- คำอธิบายสินค้า -->
                <v-card-text class="text-body-1 pa-0 mb-4">
                  {{ product?.description }}
                </v-card-text>

                <!-- ปุ่มดำเนินการ -->
                <v-card-actions class="mt-4">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    variant="elevated"
                    prepend-icon="mdi-cart"
                    @click="() => addToCart()"
                  >
                    เพิ่มลงตะกร้า
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <!-- Loading state -->
        <template v-else>
          <v-row class="fill-height">
            <v-col cols="12" class="d-flex align-center justify-center">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              />
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import productApi from '@/services/api/features/product.ts'
import { formatnumber } from '@/utilities/format'
import { useCartStore } from '@/plugins/stores/cart'
import type { Product } from '@/types/product'

const cart = useCartStore()
const route = useRoute()
const product = ref<Product | null>(null)

function formatNumber(price: number): string {
  return formatnumber(price)
}

function addToCart() {
  if (product.value) {
    cart.addToCart(product.value)
  }
}

async function getProduct() {
  try {
    const response = await productApi.getById<Product>(Number(route.params.id))
    product.value = response
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

onMounted(() => {
  getProduct()
})
</script>

<style scoped>
.v-rating {
  display: inline-flex;
}

.v-img {
  object-fit: contain;
}
</style>
