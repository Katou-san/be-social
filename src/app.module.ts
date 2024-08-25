import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { FriendModule } from 'src/modules/friend/friend.module';
import { MessageModule } from 'src/modules/message/message.module';
import { userChatModule } from 'src/modules/userchat/userchat.module';
import { UserModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    MulterModule.register({}),
    FriendModule,
    ContactModule,
    userChatModule,
    MessageModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
