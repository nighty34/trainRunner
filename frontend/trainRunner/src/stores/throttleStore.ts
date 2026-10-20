import { ref } from 'vue'
import { useJRMISocketStore } from './JMRISocketStore';
import { throttle } from 'quasar';

const throttleName = ref(new Map())
const throttles = ref(new Map())
const jrmisocket = useJRMISocketStore()

const updateThrottleCallback = (response: any) => {
    const trainAddress = throttleName.value.get(response.name)
    const trainState = throttles.value.get( throttleName.value.get(response.name));
    for (const entry in response) {
        trainState[entry] = response[entry];
    }
    //merge both
    throttles.value.set(trainAddress, trainState);
}

const subscribeByTrainAddress = (trainAddress: number) => {
    if (!throttles.value.get(trainAddress)){
        throttles.value.set(Number(trainAddress), {});
    }

    const throttleIdentifier = crypto.randomUUID();
    throttleName.value.set(throttleIdentifier, Number(trainAddress))
    jrmisocket.subscribeToThrottle(trainAddress, throttleIdentifier, updateThrottleCallback);
}



export {
    throttles,
    subscribeByTrainAddress,
}
