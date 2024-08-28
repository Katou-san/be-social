import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/modules/auth/auth.module';
import { FriendModule } from 'src/modules/friend/friend.module';
import { MessageModule } from 'src/modules/message/message.module';
import { UserModule } from 'src/modules/users/users.module';
import { ConversationModule } from './modules/conversation/conversation.module';

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
    MessageModule,
    UserModule,
    AuthModule,
    ConversationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
