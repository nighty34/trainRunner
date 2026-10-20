import { ref } from 'vue'
import { useJRMISocketStore } from '@/stores/JMRISocketStore'

const jmriStore = useJRMISocketStore()

const trains = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchTrains() {
    loading.value = true
    error.value = null

    try {
        const response: any = await jmriStore.getRoster();
        
        trains.value = []
        response.data.forEach((element: { data: any }) => trains.value.push(element.data));
    } catch {
        error.value = 'Error'
    } finally {
        loading.value = false
    }
}

export {
    trains,
    loading,
    error,
    fetchTrains
}
