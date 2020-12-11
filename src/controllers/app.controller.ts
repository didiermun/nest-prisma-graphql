import { Controller, Get, Inject, Param } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.debug('getHello');
    return 'Hello World!';
  }
  @Get('getHelloName/:name')
  getHelloName(@Param('name') name: string): string {
    this.logger.debug('getHelloName');
    return `Hello ${name}!`;
  }
}
