import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HttpStatus } from "src/configs/responeConfig/responeStatus";
import { CheckPassword, HashPassword } from "src/middlewares/hash";
import { LoginDto } from "src/modules/auth/dots/login.dto";
import { RegisterDto } from "src/modules/auth/dots/register.dto";
import { User } from "src/modules/users/schemas/users.schema";
import { UserService } from "src/modules/users/users.service";
import { createId } from "src/utils/createId";
import { responeData } from "src/utils/responeData";

@Injectable()
export class authService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const user = await this.userService.find_Email(email)
            if (!user) return { state: false, message: 'Not found email', error: { email: 'Email not exist!' } }
            if (!await CheckPassword({ hashPass: user.Pass, pass: String(pass).trim() })) {
                return { state: false, message: 'Pass not macth', error: { password: 'Pass not macth' } }
            }
            return { state: true, message: 'Get user success', data: user }
        } catch (err) {
            console.error('>> Error validate user');
            console.log(err);
            return { state: false, message: 'Error validate user', error: { validate_User: 'Error validate user!' } }
        }


    }

    async login(user: LoginDto): Promise<any> {
        try {
            const checkEmail = await this.userService.find_Email(user.Email || '')
            if (!checkEmail) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'login Fail!',
                    error: { email: 'Not found email' }
                });
            }

            if (!await CheckPassword({ hashPass: checkEmail.Pass, pass: String(user.Pass).trim() })) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Pass not macth!',
                    error: { pass: 'Pass not macth' }
                });
            }

            const payload = { ID: checkEmail.User_Id, Name: checkEmail.User_Name, Email: checkEmail.Email }
            return responeData({
                statusCode: HttpStatus.SUCCESS,
                message: 'login Success!',
                data: {
                    User_Id: checkEmail.User_Id,
                    User_Name: checkEmail.User_Name,
                    Nickname: checkEmail.Nickname,
                    accessToken: await this.jwtService.signAsync(payload)
                }
            });
        } catch (err) {
            console.error('>> Error login user');
            console.log(err);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'Login fail!',
                error: err,
            });
        }
    }

    async register(regis: RegisterDto): Promise<any> {
        try {
            if (await this.userService.find_Email(regis.Email || '')) {
                return responeData({
                    statusCode: HttpStatus.ERROR,
                    message: 'Register fail!',
                    error: { email: 'Email is existing' }
                });
            }

            const hasdPass = await HashPassword(regis.Pass);
            const result = await this.userModel.create({
                User_Id: createId('User'),
                User_Name: regis.User_Name,
                Pass: hasdPass,
                Email: regis.Email.toLowerCase().trim(),
                Nickname: createId('Nickname'),
                Role_Id: 's',
            });

            // if (!await this.contactService.createContact(result.User_Id)) {
            //     await this.userModel.deleteOne({ User_Id: result.User_Id });
            //     return responeData({
            //         statusCode: HttpStatus.ERROR,
            //         message: 'create contact fail!',
            //     });
            // }


            const payload = { ID: result.User_Id, Name: result.User_Name, Email: result.Email }
            return responeData({
                statusCode: HttpStatus.SUCCESS,
                message: 'login Success!',
                data: {
                    User_Id: result.User_Id,
                    User_Name: result.User_Name,
                    Nickname: result.Nickname,
                    accessToken: await this.jwtService.signAsync(payload)
                }
            });
        } catch (err) {
            console.error('>> Error login user');
            console.log(err);
            return responeData({
                statusCode: HttpStatus.ERROR,
                message: 'Login fail!',
                error: err,
            });
        }
    }
}