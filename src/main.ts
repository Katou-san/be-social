import { ConfigService } from '@nestjs/config';
declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) //call env 
  const post = configService.get('POST');
  app.enableCors();


  app.useGlobalPipes(new ValidationPipe(
    { whitelist: true } // tranh cap nhat du thua
  )) // su dung thu vien valiations cho toan bo project

  app.setGlobalPrefix('api/v1', { exclude: [''] }) // cho phep chay o localhost ma ko kqua tien to

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(post);
}
bootstrap(); 
