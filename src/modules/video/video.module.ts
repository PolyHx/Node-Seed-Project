import { MiddlewaresConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as passport from "passport";
import { VideoController } from "./video.controller";

@Module({
    controllers: [VideoController],
})
export class VideoModule {
}


