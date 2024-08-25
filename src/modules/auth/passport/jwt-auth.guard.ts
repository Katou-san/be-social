import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { HttpStatus } from 'src/configs/responeConfig/responeStatus';
import { IS_PUBLIC_KEY } from 'src/customs/customize';
import { responeData } from 'src/utils/responeData';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw responeData({
                statusCode: HttpStatus.ERROR,
                message: 'token is required or expired',
                error: { token: 'token is required or expired' }
            });
        }
        return user;
    }
}
