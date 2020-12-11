import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Group } from './group.model';
import { Permission } from './permission.model';
import { User } from './user.model';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field(() => Group)
  group: Group;

  @Field(() => String)
  code: string;

  @Field(() => String)
  description: string;

  @Field(() => [Permission])
  permissions: Permission[];

  @Field(() => Boolean)
  active: boolean;

  @Field(() => [User])
  users: User[];
}
