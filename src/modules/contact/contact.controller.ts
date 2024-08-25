import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { HttpStatus } from "src/configs/responeConfig/responeStatus";
import { Public } from "src/customs/customize";
import { ContactService } from "src/modules/contact/contact.service";
import { createContactDto } from "src/modules/contact/dtos/createContact.dto";
import { deleteContactDto } from "src/modules/contact/dtos/deleteContact.dto";
import { responeData } from "src/utils/responeData";
@Controller('contact')

export class ContactController {

    constructor(private readonly contactService: ContactService) { }

    @Get(':id')
    @Public()
    async GetContact(@Param('id') id: string) {
        try {
            console.log(id)
            console.log('hello')
            return await this.contactService.getContact(id)
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

    @Post()
    CreateChat(@Body() createValue: createContactDto) {
        return createValue
    }

    @Delete(':id')
    DeleteChat(@Param(':id') id: deleteContactDto) {
        return id
    }
}