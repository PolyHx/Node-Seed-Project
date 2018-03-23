import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forRoot(process.env.DB_URI),
        UserModule,
        FileModule,
        MessageModule
    ]
})
export class ApplicationModule {
}
