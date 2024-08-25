import { Controller, Param, Post } from "@nestjs/common";

@Controller('userchat')

export class UserChatController {
    @Post(':id')
    createUserChat(@Param('id') userId: string) {
        return userId
    }
}