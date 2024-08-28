import { Query, Resolver } from '@nestjs/graphql';
import { Result } from './entities/result.entity/result.entity';

@Resolver()
export class ResultResolver {
  @Query(() => [Result], { name: 'results' })
  async findAll() {
    return [];
  }
}
