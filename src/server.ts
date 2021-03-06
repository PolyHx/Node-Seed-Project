require("dotenv").config();

import * as express from "express";
import * as morgan from "morgan";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
import { WsAdapter } from "./adapters/ws.adapter";

async function bootstrap() {
    const app: express.Application = express();

    app.use(morgan("dev"));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.headers["origin"]) {
            res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        next();
    });

    const nestApp = await NestFactory.create(ApplicationModule, app, {
        cors: { preflightContinue: true },
        bodyParser: true
    });

    // If using WebSocket instead of Socket.io
    // nestApp.useWebSocketAdapter(new WsAdapter());

    await nestApp.listen(Number(process.env.PORT));
}

bootstrap();
