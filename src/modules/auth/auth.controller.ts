import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { HttpStatus } from "src/configs/responeConfig/responeStatus";
import { Public } from "src/customs/customize";
import { authService } from "src/modules/auth/auth.service";
import { RegisterDto } from "src/modules/auth/dots/register.dto";
import { LocalAuthGuard } from "src/modules/auth/passport/local-auth.guard";
import { responeData } from "src/utils/responeData";
@Controller('auth')

export class authController {

    constructor(private authService: authService) { }
    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    async Login(@Req() req: Request) {
        if (req.user == 'false') {
            return responeData({ statusCode: HttpStatus.ERROR, message: 'validate fail', error: { vaidate: 'validate fail' } })
        } else {
            return await this.authService.login(req?.user)
        }
    }

    @Post('register')
    @Public()
    async Register(@Body() regis: RegisterDto) {
        return await this.authService.register(regis)
    }

}