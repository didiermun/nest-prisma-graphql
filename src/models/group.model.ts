import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'common/base.model';

@ObjectType()
export class Group extends BaseModel {
  @Field(() => String, { nullable: true, description: 'name' })
  name: string;
  @Field(() => String, { nullable: true, description: 'description' })
  description: string;
}
