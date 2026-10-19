import { ref } from 'vue'
import { getRoster } from '@/WebSocketService/JRMISocket'
// import API and Type


const trains = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchTrains() {
    loading.value = true
    error.value = null

    try {
        trains.value = []
        const response: any = await getRoster();
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
