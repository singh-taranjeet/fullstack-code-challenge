import { Field, ObjectType } from '@nestjs/graphql';
import { Findings, StatusType } from 'src/result/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'A result entity' })
@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, {
    description: 'Status of the scan',
  })
  @Column()
  status: StatusType;

  @Field(() => String, {
    description: 'Name of the respository',
  })
  @Column()
  repositoryName: number;

  @Field(() => String)
  @Column('jsonb', { default: {} })
  findings: Findings;

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
