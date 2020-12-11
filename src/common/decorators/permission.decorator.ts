import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PermissionType, Table } from '@prisma/client';

export const Permission = (table: Table, permission: PermissionType) => {
  return applyDecorators(SetMetadata('permission', permission), Node(table));
};

export const Node = (table: Table) => SetMetadata('table', table);
