import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import systemConfig from './env/system.config';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          load: [systemConfig],
        }),
      ],
      providers: [{ provide: AppConfigService, useValue: {} }],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
