import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Result } from './entities/result.entity/result.entity';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto/create-result.dto';

@Resolver()
export class ResultResolver {
  constructor(private readonly resultService: ResultService) {}

  @Query(() => [Result], { name: 'Results' })
  async findAll() {
    return this.resultService.findAll();
  }

  @Mutation(() => Result, { name: 'createResult' })
  async create(@Args('createResultInput') createResultInput: CreateResultDto) {
    return this.resultService.create(createResultInput);
  }
}
