import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Result } from './entities/result.entity/result.entity';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto/update-result.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class ResultResolver {
  constructor(private readonly resultService: ResultService) {}

  @Query(() => [Result], { name: 'Results' })
  async findAll() {
    return this.resultService.findAll();
  }

  @Query(() => Result, { name: 'result' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.resultService.findOne(id);
  }

  @Mutation(() => Result, { name: 'createResult' })
  async create(@Args('createResultInput') createResultInput: CreateResultDto) {
    return this.resultService.create(createResultInput);
  }

  @Mutation(() => Result, { name: 'updateResult' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateResultInput') updateResultInput: UpdateResultDto,
  ) {
    return this.resultService.update(id, updateResultInput);
  }

  @Mutation(() => Result, { name: 'removeResult' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.resultService.remove(id);
  }
}
