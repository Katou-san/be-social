import { Module } from "@nestjs/common";
import { UserChatController } from "src/modules/userchat/userchat.controller";
import { userChatService } from "src/modules/userchat/userchat.service";


@Module({
    controllers: [UserChatController],
    providers: [userChatService]
})

export class userChatModule {

}