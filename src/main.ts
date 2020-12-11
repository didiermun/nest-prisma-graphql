import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { logOptions } from './config/wiston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    ...logOptions,
  });
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: logger,
    });
    await app.listen(3000);
    logger.log(`🚀  Server ready at http://localhost:3000`, 'info');
  } catch (error) {
    logger.error(`❌  Error starting server, ${error}`, '', 'error');
    process.exit();
  }
}
bootstrap();
