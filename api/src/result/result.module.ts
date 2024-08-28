import { Module } from '@nestjs/common';
import { ResultResolver } from './result.resolver';

@Module({
  providers: [ResultResolver]
})
export class ResultModule {}
