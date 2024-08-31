import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity/result.entity';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  findAll(): Promise<Result[]> {
    return this.resultRepository.find();
  }

  create(result: CreateResultDto) {
    return this.resultRepository.save(result);
  }
}
