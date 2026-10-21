import { ref } from 'vue'
import { useJRMISocketStore } from './JMRISocketStore';
import { defineStore } from 'pinia';


export const useTrainStore = defineStore('trainstore', () => {
    const jmriStore = useJRMISocketStore();
    const roster = ref<any>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchTrains() {
        loading.value = true;
        error.value = null;

        try {
            const response: any = await jmriStore.getRoster();

            roster.value = []
            response.data.forEach((element: { data: any }) => roster.value.push(element.data));
        } catch {
            error.value = 'Error'
        } finally {
            loading.value = false
        }
    }

    const getTrainById = (trainAddress: number) => {
        return roster.value.find((train: any) => train.address == trainAddress);
    }

    return {
        fetchTrains,
        getTrainById,
        loading,
        roster
    }
})



