<template>
   <q-card flat bordered class="q-ma-sm">
    <img alt="TrainImage" src=""/>
    <q-card-section>
      <div class="text-h6">{{trainName}}</div>
      <div class="text-subtitle2">{{  trainAddress}}</div>
    </q-card-section>
   </q-card>
</template>

<script setup lang="ts">

const props = defineProps({
  trainName: String,
  trainAddress: String,
})
</script>
