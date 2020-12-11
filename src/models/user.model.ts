import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { BaseModel } from 'common/base.model';
import { Group } from './group.model';
import { Role } from './role.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => Group, {
    description: 'Tanant Class.',
  })
  group: Group;

  @Field({
    description: 'User e-mail.',
  })
  email: string;

  @Field({
    description: 'User name.',
  })
  name?: string;

  @Field(() => [Role], {
    description: 'User Roles.',
  })
  roles: Role[];

  @HideField()
  password: string;
}
