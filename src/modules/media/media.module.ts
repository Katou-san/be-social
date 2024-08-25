import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MediaController } from "src/modules/media/media.controller";
import { MediaService } from "src/modules/media/media.service";
import { Media, MediaSchema } from "src/modules/media/schema/media.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }])],
    controllers: [MediaController],
    providers: [MediaService],
    exports: [MediaService]
})

export class MediaModule {

}