import { Module } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { SequenceService } from 'services/sequence.service';
import { GroupResolver } from './group.resolver';

@Module({
  providers: [PrismaService, GroupResolver, SequenceService],
})
export class GroupModule {}
