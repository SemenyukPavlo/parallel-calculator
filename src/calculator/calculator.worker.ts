import { workerData, parentPort } from 'worker_threads';
import {
  isValidCharacters,
  isValidParenthesis,
  isValidParenthesisNumber,
  isValidSigns,
  evaluate,
} from 'src/calculator/calculator.utils';

if (!workerData) throw 'Expression is empty';

if (typeof workerData !== 'string') throw 'Expression is not a string';

const expression = workerData.replaceAll(/ /g, '');

if (!isValidCharacters(expression)) throw 'Non acceptable characters';

if (!isValidParenthesis(expression)) throw 'Invalid expression (parenthesis)';

if (!isValidParenthesisNumber(expression))
  throw 'Invalid expression (number next to parenthesis)';

if (!isValidSigns(expression)) throw 'Invalid expression (signs)';

parentPort.postMessage(evaluate(expression));
