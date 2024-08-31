import { Query, Resolver } from '@nestjs/graphql';
import { Result } from './entities/result.entity/result.entity';
import { ResultService } from './result.service';

@Resolver()
export class ResultResolver {
  constructor(private readonly resultService: ResultService) {}

  @Query(() => [Result], { name: 'Results' })
  async findAll() {
    return this.resultService.findAll();
  }
}
