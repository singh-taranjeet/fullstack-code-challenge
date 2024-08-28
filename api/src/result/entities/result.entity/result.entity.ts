import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'A result entity' })
@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, {
    description: 'Name of the respository',
  })
  @Column()
  repositoryName?: number;

  @Field(() => String)
  @Column('enum')
  gender: 'Queued' | 'In Progress' | 'Success' | 'Failure';

  @Field(() => Date)
  @Column()
  queuedAt?: Date;

  @Field(() => Date)
  @Column()
  scanningAt?: Date;

  @Field(() => Date)
  @Column()
  finishedAt?: Date;
}
