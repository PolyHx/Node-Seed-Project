import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import * as SocketIO from "socket.io";
import * as Ws from "ws";

@WebSocketGateway()
export class MessageGateway {

    // If using Socket.Io (Default)
    @WebSocketServer()
    private server: SocketIO.Server;

    // If using WebSocking instead of Socket.io
    @WebSocketServer()
    private WsServer: Ws.Server;

    sendHello() {
        this.server.emit('event', "Hello World!");
    }

    @SubscribeMessage('event')
    onEvent(client, data): WsResponse<any> {
        const event = 'event';
        return { event, data };
    }
}
