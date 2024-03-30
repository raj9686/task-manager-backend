import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import systemConfig from './env/system.config';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(systemConfig.KEY)
    public system: ConfigType<typeof systemConfig>,
  ) {}
}
