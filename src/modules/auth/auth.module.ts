import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./passport/jwt.strategy";

@Module({
    imports: [UserModule],
    components: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {
}
