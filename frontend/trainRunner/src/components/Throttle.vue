<template>
   <SpeedIndicator :trainAddress="Number(trainAddress)" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useThrottleStore } from '@/stores/throttleStore';
import { onMounted } from 'vue';
import SpeedIndicator from './SpeedIndicator.vue';
const route = useRoute()
const trainAddress = route.params.trainAddress;
const throttleStore = useThrottleStore()

onMounted(() => {
   if (trainAddress){
      throttleStore.subscribeByTrainAddress(trainAddress)
   }
})


</script>
