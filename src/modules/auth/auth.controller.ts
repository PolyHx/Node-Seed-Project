import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { User } from "../user/user.model";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("authorized")
    @HttpCode(HttpStatus.OK)
    public async authorized(@Body() singedUser: User) {
        const user = await this.authService.validateAuth(singedUser);
        return this.authService.createToken(user);
    }
}
