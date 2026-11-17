/**
 * Session 1 teaching exercise, using invented data only.
 * This suggests a card ID; it does not decide the rules or play a move.
 */
export function recommendCard(view) {
  return view.legalActions.playableCardIds[0] ?? null;
}
