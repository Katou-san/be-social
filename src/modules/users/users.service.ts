import { User } from './schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpStatus } from 'src/configs/responeConfig/responeStatus';
import { reponseData_Type, responeData } from 'src/utils/responeData';
import aqp from 'api-query-params';
import { updateUserDto } from 'src/modules/users/dots/updateUser.dto';
import { convertNullData } from 'src/utils/convert';

@Injectable({})
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }


    async find_Email(Email: string) {
        const user = await this.userModel.findOne({
            Email: Email.toLowerCase().trim(),
        });
        if (user) return user;
        return null;
    }

    async is_EmailExist(Email: string) {
        const user = await this.userModel.exists({
            Email: Email.toLowerCase().trim(),
        });
        if (user) return true;
        return false;
    }

    async is_IDExist(User_Id: string) {
        const user = await this.userModel.exists({
            User_Id,
        });
        if (user) return true;
        return false;
    }

    async is_NicknameExist(Nickname: string) {
        const user = await this.userModel.exists({
            Nickname: '@' + Nickname.toLowerCase().trim(),
        });
        if (user) return true;
        return false;
    }

    async findAll(query: string, current: number, limit: number) {
        const { filter, sort } = aqp(query)
        if (filter.current) delete filter.current
        if (filter.limit) delete filter.limit

        if (!current) current = 1
        if (!limit) limit = 10

        const totalItems = (await this.userModel.find(filter)).length
        const totalPage = Math.ceil(totalItems / limit)
        const skip = (current - 1) * limit

        const result = await this.userModel
            .find(filter)
            .limit(limit)
            .select('-Pass')
            .skip(skip)
            .sort(sort as any)
        return responeData({ message: 'Get success!', data: { result, totalPage } });

    }

    async updateUser(id: string, data: updateUserDto): Promise<reponseData_Type> {
        try {
            if (!await this.is_IDExist(id)) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Id user not found!',
                    error: { id: 'Id user not found!' },
                });
            }

            const result = await this.userModel.findOneAndUpdate({ User_Id: id }, { ...convertNullData(data, ['User_Id', '_id']) }, { new: true })

            return responeData({
                statusCode: HttpStatus.SUCCESS,
                message: 'Update success!',
                data: result
            });

        } catch (error) {
            console.error('>> Error updating user');
            console.log(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'Update fail!',
                error: error,
            });
        }
    }

    async deleteUser(id: string): Promise<reponseData_Type> {
        try {
            if (!await this.is_IDExist(id)) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Id user not found!',
                    error: { id: 'Id user not found!' },
                });
            }

            const result = await this.userModel.deleteOne({ User_Id: id })

            if (result.deletedCount == 0) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Delete fail!',
                    error: { user: 'delete count = 0' }
                });
            }

            return responeData({
                statusCode: HttpStatus.SUCCESS,
                message: 'Delete success!',
                data: result
            });

        } catch (error) {
            console.error('>> Error updating user');
            console.log(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'Delete fail!',
                error: error,
            });
        }
    }
}
