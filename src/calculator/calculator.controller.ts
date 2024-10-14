import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('evaluate')
  async evaluate(
    @Body() { expression }: { expression: string },
  ): Promise<{ result: number }> {
    try {
      return { result: await this.calculatorService.evaluate(expression) };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
