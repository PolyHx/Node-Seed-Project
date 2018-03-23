import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { MessageController } from "./message.controller";

@Module({
    controllers: [MessageController],
    components: [MessageGateway],
    exports: [MessageGateway]
})
export class MessageModule {
}
