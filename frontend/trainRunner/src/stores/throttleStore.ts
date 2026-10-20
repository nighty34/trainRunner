import { ref } from 'vue'
import { useJRMISocketStore } from './JMRISocketStore';

const throttles = ref(new Map())
const jrmisocket = useJRMISocketStore()

const updateThrottleCallback = (response: any) => {
    const throttleData = throttles.value.get(response.address);
    throttles.value.set(response.address, throttleData);
}

const subscribeByTrainAddress = (trainAddress: number) => {
    throttles.value.set(trainAddress, {});
    jrmisocket.subscribeToThrottle(trainAddress, updateThrottleCallback);
}



export {
    throttles,
    subscribeByTrainAddress,
}
