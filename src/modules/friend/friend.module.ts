import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConversationModule } from "src/modules/conversation/conversation.module";
import { FriendController } from "src/modules/friend/friend.controller";
import { FriendService } from "src/modules/friend/friend.service";
import { Friend, FriendSchema } from "src/modules/friend/schemas/friend.schema";
import { UserModule } from "src/modules/users/users.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
        UserModule,
        ConversationModule
    ],
    controllers: [FriendController],
    providers: [FriendService]
})

export class FriendModule {

}