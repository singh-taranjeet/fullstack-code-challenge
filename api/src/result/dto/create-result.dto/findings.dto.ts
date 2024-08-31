import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MetadataInputType {
  @Field()
  description: string;

  @Field()
  severity: string;
}

@InputType()
class BeginInputType {
  @Field()
  line: number;
}

@InputType()
class PositionsInputType {
  @Field(() => BeginInputType)
  begin: BeginInputType;
}

@InputType()
class LocationInputType {
  @Field()
  path: string;

  @Field(() => PositionsInputType)
  positions: PositionsInputType;
}

@InputType()
export class FindingsInputType {
  @Field(() => String)
  type: string;

  @Field(() => String)
  ruleId: string;

  @Field(() => LocationInputType)
  location: LocationInputType;

  @Field(() => MetadataInputType)
  metadata: MetadataInputType;
}
