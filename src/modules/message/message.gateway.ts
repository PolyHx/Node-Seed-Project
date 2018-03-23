import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import * as SocketIO from "socket.io";
import * as WebSocket from "ws";

@WebSocketGateway({
    port: 8081
})
export class MessageGateway {

    // If using Socket.Io (Default)
    @WebSocketServer()
    private server: SocketIO.Server;

    // If using WebSocket instead of Socket.io
    /*@WebSocketServer()
    private WsServer: WebSocket.Server;*/

    sendHello() {
        // If using Socket.Io (Default)
        this.server.emit("event", "Hello World!");

        // If using WebSocket instead of Socket.io
        /*for (let client of this.WsServer.clients) {
            client.send(JSON.stringify({ type: "event", data: "Hello World!" }));
        }*/
    }

    @SubscribeMessage('event')
    onEvent(client, data): WsResponse<any> {
        const event = 'event';
        return { event, data };
    }
}
