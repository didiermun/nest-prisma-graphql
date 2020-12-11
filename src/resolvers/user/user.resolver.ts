import { PrismaService } from './../../services/prisma.service';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserService } from 'services/user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from 'common/decorators/user.decorator';
import { GqlAuthGuard } from 'common/guards/gql-auth.guard';
import { User } from 'models/user.model';
import { Role } from 'models/role.model';
import { Permission } from 'models/permission.model';

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }
  /* 
  @Query((returns) => User)
  async permz(@UserEntity() user: User): Promise<User> {
    const u = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        roles: { include: { permissions: true } },
      },
    });
    console.log(u);
    return user;
  } */

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput,
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword,
    );
  }

  @ResolveField('group')
  group(@Parent() usr: User) {
    return this.prisma.user.findUnique({ where: { id: usr.id } }).group();
  }

  @ResolveField('roles')
  roles(@Parent() usr: User) {
    return this.prisma.user.findUnique({ where: { id: usr.id } }).roles();
  }

  /* @ResolveField('permissions')
  permissions(@Parent() r: Role): Promise<Permission[]> {
    return this.prisma.role.findUnique({ where: { id: r.id } }).permissions();
  } */
}
