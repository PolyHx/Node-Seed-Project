import { MiddlewaresConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as passport from "passport";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    components: [UserService],
    exports: [UserService],
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    ]
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(UserController);
    }
}
