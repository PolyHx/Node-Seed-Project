# Node-Seed-Project

This project is using NestJs, go check the NestJs documentation for more details : https://docs.nestjs.com/

### WebSockets

By default, the server is using socket.io. However, Ws is supported.

#### How to use Ws

In server.ts, remove the comment of the line 27
``` Typescript
nestApp.useWebSocketAdapter(new WsAdapter());
```

In Gateways, you must use WsServer
``` Typescript
@WebSocketServer()
private WsServer: WebSocket.Server;
```

To send a message to all connected user
``` Typescript
for (let client of this.WsServer.clients) {
    client.send(JSON.stringify({ type: "event", data: "Hello World!" }));
}
```

All messages must have a type and a data property. The type property is detected by the `SubscribeMessage` decorator
``` Typescript
@SubscribeMessage('event')

{
   type: "event",
   data: {
       some: "Data",
       to: "send"
   }
}
```
