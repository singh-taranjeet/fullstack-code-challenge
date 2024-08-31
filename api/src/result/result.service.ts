import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity/result.entity';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto/create-result.dto';
import { UserInputError } from '@nestjs/apollo';
import { UpdateResultDto } from './dto/update-result.dto/update-result.dto';

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

  async update(id: number, updateResultInput: UpdateResultDto) {
    const existingResult = await this.resultRepository.preload({
      id,
      ...updateResultInput,
    });

    this.validateResult(existingResult, id);

    return this.resultRepository.save(existingResult);
  }

  async findOne(id: number) {
    const result = await this.resultRepository.findOne({
      where: { id },
    });

    this.validateResult(result, id);

    return result;
  }

  async remove(id: number) {
    const result = await this.findOne(id);

    this.validateResult(result, id);

    return this.resultRepository.remove(result);
  }

  private validateResult(result: Result, id: number) {
    if (!result) {
      throw new UserInputError(`Result with id ${id} not found`);
    }
  }
}
