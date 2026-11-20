import { coachScenario } from '../src/scenarios.mjs';

// This helper checks the response contract. Its prose still needs source review.
export function acceptAnswer(text, scenarioId) {
  const scenario = coachScenario(scenarioId);
  if (!scenario) return false;

  let answer;
  try {
    answer = JSON.parse(text);
  } catch {
    return false;
  }

  if (answer === null || typeof answer !== 'object' || Array.isArray(answer)) {
    return false;
  }

  const requiredFields = ['kind', 'ruleId', 'cardId', 'explanation'];
  const fields = Object.keys(answer);
  if (fields.length !== requiredFields.length ||
      !requiredFields.every(field => Object.hasOwn(answer, field))) {
    return false;
  }

  const permittedCard = scenario.id === 'suggest' ? 'practice-red-3' : null;
  return answer.kind === scenario.kind &&
    answer.ruleId === scenario.rule &&
    answer.cardId === permittedCard &&
    typeof answer.explanation === 'string' &&
    answer.explanation.length >= 10 &&
    answer.explanation.length <= 1200;
}
