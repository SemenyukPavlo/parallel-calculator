import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

@Module({
  imports: [],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
