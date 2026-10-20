<template>
   <q-card flat bordered class="q-ma-sm train-card" @click="clickOnTrain(trainAddress)">
    <q-card-section>
      <div class="q-px-lg">
        <q-img class="vertical-bottom q-px-sm" alt="NO IMAGE" :src="'data:image/png;base64,' + trainIcon" />
      </div>
    </q-card-section>
    
    <div class="q-pa-sm absolute-bottom text-subtitle2 text-right">{{ trainAddress }} </div>
    <div class="textbox q-pa-sm absolute-bottom text-subtitle2 text-left"> {{trainName}} </div>
   </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const props = defineProps({
  trainName: String,
  trainAddress: String,
  trainIcon: String,
})

const router = useRouter()

const clickOnTrain = (trainAddress?: string) => {
  if (trainAddress) {
     router.push({name: 'throttle', params: {trainAddress: trainAddress}})
  }
}

</script>

<style lang="sass" scoped>
.train-card
  width: 300px
  height: 140px

.textbox
  background-color: rgba(0, 100,200,.2)
</style>
