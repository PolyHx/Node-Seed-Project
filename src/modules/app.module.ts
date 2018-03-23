import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forRoot(process.env.DB_URI, { useMongoClient: true }),
        UserModule,
        FileModule
    ]
})
export class ApplicationModule {
}
