import { ArgsType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { PaginationArgs } from 'common/graphql/pagination/pagination.args';

@ArgsType()
export class GetGroupsArgs extends PaginationArgs {
  @Field({ nullable: true })
  @MinLength(1)
  identifier?: string;

  @Field({ nullable: true })
  @MinLength(3)
  name?: string;
}
