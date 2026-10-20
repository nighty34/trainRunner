<template>
   <div v-for="entry in throttles">
    {{entry[0]}} : {{ entry[1] }}
   </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { subscribeByTrainAddress, throttles } from '@/stores/throttleStore';
import { onMounted } from 'vue';

const route = useRoute()

onMounted(() => {
   if (route.params.trainAddress){
      subscribeByTrainAddress(route.params.trainAddress)
   }
})

</script>
