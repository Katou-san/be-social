import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authType } from 'src/modules/auth/model/auth.model';
import { Conversation } from 'src/modules/conversation/schema/conversitaion.model';
import { createId } from 'src/utils/createId';
import { responeData } from 'src/utils/responeData';

@Injectable()
export class ConversationService {
    constructor(@InjectModel(Conversation.name) private ConversationModel: Model<Conversation>) { }
    async get_Conversation__SV(user: authType) {
        try {
            const result = await this.ConversationModel.find({ User1_Id: user.Id })
            const result1 = await this.ConversationModel.find({ User2_Id: user.Id })


            return responeData({
                message: 'get sucessfully!',
                data: [...result, ...result1]
            })
        } catch (error) {
            return false
        }
    }
    async create_Conversation__SV(user: authType, User2_Id: string) {
        try {
            const result = await this.ConversationModel.create({
                Conversation_Id: createId('Conversation'),
                User1_Id: user.Id,
                User2_Id: User2_Id
            })

            if (!result) {
                return false
            }

            return true
        } catch (error) {
            return false
        }
    }
    async delete_Conversation__SV(user: authType, User2_Id: string) {
        try {
            const check1 = await this.ConversationModel.findOne({ User1_Id: user.Id, User2_Id })
            const check2 = await this.ConversationModel.findOne({ User1_Id: User2_Id, User2_Id: user.Id })
            if (check1) {
                await this.ConversationModel.deleteOne({ Conversation_Id: check1.Conversation_Id })
                return true
            }

            if (check2) {
                await this.ConversationModel.deleteOne({ Conversation_Id: check2.Conversation_Id })
                return true
            }

            return false
        } catch (error) {
            return false
        }
    }
}
