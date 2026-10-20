import { ref } from 'vue'
import { subscribeToThrottle } from '@/WebSocketService/JRMISocket'

const throttles = ref(new Map())


const updateThrottleCallback = (response: any) => {
    const throttleData = throttles.value.get(response.address);
    throttles.value.set(response.address, throttleData);
}

const subscribeByTrainAddress = (trainAddress: number) => {
    throttles.value.set(trainAddress, {});
    subscribeToThrottle(trainAddress, updateThrottleCallback);
}



export {
    throttles,
    subscribeByTrainAddress,
}
