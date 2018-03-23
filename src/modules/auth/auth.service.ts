import * as fs from "fs";
import * as jwt from 'jsonwebtoken';
import { Component, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { TokenPayloadModel } from "./tokenPayload.model";

@Component()
export class AuthService {
    constructor(private userService: UserService) {
    }

    async createToken(user: User) {
        const expiresIn = 60 * 60;
        const payload: TokenPayloadModel = {
            username: user.username
        };
        const token = jwt.sign(payload, fs.readFileSync(process.env.PRIVATE_KEY_PATH), {
            expiresIn,
            algorithm: "RS256"
        });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    validateUser(payload: TokenPayloadModel): Promise<User> {
        return this.userService.findOne({
            username: payload.username
        });
    }

    async validateAuth(user: User) {
        if (!await this.userService.validateUser(user)) {
            throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }

        return await this.userService.findOne({ username: user.username });
    }
}
