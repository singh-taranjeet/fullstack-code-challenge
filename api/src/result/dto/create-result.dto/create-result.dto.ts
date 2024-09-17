import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, MinLength } from 'class-validator';
import { StatusType } from 'src/result/types';
import { FindingsInputType } from './findings.dto';

@InputType()
export class CreateResultDto {
  @Field(() => String)
  @IsEnum(StatusType)
  status: StatusType;

  @Field(() => String)
  @MinLength(3)
  repositoryName: string;

  @Field(() => [FindingsInputType])
  @IsOptional()
  findings: FindingsInputType[];

  @Field(() => Date, { nullable: true })
  queuedAt: Date;

  @Field(() => Date, { nullable: true })
  scanningAt: Date;

  @Field(() => Date, { nullable: true })
  finishedAt: Date;
}
