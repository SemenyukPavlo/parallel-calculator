import { join } from 'path';
import { Worker } from 'worker_threads';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  evaluate(expression: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(join(__dirname, 'calculator.worker.js'), {
        workerData: expression,
      });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on(
        'exit',
        (code) => code !== 0 && reject(`Worker stopped with exit code ${code}`),
      );
    });
  }
}
