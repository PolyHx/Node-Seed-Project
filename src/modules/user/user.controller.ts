import { Body, Controller, Get, Post } from "@nestjs/common";
import { Users } from "../../decorators/user.decorator";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    async create(@Body() user: User) {
        return {
            user: await this.userService.create(user)
        };
    }

    @Get()
    async getAll(@Users() user: User) {
        return {
            users: await this.userService.findAll()
        };
    }
}
