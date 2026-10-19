<template>
  <!--div v-if="loading">
    <TrainListDisplayItem v-for="train in trains" :train-name="train.name" :train-address="train.trainAddress"/>
  </div>
  <div v-else>
    Loading
  </div-->
  <q-btn @click="reload" label="load"/>
  <TrainListDisplayItem v-for="train in trains" :train-name="train.name" :train-address="train.address"/>
</template>

<script setup>
import TrainListDisplayItem from './TrainListDisplayItem.vue';
import { trains, loading, error, fetchTrains } from '@/composables/useTrains.ts';

const reload = () => {
  fetchTrains()
}

const props = defineProps({
  
})
</script>
