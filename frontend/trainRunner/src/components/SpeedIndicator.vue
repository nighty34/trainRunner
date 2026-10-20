<template>
   <q-card>
      <q-card-section>
         <div class="row justify-around">
            <q-slider v-model="speed" vertical :min="0" :max="1" :step="0.04" label reverse label-always :markers=".2"  />
         </div>
      </q-card-section>
      <q-card-section>
      <div>
         <q-btn-group push>
            <q-btn icon="arrow_back_ios" v-if="forward" @click="setForward(false)"/>
            <q-btn icon="arrow_back_ios" class="selected" v-else/>
            <q-btn icon="train" />
            <q-btn icon="arrow_forward_ios" class="selected" v-if="forward"/>
            <q-btn icon="arrow_forward_ios" @click="setForward(true)" v-else/>
         </q-btn-group>
      </div>
      </q-card-section>
   </q-card>
</template>

<script setup>
import { useThrottleStore } from '@/stores/throttleStore';

const throttelStore = useThrottleStore()

const props = defineProps({
  trainAddress: Number
})

const trainAddress = props.trainAddress;
const speed = throttelStore.getThrottleSpeed(trainAddress);
const forward = throttelStore.getThrottleDirection(trainAddress);
const setForward = (isForward) => {
   throttelStore.setThrottleDirection(trainAddress, isForward);
}

</script>
<style lang="sass">
.selected
   background-color: $grey-5
</style>
