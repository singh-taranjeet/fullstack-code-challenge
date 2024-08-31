import { Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from 'src/result/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
class BeginObjectType {
  @Field()
  line: number;
}

@ObjectType()
class PositionsObjectType {
  @Field(() => BeginObjectType)
  begin: BeginObjectType;
}

@ObjectType()
class LocationObjectType {
  @Field()
  path: string;

  @Field(() => PositionsObjectType)
  positions: PositionsObjectType;
}

@ObjectType()
class MetadataObjectType {
  @Field()
  description: string;

  @Field()
  severity: string;
}

@ObjectType()
export class FindingsObjectType {
  @Field(() => String)
  type: string;

  @Field(() => String)
  ruleId: string;

  @Field(() => LocationObjectType)
  location: LocationObjectType;

  @Field(() => MetadataObjectType)
  metadata: MetadataObjectType;
}

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
  repositoryName: string;

  @Field(() => [FindingsObjectType])
  @Column('jsonb')
  findings: FindingsObjectType[];

  @Field(() => Date, {
    nullable: true,
    description: 'The date and time when the result was queued',
  })
  @Column({ nullable: true })
  queuedAt?: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'The date and time when the result was scanned',
  })
  @Column({ nullable: true })
  scanningAt?: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'The date and time when the result was finished',
  })
  @Column({ nullable: true })
  finishedAt?: Date;
}
