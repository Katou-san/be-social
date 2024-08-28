import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { authController } from 'src/modules/auth/auth.controller';
import { authService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/passport/jwt-auth.guard';
import { JwtStrategy } from 'src/modules/auth/passport/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/passport/local.strategy';
import { User, UserSchema } from 'src/modules/users/schemas/users.schema';
import { UserModule } from 'src/modules/users/users.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRED'),
                },
            }),
            inject: [ConfigService],
        }),
        PassportModule,
    ],
    controllers: [authController],

    providers: [
        authService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AuthModule { }
