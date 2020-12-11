import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field({ nullable: true })
  identifier?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
