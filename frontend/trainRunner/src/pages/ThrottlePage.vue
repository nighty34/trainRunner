<template>
  <q-page class="flex flex-center">
    <Throttle />
  </q-page>
</template>

<script setup>
import Throttle from '@/components/Throttle.vue';
const props = defineProps({
  trainAdress: String
})

</script>
