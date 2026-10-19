<template>
  <q-input label="search" v-model="search"/>
  <q-btn @click="reload" label="load"/>
  <div v-if="loading">
    <q-circular-progress indeterminate size="90px" />
  </div>
  <div v-else class="q-pa-md row items-start">
    <TrainListDisplayItem v-for="train in filter(trains, search)" :train-name="train.name" :train-address="train.address" :train-icon="train.comment"/>
  </div>

</template>

<script setup>
import TrainListDisplayItem from './TrainListDisplayItem.vue';
import { ref } from 'vue';
import { trains, loading, error, fetchTrains } from '@/composables/useTrains.ts';
const search = ref("");

const filter = (list, filterTerm) => {
  let result = []

  list.forEach(element => {
    (filterTerm === '' || element.address.includes(filterTerm) || element.name.includes(filterTerm)) ? result.push(element) : console.log("filtered")
  });

  return result
}

const reload = () => {
  fetchTrains()
  console.log(trains)
}

const props = defineProps({
  
})
</script>
