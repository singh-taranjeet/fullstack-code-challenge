import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity/result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  findAll(): Promise<Result[]> {
    return this.resultRepository.find();
  }
}
