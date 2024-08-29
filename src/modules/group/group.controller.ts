import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { authInfo } from "src/customs/auth";
import { authType } from "src/modules/auth/model/auth.model";
import { create_groupDto } from "src/modules/group/dtos/createGroup.dto";
import { update_groupDto } from "src/modules/group/dtos/updateGroup.dto";
import { GroupService } from "src/modules/group/group.service";
import { responeData } from "src/utils/responeData";

@Controller('group')

export class GroupController {

    constructor(private GroupService: GroupService) { }

    @Get()
    get_Group__CL() {

    }

    @Post()
    create_Group__CL(
        @authInfo() auth: authType,
        @Body() groupInfo: create_groupDto
    ) {
        return this.GroupService.create_Group__CL(auth, groupInfo)
    }

    @Put(':id')
    update_Group__CL(
        @Param('id') id: string,
        @authInfo() auth: authType,
        @Body() groupInfo: update_groupDto
    ) {
        if (!id) {
            return responeData({
                statusCode: 404,
                message: 'Id is required',
                error: { delete_group: 'Id is required' }
            })
        }
        return this.GroupService.update_Group__CL(id, groupInfo, auth)
    }

    @Delete(':id')
    delete_Group__CL(
        @Param('id') id: string,
        @authInfo() auth: authType,
    ) {
        if (!id) {
            return responeData({
                statusCode: 404,
                message: 'Id is required',
                error: { delete_group: 'Id is required' }
            })
        }
        return this.GroupService.delete_Group__CL(id, auth)
    }
}