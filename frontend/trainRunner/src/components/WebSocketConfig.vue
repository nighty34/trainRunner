<template>
   <q-card flat bordered class="q-ma-sm">
    <q-card-section class="bg-primary text-white">
      <div class="text-h5">WebSocket Connection</div>
    </q-card-section>
    <q-card-section>
      <q-input filled v-model="websocketIP" label="WiThrottle IP" class="q-ma-sm"/>
      <q-btn color="primary" label="Connect" class="q-ma-sm" @click="makeConnection"/>
    </q-card-section>
   </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useJRMISocketStore } from '@/stores/JMRISocketStore'

const jrmiStore = useJRMISocketStore()
const websocketIP = ref("localhost:12080")

const makeConnection = () => {
  jrmiStore.connect(websocketIP.value);
}


/*const props = defineProps({
  nothign
})*/
</script>
