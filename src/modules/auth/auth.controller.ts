import { Body, Controller, Post } from "@nestjs/common";
import { HttpStatus } from "src/configs/responeConfig/responeStatus";
import { Public } from "src/customs/customize";
import { authService } from "src/modules/auth/auth.service";
import { LoginDto } from "src/modules/auth/dots/login.dto";
import { RegisterDto } from "src/modules/auth/dots/register.dto";
import { responeData } from "src/utils/responeData";
@Controller('auth')

export class authController {

    constructor(private authService: authService) { }
    @Post('login')
    @Public()
    async Login(@Body() value: LoginDto) {
        try {
            console.log(value)
            return await this.authService.login(value)
        } catch (error) {
            console.error('>> Error login user');
            console.log(error);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'Login fail!',
                error: error,
            });
        }

    }

    @Post('register')
    @Public()
    async Register(@Body() regis: RegisterDto) {
        return await this.authService.register(regis)
    }

}