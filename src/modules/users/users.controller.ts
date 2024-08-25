import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { HttpStatus } from 'src/configs/responeConfig/responeStatus';
import { updateUserDto } from 'src/modules/users/dots/updateUser.dto';
import { UserService } from 'src/modules/users/users.service';
import { responeData } from 'src/utils/responeData';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('/')
    findAll(
        @Query() query: string,
        @Query('current') current: string,
        @Query('limit') limit: string,
    ) {
        return this.userService.findAll(query, +current, +limit);
    }


    @Put(':id')
    async UpdateUser(@Param('id') id: string, @Body() updateUser: updateUserDto) {
        try {
            if (!id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Information is missing!',
                    error: { id: 'Missing!' },
                });
            }
            return await this.userService.updateUser(id, updateUser);

        } catch (error) {
            console.log('>> Error updating User')
            console.error(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'update user fail!',
                error: error,
            });
        }
    }

    @Delete(':id')
    async DeleteUser(@Param('id') id: string) {
        try {
            if (!id) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Information is missing!',
                    error: { id: 'Missing!' },
                });
            }
            return await this.userService.deleteUser(id);

        } catch (error) {
            console.log('>> Error deleting User')
            console.error(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'deleting user fail!',
                error: error,
            });
        }
    }
}
