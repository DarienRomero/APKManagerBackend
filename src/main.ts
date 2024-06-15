import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  console.log("URL CLient", process.env.URL_CLIENT)
  app.enableCors({
    "origin": process.env.URL_CLIENT,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
}
bootstrap();
