import { Module } from "@nestjs/common";
import { userGroupController } from "src/modules/usergroup/usergroup.controller";
import { userGroupService } from "src/modules/usergroup/usergroup.service";

@Module({
    controllers: [userGroupController],
    providers: [userGroupService]
})

export class userGroupModule {

}