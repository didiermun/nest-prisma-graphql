import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'services/prisma.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { PermissionType, Table } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = GqlExecutionContext.create(context).getContext().req?.user;
    if (user) {
      const perms = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          roles: {
            select: {
              permissions: {
                where: {
                  table: this.reflector.get<Table>(
                    'table',
                    context.getHandler(),
                  ),
                  permission: this.reflector.get<PermissionType>(
                    'permission',
                    context.getHandler(),
                  ),
                },
              },
            },
          },
        },
      });
      return perms.roles.flat().some((r) => r.permissions.length > 0);
    } else return false;
  }
}
