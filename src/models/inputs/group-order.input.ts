import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'common/graphql/order/order';

export enum GroupOrderField {
  identifier = 'identifier',
  name = 'name',
  description = 'description',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(GroupOrderField, {
  name: 'GroupOrderField',
  description: 'Properties by which group connections can be ordered.',
});

@InputType()
export class GroupOrder extends Order {
  @Field((type) => GroupOrderField)
  field: GroupOrderField;
}
