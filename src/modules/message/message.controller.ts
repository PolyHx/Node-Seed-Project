import { Controller, Get } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";

@Controller('message')
export class MessageController {
    constructor(private messageGateway: MessageGateway) {
    }

    @Get()
    async post() {
        this.messageGateway.sendHello();
    }
}
