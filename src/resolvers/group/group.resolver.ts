import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Group } from 'models/group.model';
import { GroupOrder } from 'models/inputs/group-order.input';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginatedGroup } from 'models/pagination/group-paginated.model';
import { GetGroupsArgs } from 'models/args/group.args';
import { PrismaService } from 'services/prisma.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'common/guards/gql-auth.guard';
import { CreateGroupInput } from './dto/create-group.input';
import { SequenceService } from 'services/sequence.service';
import { PermissionType, Table, User } from '@prisma/client';
import { UserEntity } from 'common/decorators/user.decorator';
import { RolesGuard } from 'common/guards/roles.guard';
import { Permission } from 'common/decorators/permission.decorator';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private prisma: PrismaService,
    private sequenceService: SequenceService,
  ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Permission(Table.GROUP, PermissionType.READ)
  @Query(() => PaginatedGroup)
  async findManyGroupPaginated(
    @Args()
    { name, identifier, skip, after, before, first, last }: GetGroupsArgs,
    @Args({
      name: 'orderBy',
      type: () => GroupOrder,
      nullable: true,
    })
    orderBy: GroupOrder,
  ) {
    return await findManyCursorConnection(
      (args) =>
        this.prisma.group.findMany({
          where: {
            name: { contains: name || '' },
            identifier: { contains: identifier || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.group.count({
          where: {
            name: { contains: name || '' },
            identifier: { contains: identifier || '' },
          },
        }),
      { first, last, before, after },
    );
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Permission(Table.GROUP, PermissionType.READ)
  @Query(() => [Group])
  async findManyGroup(
    @Args({
      name: 'orderBy',
      type: () => GroupOrder,
      nullable: true,
    })
    orderBy: GroupOrder,
  ) {
    return await this.prisma.group.findMany({
      where: {},
      orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
    });
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Permission(Table.GROUP, PermissionType.CREATE)
  @Mutation(() => Group)
  async createGroup(
    @Args('data') data: CreateGroupInput,
    @UserEntity() user: User,
  ): Promise<Group> {
    if (!data.identifier) {
      data.identifier = await this.sequenceService.next(Table.GROUP, user);
    }
    return await this.prisma.group.create({
      data: {
        ...data,
      },
    });
  }
}
