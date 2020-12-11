import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  logger: {
    label: '[LOGGER]',
    timestampFormat: 'YY-MM-DD HH:MM:SS',
  },
  swagger: {
    enabled: true,
    title: 'Nestjs Prisma GraphQL',
    description: 'The Nestjs Prisma GraphQL API description',
    version: '1.0',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 12,
  },
};

export default (): Config => config;
