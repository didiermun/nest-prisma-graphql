import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from './role.model';
import { Table } from './table.enum';

enum PermissionType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

registerEnumType(PermissionType, {
  name: 'PermissionType',
  description: 'Permission Type',
});

@ObjectType()
export class Permission {
  @Field(() => ID)
  id: string;

  @Field(() => PermissionType)
  permission: PermissionType;

  @Field(() => Table)
  table: Table;
  /* 
  @Field(() => [Role])
  Role: Role[]; */
}
