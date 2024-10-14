const isValidCharactersRegex = /^[0-9+\-*/()\s]+$/;
const isValidParenthesisNumberRegex = /^[0-9]+$/;
const regexMainEvaluate = /(\d+\s*[*\/]\s*\d+)/g;
const regexEvaluate = /(\d+\s*[+-]\s*\d+)/g;
const regexParenthesisEvaluate = /\(([^()]+)\)/g;

const evaluateOperations = (a: number, b: number, operator: string) => {
  if (operator === '*') return a * b;
  if (operator === '/') return a / b;
  if (operator === '-') return a - b;
  return a + b;
};

export const isValidCharacters = (expression: string) =>
  new RegExp(isValidCharactersRegex).test(expression);

export const isValidParenthesis = (expression: string) => {
  let openedParenthesis = 0;

  return expression.split('').every((e) => {
    if (e === '(') openedParenthesis++;
    if (e === ')') openedParenthesis--;

    return openedParenthesis >= 0;
  });
};

export const isValidParenthesisNumber = (expression: string) => {
  const arr = expression.split('');

  return arr.every((e, i) => {
    if (e === '(')
      return (
        !new RegExp(isValidParenthesisNumberRegex).test(arr[i - 1]) &&
        (new RegExp(isValidParenthesisNumberRegex).test(arr[i + 1]) ||
          (arr[i + 1] === '-' &&
            new RegExp(isValidParenthesisNumberRegex).test(arr[i + 2])))
      );

    if (e === ')')
      return (
        new RegExp(isValidParenthesisNumberRegex).test(arr[i - 1]) &&
        !new RegExp(isValidParenthesisNumberRegex).test(arr[i + 1])
      );

    return true;
  });
};

export const isValidSigns = (expression: string) => {
  const signs = ['/', '-', '+', '*'];
  const arr = expression.split('');

  return arr.every((e, i) => !signs.includes(e) || !signs.includes(arr[i + 1]));
};

export const evaluateString = (
  expression: string,
  isMainOperation: boolean,
) => {
  const res = new RegExp(
    isMainOperation ? regexMainEvaluate : regexEvaluate,
  ).exec(expression);

  if (!res?.[1]) {
    return isMainOperation ? evaluateString(expression, false) : expression;
  }

  const minusCount = +expression[res.index - 1]?.startsWith('-');

  const [a, b] = res[1].split(isMainOperation ? /[*\/]/ : /[+-]/);
  const operator = res[1].replaceAll(/\d/g, '');
  const evaluateRes = evaluateOperations(
    +a * (minusCount ? -1 : 1),
    +b,
    operator,
  );

  return evaluateString(
    expression.substring(0, res.index - minusCount) +
      evaluateRes +
      expression.substring(res[1].length + res.index),
    isMainOperation,
  );
};

export const evaluate = (expression: string) => {
  const res = new RegExp(regexParenthesisEvaluate).exec(expression);

  if (!res?.[1]) return evaluateString(expression, true);

  const evaluateRes = evaluateString(res[1], true);

  return evaluate(
    expression.substring(0, res.index) +
      evaluateRes +
      expression.substring(res[1].length + res.index + 2),
  );
};
