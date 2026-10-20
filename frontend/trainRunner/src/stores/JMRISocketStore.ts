import { WebsocketBuilder, ArrayQueue, Websocket, ConstantBackoff, WebsocketEvent } from 'websocket-ts'
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useJRMISocketStore = defineStore('jmrisocket', () => {
    const ws = ref() 

    const pendingRequests = new Map();
    const activeThrottles = new Map();

    const heartBeatRate = 2000;
    let nextId = 1;

    const sendCommand = (command: any, noResponse?: boolean) => {
        if (ws.value.readyState === WebSocket.OPEN) {
            if (!noResponse){
                return new Promise((resolve, reject) => {
                    const id = nextId++;

                    pendingRequests.set(id, {resolve, reject});
                    command['id'] = id;
                    ws.value.send(JSON.stringify(command));
                })
            } else {
                command['id'] = 0;
                ws.value.send(JSON.stringify(command))
            }
        } 

        console.error('WebSocket not connected');
    }

    async function getRoster() {
        const command = {"list":"roster"}
        return sendCommand(command);
    }

    async function subscribeToThrottle(trainAddress: number, throttleName: string, callback: Function) {
        activeThrottles.set(throttleName, callback)
        const command = {"type":"throttle", "data":{"name": throttleName, "address" : trainAddress}}

        sendCommand(command, false);
    }

    function setThrottleSpeed(throttleName: string, speed: number) {
        const command = {"type":"throttle", "data":{"name":throttleName, "speed":speed}}
        return sendCommand(command);
    }

    function setThrottleDirection(throttleName: string, forward: boolean) {
        const command = {"type":"throttle", "data":{"name":throttleName, "forward":forward}}
        return sendCommand(command);
    }


    const connect = (socketIP: string) => {
        const handleMessages = (i: Websocket, ev: MessageEvent) => {
            try{
                const response = JSON.parse(ev.data);

                if (response.id) {
                    const pending = pendingRequests.get(response.id)

                    if (pending) {
                        pendingRequests.delete(response.id);
                        pending.resolve(response);
                    }
                } else if (response.type === "throttle"){
                    const callback = activeThrottles.get(response.data.throttle)
                    callback(response.data)
                } else if (response.type === "pong") {
                    //console.log("Heartbeat")
                } else {
                    console.log('Received unindexed response:')
                    console.log(response)
                }
            }catch(e){
                console.log(`Received string that couldn't be parsed: ${ev.data}`);
            }
        }


        ws.value = new WebsocketBuilder( "ws://" + socketIP + "/json/" ) 
        .withBuffer(new ArrayQueue())
        .withBackoff(new ConstantBackoff(1000))
        .onClose((i, ev) => console.log("Closed Websocket"))
        .onOpen((i, ev) => console.log("Opened Websocket"))
        .onMessage((i, ev) => handleMessages(i, ev))
        .build();


        let timerId = setInterval(() => sendCommand({"type":"ping"}), heartBeatRate)

    }

    return {
        subscribeToThrottle,
        connect,
        getRoster,
        setThrottleSpeed,
        setThrottleDirection,
    }
})

