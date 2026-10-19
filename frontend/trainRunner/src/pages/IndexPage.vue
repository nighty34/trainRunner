<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <TrainListDisplay />
      <WebSocketConfig />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TrainListDisplay from '@/components/TrainListDisplay.vue';
import WebSocketConfig from '@/components/WebSocketConfig.vue';


</script>
