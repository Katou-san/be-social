import { UserService } from 'src/modules/users/users.service';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { authType } from "src/modules/auth/model/auth.model";
import { create_groupDto } from "src/modules/group/dtos/createGroup.dto";
import { update_groupDto } from "src/modules/group/dtos/updateGroup.dto";
import { Group } from "src/modules/group/schemas/groups.schema";
import { responeData } from "src/utils/responeData";

@Injectable()

export class GroupService {

    constructor(
        @InjectModel(Group.name) private GroupModel: Model<Group>,
        private UserService: UserService
    ) { }

    async Group_Exist(topic: string, type: 'id' | 'name') {

        const result = await this.GroupModel.findOne(type == 'name' ? { Group_Name: topic } : { Group_Id: topic })
        return result ? true : false;
    }

    async get_Group__CL() {
        try {

        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'create group failed!',
                error: { create_group: error }
            })
        }
    }


    async create_Group__CL(authInfo: authType, groupInfo: create_groupDto) {
        try {

            if (!this.UserService.is_IDExist(authInfo.Id)) {
                return responeData({
                    statusCode: 404,
                    message: 'Not found user',
                    error: { create_group: 'Not found user' }
                })
            }

            if (this.Group_Exist(groupInfo.Group_Name, 'name')) {
                return responeData({
                    statusCode: 404,
                    message: 'Name group is existing!',
                    error: { create_group: 'Name group is existing!' }
                })
            }
            const result = await this.GroupModel.create({ ...groupInfo, User_Id: authInfo })
            return responeData({
                statusCode: 200,
                message: 'create group success!',
                data: result
            })

        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'create group failed!',
                error: { create_group: error }
            })
        }
    }


    async update_Group__CL(id: string, groupInfo: update_groupDto, authInfo: authType) {
        try {
            if (!this.Group_Exist(id, 'id')) {
                return responeData({
                    statusCode: 404,
                    message: 'Not found group',
                    error: { update_group: 'Not found group' }
                })
            }

            if (groupInfo?.Group_Name && this.Group_Exist(groupInfo?.Group_Name, 'name')) {
                return responeData({
                    statusCode: 404,
                    message: 'Name group is existing!',
                    error: { update_group: 'Name group is existing!' }
                })
            }

            const result = await this.GroupModel.findOneAndUpdate({ Group_Id: id, User_Id: authInfo.Id }, groupInfo, { new: true })
            if (!result) {
                return responeData({
                    statusCode: 404,
                    message: 'You dont have permission to update group!',
                    error: { update_group: 'You dont have permission to update group!' }
                })
            }
            return responeData({
                statusCode: 200,
                message: 'update group success!',
                data: {}
            })
        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'update group failed!',
                error: { update_group: error }
            })
        }
    }

    async delete_Group__CL(id: string, authInfo: authType) {
        try {
            if (!this.Group_Exist(id, 'id')) {
                return responeData({
                    statusCode: 404,
                    message: 'Not found group',
                    error: { update_group: 'Not found group' }
                })
            }

            const result = await this.GroupModel.findOneAndDelete({ Group_Id: id, User_Id: authInfo.Id })
            if (!result) {
                return responeData({
                    statusCode: 404,
                    message: 'You dont have permission to update group!',
                    error: { update_group: 'You dont have permission to update group!' }
                })
            }
            return responeData({
                statusCode: 200,
                message: 'delete group success!',
                data: {}
            })

        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'create group failed!',
                error: { create_group: error }
            })
        }
    }
}