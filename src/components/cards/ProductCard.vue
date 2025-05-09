<template>
  <v-card
    class="mx-auto my-auto"
    width="250px"
    elevation="8"
    @click="goToProduct()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{'hovered': hover}"
  >
    <!-- Image Section -->
    <v-img
      :src="props.img"
      height="200px"
      cover
      class="rounded-top"
    ></v-img>

    <!-- Title Section -->
    <v-card-title class="headline font-weight-bold text-center">{{ props.title }}</v-card-title>

    <!-- Subtitle Section -->
    <v-card-subtitle class="text-center" style="color: #00796b; font-size: 1.2em;">
      ราคา {{ props.price }} บาท
    </v-card-subtitle>

    <!-- Card Text Section -->
    <v-card-text class="text-truncate">
      {{ props.title }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  const hover = ref(false)

  interface Props {
    id?: number
    img?: string
    title?: string
    price?: number
    text?: string
  }
  interface Emits {
    goToProduct: [id: number]
  }
  const props = withDefaults(defineProps<Props>(), {
    img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
    title: 'Title',
    price: 0,
    text: 'Text'
  })
  const emits = defineEmits<Emits>()
  function goToProduct() {
    emits('goToProduct', props.id!)
  }
</script>

<style scoped>
/* Custom styling */
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
}

.v-card:hover {
  transform: translateY(-5px); /* เพิ่มการเคลื่อนไหวเล็กน้อยเมื่อ hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* เพิ่มเงาขณะ hover */
}

.headline {
  font-size: 1.3em;
}

.v-card-subtitle {
  font-weight: 500;
}

.text-truncate {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.v-btn {
  width: 40%;
}

.hovered {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
