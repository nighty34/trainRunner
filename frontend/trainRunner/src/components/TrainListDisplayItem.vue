<template>
   <q-card flat bordered class="q-ma-sm train-card">
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

const props = defineProps({
  trainName: String,
  trainAddress: String,
  trainIcon: String,
})

</script>

<style lang="sass" scoped>
.train-card
  width: 300px
  height: 140px

.textbox
  background-color: rgba(0, 100,200,.2)
</style>
