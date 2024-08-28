import { UserService } from './../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Friend } from 'src/modules/friend/schemas/friend.schema';
import { Model } from 'mongoose';
import { responeData } from 'src/utils/responeData';
import { HttpStatus } from 'src/configs/responeConfig/responeStatus';

@Injectable({})

export class FriendService {
    constructor(
        @InjectModel(Friend.name) private friendModel: Model<Friend>,
        private UserService: UserService
    ) { }

    async getFriend(userId: string) {
        try {
            const resultUser = await this.friendModel.find({ User_Id: userId })
            const resultFriend = await this.friendModel.find({ Friend_Id: userId })
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'Get friend success!',
                data: [...resultUser, ...resultFriend]
            });
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

    async createFriend(userId: string, friend_Id: string) {
        try {

            if (userId == friend_Id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Cant add',
                    error: { friend: 'Cant add!' }
                });
            }

            if (!await this.UserService.is_IDExist(friend_Id)) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Not found user',
                    error: { friend: 'Not found user!' }
                });
            }

            const resultUser = await this.friendModel.find({ User_Id: userId, Friend_Id: friend_Id })
            const resultFriend = await this.friendModel.find({ Friend_Id: userId, User_Id: friend_Id })
            if (resultUser.length > 0 || resultFriend.length > 0) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'create friend fail!',
                    error: { addFriend: 'You added' },
                });
            }

            const result = await this.friendModel.create({ User_Id: userId, Friend_Id: friend_Id });
            if (!result) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'add friend faild!',
                    error: { friend: 'add friend faild!' }
                });
            }
            return responeData({
                statusCode: HttpStatus.SUCCESS,
                message: 'Add friend success!',
                data: result
            });

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

    async deleteFriend(userId: string, friend_Id: string) {
        try {

            if (userId == friend_Id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Cant delete',
                    error: { friend: 'Cant delete!' }
                });
            }

            if (!await this.UserService.is_IDExist(friend_Id)) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Not found user',
                    error: { friend: 'Not found user!' }
                });
            }

            const resultUser = await this.friendModel.findOne({ User_Id: userId, Friend_Id: friend_Id })
            const resultFriend = await this.friendModel.findOne({ Friend_Id: userId, User_Id: friend_Id })
            if (resultUser) {
                await this.friendModel.deleteOne({ User_Id: userId, Friend_Id: friend_Id })
                return responeData({
                    statusCode: HttpStatus.SUCCESS,
                    message: 'delete friend success!',
                    error: { addFriend: 'delete friend success!' },
                });
            }

            if (resultFriend) {
                await this.friendModel.deleteOne({ Friend_Id: userId, User_Id: friend_Id })
                return responeData({
                    statusCode: HttpStatus.SUCCESS,
                    message: 'delete friend success!',
                    error: { addFriend: 'delete friend success!' },
                });
            }

            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'delete friend fail!',
                error: { addFriend: 'delete friend fail!' },
            });


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