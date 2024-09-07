import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { handlePath } from "src/configs/multerConfig/multerPath";
import { HttpStatus } from "src/configs/responeConfig/responeStatus";
import { authInfo } from "src/customs/auth";
import { Public } from "src/customs/customize";
import { authType } from "src/modules/auth/model/auth.model";
import { createMessDtos } from "src/modules/message/dtos/createMess.sto";
import { MessService } from "src/modules/message/message.service";
import { responeData } from "src/utils/responeData";
@Controller('message')

export class MessController {

    constructor(private readonly messService: MessService) { }

    @Get(':topic')
    @Public()
    async GetMess(
        @Param('topic') topic: string,
        @Query() query: string,
        @Query('current') current: string,
        @Query('limit') limit: string,
    ) {
        try {
            return await this.messService.getMess(query, +current, +limit)
        } catch (error) {
            console.log('>>  Error get mess')
            console.error(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'get mess fail!',
                error: error,
            });
        }
    }



    @Post()
    @UseInterceptors(FilesInterceptor('Files', 10, {
        storage: handlePath({ folder_name: 'message' })
    }))
    async uploadFile(@UploadedFiles() Files: Array<Express.Multer.File>, @authInfo() userInfo: authType, @Body() body: createMessDtos) {
        try {
            if (body.Type != 0 && body.Type != 1 && body.Type != 2) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Not type contact, group and chanel!',
                    error: {
                        message_Type: 'Not type contact, group and chanel!'
                    },
                });
            }

            return await this.messService.createMess(Files, userInfo, body)
        } catch (error) {
            console.log('>> Error create mess')
            console.error(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'create mess fail!',
                error: error,
            });
        }
    }

}