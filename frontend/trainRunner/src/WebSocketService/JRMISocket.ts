import { WebsocketBuilder, ArrayQueue, Websocket, ConstantBackoff, WebsocketEvent } from 'websocket-ts'

let ws: any;
const pendingRequests = new Map();

const heartBeatRate = 2000;
let nextId = 1;

const sendCommand = (command: any) => {
  if (ws?.readyState === WebSocket.OPEN) {
    return new Promise((resolve, reject) => {
        const id = nextId++;

        pendingRequests.set(id, {resolve, reject});
        command['id'] = id
        ws.send(JSON.stringify(command));
    })
  } 

  console.error('WebSocket ist nicht verbunden');
}


async function getRoster() {
    const command = {"list":"roster"}
    const response = await sendCommand(command);

    return response;
}

const connect = (socketIP: string) => {
    const handleMessages = (i: Websocket, ev: MessageEvent) => {
        try{
            const response = JSON.parse(ev.data);
            
            const pending = pendingRequests.get(response.id)

            if (pending) {
                pendingRequests.delete(response.id);
                pending.resolve(response);
            }
        }catch(e){
            console.log(`Received Unrequested Message: ${ev.data}`);
        }        
    }


    ws = new WebsocketBuilder( "ws://" + socketIP + "/json/" ) 
    .withBuffer(new ArrayQueue())
    .withBackoff(new ConstantBackoff(1000))
    .onClose((i, ev) => console.log("Closed Websocket"))
    .onOpen((i, ev) => console.log("Opened Websocket"))
    .onMessage((i, ev) => handleMessages(i, ev))
    .build();


    let timerId = setInterval(() => sendCommand({"type":"ping"}), heartBeatRate)

}

export {
    connect,
    getRoster,
}