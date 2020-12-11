import { Injectable } from '@nestjs/common';
import { Sequence, SequenceType, Table, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class SequenceService {
  constructor(private prisma: PrismaService) {}

  private async generateSequence(table: Table, user: User): Promise<Sequence> {
    try {
      const sequence = await this.prisma.sequence.create({
        data: {
          group: {
            connect: { id: user.groupId },
          },
          identifier: await this.next(Table.SEQUENCE, user),
          name: table,
          description: table + ' Sequence Generator',
          table: table,
          type: SequenceType.INCREMENTAL,
          number_next: 1,
          number_increment: 1,
          padding: 0,
        },
      });
      return sequence;
    } catch (e) {
      console.log(e);
    }
  }

  async next(table: Table, user: User) {
    try {
      let identifier = '';
      let sequence: Sequence = await this.prisma.sequence.findFirst({
        where: {
          group: { id: user.groupId },
          table: table,
        },
      });
      if (!sequence) {
        sequence = await this.generateSequence(table, user);
      }
      identifier = sequence.number_next.toString();
      if ((sequence.type = SequenceType.INCREMENTAL)) {
        sequence.number_next = sequence.number_next + sequence.number_increment;
      }
      sequence = await this.prisma.sequence.update({
        where: {
          id: sequence.id,
        },
        data: {
          number_next: sequence.number_next,
        },
      });
      return identifier;
    } catch (e) {
      console.log(e);
    }
  }
}
