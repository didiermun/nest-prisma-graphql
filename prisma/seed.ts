import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { SequenceType, Table } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀  Server ready');
  dotenv.config();
  console.log('🌱 Database seeder is running...');

  const group = await prisma.group.create({
    data: {
      identifier: '1',
      name: 'Group X',
      description: 'Default Group',
    },
  });

  const user = await prisma.user.create({
    data: {
      identifier: '1',
      email: 'pedrolucasoliva@gmail.com',
      name: 'Pedro',
      group: {
        connect: { id: group.id },
      },
      roles: {
        create: {
          group: {
            connect: { id: group.id },
          },
          code: 'Admin',
          description: 'Admin',
          active: true,
          permissions: {
            create: [
              { table: 'GROUP', permission: 'CREATE' },
              { table: 'GROUP', permission: 'READ' },
              { table: 'GROUP', permission: 'UPDATE' },
              { table: 'GROUP', permission: 'DELETE' },
              { table: 'USER', permission: 'CREATE' },
              { table: 'USER', permission: 'READ' },
              { table: 'USER', permission: 'UPDATE' },
              { table: 'USER', permission: 'DELETE' },
              { table: 'SEQUENCE', permission: 'CREATE' },
              { table: 'SEQUENCE', permission: 'READ' },
              { table: 'SEQUENCE', permission: 'UPDATE' },
              { table: 'SEQUENCE', permission: 'DELETE' },
            ],
          },
        },
      },
      password: '$2b$12$TH0yZyDsGFQotPJ4mqbULuIXsT0JWfhsewvazs7F50lmfo.ktvpAy', // password
    },
  });

  const seq0 = await prisma.sequence.create({
    data: {
      group: {
        connect: { id: group.id },
      },
      identifier: '1',
      name: Table.SEQUENCE + ' ' + group.name,
      description: Table.SEQUENCE + ' ' + group.name + ' Sequence Generator',
      table: Table.SEQUENCE,
      type: SequenceType.INCREMENTAL,
      number_next: 4,
      number_increment: 1,
      padding: 0,
    },
  });

  const seq1 = await prisma.sequence.create({
    data: {
      group: {
        connect: { id: group.id },
      },
      identifier: '2',
      name: Table.GROUP + ' ' + group.name,
      description: Table.GROUP + ' ' + group.name + ' Sequence Generator',
      table: Table.GROUP,
      type: SequenceType.INCREMENTAL,
      number_next: 2,
      number_increment: 1,
      padding: 0,
    },
  });

  const seq2 = await prisma.sequence.create({
    data: {
      group: {
        connect: { id: group.id },
      },
      identifier: '3',
      name: Table.USER + ' ' + group.name,
      description: Table.USER + ' ' + group.name + ' Sequence Generator',
      table: Table.USER,
      type: SequenceType.INCREMENTAL,
      number_next: 2,
      number_increment: 1,
      padding: 0,
    },
  });

  console.log({ group, seq0, seq1, seq2, user });
}

main()
  .catch((e) => console.error('❌  Server error', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
