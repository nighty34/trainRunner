<template>
   <SpeedIndicator :trainAddress="Number(route.params.trainAddress)" />
   <ActiveThrottleControll />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useThrottleStore } from '@/stores/throttleStore.js';
import { onMounted, watch, ref } from 'vue';
import SpeedIndicator from './SpeedIndicator.vue';
import ActiveThrottleControll from './ActiveThrottleControll.vue';

const route = useRoute()
const trainAddress = ref(route.params.trainAddress);
const throttleStore = useThrottleStore()

watch(
  () => route.params.trainAddress,
  (newAddress) => {
    if (newAddress != null && newAddress !== '') {
      throttleStore.subscribeByTrainAddress(Number(newAddress));
    }
  },
  { immediate: true }
);

onMounted(() => {
   if (trainAddress){
      throttleStore.subscribeByTrainAddress(trainAddress.value)
   }
})


</script>
