import { MediaService } from 'src/modules/media/media.service';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createMessDtos } from "src/modules/message/dtos/createMess.sto";
import { Message } from "src/modules/message/schemas/message.schema";
import { User } from "src/modules/users/schemas/users.schema";
import { createId } from "src/utils/createId";
import { responeData } from "src/utils/responeData";
import { authType } from 'src/modules/auth/model/auth.model';
import aqp from 'api-query-params';

@Injectable({})

export class MessService {
    constructor(
        @InjectModel(Message.name) private MessModel: Model<Message>,
        @InjectModel(User.name) private UserModel: Model<User>,
        private MediaService: MediaService
    ) { }

    async getMess(query: string, current: number, limit: number) {
        try {
            const { filter, sort } = aqp(query)
            if (filter.current) delete filter.current
            if (filter.limit) delete filter.limit

            if (!current) current = 1
            if (!limit) limit = 10

            const totalItems = (await this.MessModel.find(filter)).length
            const totalPage = Math.ceil(totalItems / limit)
            const skip = (current - 1) * limit
            const result = await this.MessModel
                .find(filter)
                .limit(limit)
                .skip(skip)
                .sort(sort as any)
            return responeData({
                message: 'get Contact successfully!',
                data: result
            })
        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'get Contact failed!',
                error: { getContact: error }
            })
        }
    }

    async createMess(files: Array<Express.Multer.File> | undefined, userInfo: authType, value: createMessDtos) {
        try {
            let stateFileUpload = false

            const result = await this.MessModel.create({
                Message_Id: createId('Mess'),
                Message_Topic: value.Mess_Topic,
                Type: value.Type,
                User_Id: userInfo.Id
            })

            if (!result) {
                return responeData({
                    statusCode: 404,
                    message: 'Create mess failed!',
                    data: result
                })
            }

            if (files != undefined && files.length != 0) {
                try {
                    const createMedia = files.map(async (file, index) => {
                        await this.MediaService.createMedia(file, result.Message_Id)
                        return index
                    }).length
                    if (files.length == createMedia) {
                        stateFileUpload = true
                    }
                } catch (error) {
                }
            }

            return responeData({
                message: 'Create message successfully!',
                error: !stateFileUpload && files.length != 0 && files != undefined ? {
                    files: 'File upload failed!'
                } : {},
                data: result,
            })
        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'create message failed!',
                error: { createMess: error }
            })
        }
    }

}