import * as bcrypt from "bcrypt";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserCondition, UserSchema } from "./user.model";

@Component()
export class UserService {
    constructor(@InjectModel(UserSchema) private userModel: Model<User>) {
    }

    public async validateUser(signedUser: User) {
        const user = await this.findOne({ username: signedUser.username });

        if (!user) {
            return false;
        }

        return bcrypt.compareSync(signedUser.password, user.password);
    }

    public async create(user: Partial<User>): Promise<User> {
        user.password = bcrypt.hashSync(user.password, 10);
        const dbUser = new this.userModel(user as User);
        return await dbUser.save();
    }

    public findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    public findOne(conditions: UserCondition): Promise<User> {
        return this.userModel.findOne(conditions).exec();
    }

    public update(conditions: UserCondition, user: Partial<User>) {
        return this.userModel.update(conditions, user as User).exec();
    }

    public remove(conditions: UserCondition) {
        return this.userModel.remove(conditions).exec();
    }
}
