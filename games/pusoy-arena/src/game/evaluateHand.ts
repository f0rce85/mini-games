import type { Card } from "../types/card";
import type { HandResult } from "../types/poker";

export function evaluateFiveCardHand(cards: Card[]): HandResult {
  const valueCounts: Record<number, number> = {};

  for (const card of cards) {
    valueCounts[card.value] =
      (valueCounts[card.value] || 0) + 1;
  }

  const counts = Object.values(valueCounts);

  const hasFourOfAKind = counts.includes(4);
  const hasThreeOfAKind = counts.includes(3);

  const pairCount = counts.filter(
    (count) => count === 2
  ).length;

  if (hasFourOfAKind) {
    return {
      rankName: "Four of a Kind",
      rankValue: 7,
    };
  }

  if (hasThreeOfAKind) {
    return {
      rankName: "Three of a Kind",
      rankValue: 3,
    };
  }

  if (pairCount === 2) {
    return {
      rankName: "Two Pair",
      rankValue: 2,
    };
  }

  if (pairCount === 1) {
    return {
      rankName: "Pair",
      rankValue: 1,
    };
  }

  return {
    rankName: "High Card",
    rankValue: 0,
  };
}