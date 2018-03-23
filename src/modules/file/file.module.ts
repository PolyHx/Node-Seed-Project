import { MiddlewaresConsumer, Module, NestModule } from "@nestjs/common";
import * as passport from "passport";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
    controllers: [FileController],
    components: [FileService],
    exports: [FileService]
})
export class FileModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(FileController);
    }
}
