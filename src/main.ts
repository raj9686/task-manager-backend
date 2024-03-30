import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppConfigService } from './config/config.service';
import { json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Load config service
  const configService = app.get(AppConfigService);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

  app.enableCors(corsOptions);
  app.use(json({ limit: configService.system.requestBodySizeLimit }));

  await app.listen(configService.system.port);
}
bootstrap();
