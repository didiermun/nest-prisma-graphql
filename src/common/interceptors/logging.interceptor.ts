import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getArgs()[3]) {
      const parentType = context.getArgs()[3]['parentType'];
      const fieldName = `${context.getArgs()[3]['fieldName']}`;
      return next.handle().pipe(
        tap(() => {
          this.logger.debug(`⛩  ${parentType} » ${fieldName}`, 'GraphQL');
        }),
      );
    } else {
      const parentType = `${context.getArgs()[0].route.path}`;
      const fieldName = `${context.getArgs()[0].route.stack[0].method}`;
      return next.handle().pipe(
        tap(() => {
          this.logger.debug(`⛩  ${parentType} » ${fieldName}`, 'GraphQL');
        }),
      );
    }
  }
}
