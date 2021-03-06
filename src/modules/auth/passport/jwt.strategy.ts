import * as fs from "fs";
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: fs.readFileSync(process.env.PUBLIC_KEY_PATH),
            },
            async (req, payload, next) => await this.verify(req, payload, next)
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done('Unauthorized', false);
        }
        done(null, user);
    }
}
