import { Module } from '@nestjs/common';
import { ResultResolver } from './result.resolver';
import { ResultService } from './result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  providers: [ResultResolver, ResultService],
})
export class ResultModule {}
