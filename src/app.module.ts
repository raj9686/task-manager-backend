import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { TasksModule } from './tasks/task.module';
console.log('configService', JSON.stringify(AppConfigService, null, 2));
@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        uri: configService.system.databaseUrl,
        maxPoolSize: 10,
      }),
      inject: [AppConfigService],
    }),
    TasksModule,
  ],
})
export class AppModule {}
