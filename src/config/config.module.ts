import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import systemConfig from './env/system.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [systemConfig],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
