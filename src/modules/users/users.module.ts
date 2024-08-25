
import { UserService } from 'src/modules/users/users.service';
import { UserController } from './users.controller';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/modules/users/schemas/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {

}