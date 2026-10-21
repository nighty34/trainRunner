import { computed, ref } from 'vue'
import { useJRMISocketStore } from './JMRISocketStore';
import { trains } from '@/composables/useTrains';
import { defineStore } from 'pinia';


export const useThrottleStore = defineStore('throttleStore', () => {
    const throttleName = ref(new Map())
    const throttles = ref(new Map())
    const jrmisocket = useJRMISocketStore()

    const getThrottleNameByAddress = (trainAddress: number) => {
        return [...throttleName.value.entries()]
        .find(([, address]) => address === trainAddress)?.[0];
    }


    const updateThrottleCallback = (response: any) => {
        const trainAddress = throttleName.value.get(response.name)
        const trainState = throttles.value.get( throttleName.value.get(response.name));

        for (const entry in response) {
            trainState[entry] = response[entry];
        }

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

    const setThrottleSpeed = (trainAddress: number, speed: number) => {
        const throttleName = getThrottleNameByAddress(trainAddress)
        jrmisocket.setThrottleSpeed(throttleName, speed);
    }

    const getThrottleSpeed = (trainAddress: number) => {
        return computed({
            get: () => {return throttles.value.get(trainAddress)?.speed ?? -1},
            set: (value: number) => {
                const throttleName = getThrottleNameByAddress(trainAddress)
                jrmisocket.setThrottleSpeed(throttleName, value);
            }  
        });
    }

    const setThrottleDirection = (trainAddress: number, forward: boolean) => {
        const throttleName = getThrottleNameByAddress(trainAddress)
        jrmisocket.setThrottleDirection(throttleName, forward);
    }

    const getThrottleDirection = (trainAddress: number) => {
        return computed({
            get: () => {return throttles.value.get(trainAddress)?.forward ?? true},
            set: (value: boolean) => {
                const throttleName = getThrottleNameByAddress(trainAddress)
                jrmisocket.setThrottleDirection(throttleName, value);
            } 
        });
    }

    const getAllActiveThrottles = () => {
        
        let activeThrottles = new Map()
        for (var key in throttles.value.keys()) {
            let newThrottle: any = {}
            const currentAddress = throttles.value.get(key)?.address;

            newThrottle.address = currentAddress;
            const trainReference = trains.value?.filter(element => element.address === currentAddress)[0];

            newThrottle.icon = trainReference?.comment ?? '';
            newThrottle.name = trainReference?.name ?? '';


            activeThrottles.set(currentAddress, newThrottle)
        }
        return activeThrottles
    }


    return {
        throttles,
        subscribeByTrainAddress,
        setThrottleSpeed,
        getThrottleSpeed,
        getThrottleDirection,
        setThrottleDirection,
        getAllActiveThrottles,
    }
})



