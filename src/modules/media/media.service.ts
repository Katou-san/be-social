import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Media } from "src/modules/media/schema/media.schema";
import { createId } from "src/utils/createId";

@Injectable()

export class MediaService {
    constructor(@InjectModel(Media.name) private MediaModel: Model<Media>) { }
    async createMedia(file: Express.Multer.File, Topic_Id: string) {
        const type = file.mimetype.split("/")[0];
        if (!file) {
            return false
        }

        const resultMedia = await this.MediaModel.create({
            Meida_Id: createId(type != 'audio' && type != 'image' ? 'file' : type),
            Meida_Topic: Topic_Id,
            File_Name: file.filename,
            Mine_Type: file.mimetype,
            Size: file.size,
            Type: type
        })

        if (!resultMedia) {
            return false
        }

        return true
    }
}