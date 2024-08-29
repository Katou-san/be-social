import { Controller, Get } from '@nestjs/common';
import { authInfo } from 'src/customs/auth';
import { authType } from 'src/modules/auth/model/auth.model';
import { ConversationService } from 'src/modules/conversation/conversation.service';

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }
    @Get()
    get_conversation__CL(@authInfo() user: authType) {
        return this.conversationService.get_Conversation__SV(user)
    }
}
