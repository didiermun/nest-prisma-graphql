import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    description: 'Sequencial Generated Identifier',
  })
  identifier: string;

  @Field(() => Date, {
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date;
  @Field(() => Date, {
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date;
}
