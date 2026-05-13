export type PokerHandRank =
  | "High Card"
  | "Pair"
  | "Two Pair"
  | "Three of a Kind"
  | "Straight"
  | "Flush"
  | "Full House"
  | "Four of a Kind"
  | "Straight Flush";

export interface HandResult {
  rankName: PokerHandRank;
  rankValue: number;
}