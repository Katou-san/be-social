import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contact } from "src/modules/contact/schemas/contact.schema";
import { User } from "src/modules/users/schemas/users.schema";
import { createId } from "src/utils/createId";
import { responeData } from "src/utils/responeData";

@Injectable({})

export class ContactService {
    constructor(
        @InjectModel(Contact.name) private ContactModel: Model<Contact>,
        @InjectModel(Contact.name) private UserModel: Model<User>) { }

    async createContact(User_Id: string) {
        try {
            const result = await this.ContactModel.create({
                Contact_Id: createId('Contact'),
                User_Id
            })

            if (!result) {
                return false
            }
            return true
        } catch (error) {
            return true
        }
    }

    async getContact(ContactId: string) {
        try {
            const findContact = await this.ContactModel.findOne({ Contact_Id: ContactId });
            if (!findContact) {
                return responeData({
                    statusCode: 404,
                    message: 'get Contact failed!',
                    error: { getContact: 'get Contact failed!' }
                })
            }
            return responeData({
                message: 'get Contact successfully!',
                data: findContact
            })
        } catch (error) {
            return responeData({
                statusCode: 404,
                message: 'get Contact failed!',
                error: { getContact: error }
            })
        }
    }




}