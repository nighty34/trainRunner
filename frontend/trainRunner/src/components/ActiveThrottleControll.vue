<template>
   <q-card>
      <div class="q-pa-md row items-start">
      <TrainListDisplayItem v-for="[address, train] in throttleStore.throttles" :train-name="trainStore.getTrainById(address)?.name" :train-address="trainStore.getTrainById(address)?.address" :train-icon="trainStore.getTrainById(address)?.comment" />
      </div>
   </q-card>
</template>

<script setup>
import { useThrottleStore } from '@/stores/throttleStore';
import { useTrainStore } from '@/stores/trainStore';
import TrainListDisplayItem from './TrainListDisplayItem.vue';
import { onMounted } from 'vue';

const throttleStore = useThrottleStore();
const trainStore = useTrainStore();


onMounted(async () => {
    if (trainStore.roster.length === 0) {
        await trainStore.fetchTrains();
    }
});

</script>
