import { CreateResultDto } from '../create-result.dto/create-result.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResultDto extends PartialType(CreateResultDto) {}
