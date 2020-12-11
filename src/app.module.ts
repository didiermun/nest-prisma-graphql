import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/wiston';
import config from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlService } from './config/graphql';
import { AppController } from './controllers/app.controller';
import * as Modules from './resolvers';
import { SequenceService } from './services/sequence.service';
import { PrismaService } from './services/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    ...Object.values(Modules),
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    SequenceService,
    PrismaService,
  ],
})
export class AppModule {}
