import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'common/graphql/pagination/pagination';
import { Group } from '../group.model';

@ObjectType()
export class PaginatedGroup extends Paginated(Group) {}
