import { registerEnumType } from '@nestjs/graphql';

export enum Table {
  SEQUENCE = 'SEQUENCE',
  GROUP = 'GROUP',
  USER = 'USER',
}

registerEnumType(Table, {
  name: 'Table',
  description: 'Tables',
});
