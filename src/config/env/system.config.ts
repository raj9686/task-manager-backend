import { registerAs } from '@nestjs/config';

export default registerAs('system', () => ({
  env: process.env.NODE_ENV || 'local',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3005', 10),
  databaseUrl:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/task-manager',
  serviceName: process.env.SERVICE_NAME || 'api',
  jwtSecret: process.env.JWT_SECRET || 'development',
  requestBodySizeLimit: process.env.REQUEST_BODY_SIZE_LIMIT || '100kb',
}));
