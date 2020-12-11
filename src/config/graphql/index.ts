import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { GraphqlConfig } from '../config.interface';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  private config;
  constructor(configService: ConfigService) {
    this.config = configService.get<GraphqlConfig>('graphql');
  }
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      sortSchema: this.config.sortSchema,
      autoSchemaFile: this.config.schemaDestination || './src/schema.graphql',
      debug: this.config.debug,
      playground: this.config.playgroundEnabled,
      context: ({ req }) => ({ req }),
    };
  }
}
