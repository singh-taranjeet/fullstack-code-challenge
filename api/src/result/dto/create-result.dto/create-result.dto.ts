import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, MinLength, ValidateNested } from 'class-validator';
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
  @IsArray()
  @ValidateNested({ each: true })
  findings: FindingsInputType[];

  @Field(() => Date, { nullable: true })
  queuedAt: Date;

  @Field(() => Date, { nullable: true })
  scanningAt: Date;

  @Field(() => Date, { nullable: true })
  finishedAt: Date;
}
