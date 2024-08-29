import { FriendService } from 'src/modules/friend/friend.service';
import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { responeData } from 'src/utils/responeData';
import { HttpStatus } from 'src/configs/responeConfig/responeStatus';
import { authInfo } from 'src/customs/auth';
import { authType } from 'src/modules/auth/model/auth.model';

@Controller('friend')

export class FriendController {
    constructor(private FriendService: FriendService) { }
    @Get()
    async getFriend(@authInfo() userInfo: authType | undefined) {
        try {
            if (!userInfo.Id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Not found your id!',
                    error: {
                        friend: 'Not found your id'
                    },
                });
            }

            return await this.FriendService.getFriend(userInfo.Id)
        } catch (error) {
            console.error('>> Error get friend');
            console.log(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'get friend fail!',
                error: error,
            });
        }
    }

    @Post(':id')
    createFriend(@Param('id') friendId: string, @authInfo() userInfo: authType | undefined) {
        try {
            if (!userInfo.Id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Not found your id!',
                    error: {
                        friend: 'Not found your id'
                    },
                });
            }

            return this.FriendService.createFriend(userInfo, friendId)

        } catch (error) {
            console.error('>> Error create friend');
            console.log(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'create friend fail!',
                error: error,
            });
        }
    }

    @Delete(':id')
    deteleFriend(@Param('id') friendId: string, @authInfo() userInfo: authType | undefined) {
        try {
            if (!userInfo.Id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Not found your id!',
                    error: {
                        friend: 'Not found your id'
                    },
                });
            }

            return this.FriendService.deleteFriend(userInfo.Id, friendId)

        } catch (error) {
            console.error('>> Error create friend');
            console.log(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'create friend fail!',
                error: error,
            });
        }
    }
}