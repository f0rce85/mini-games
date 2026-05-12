import type { Card } from "../types/card";

interface CardViewProps {
    card: Card;
}

export function CardView({card}: CardViewProps) {
    const symbolMap = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
    } as const;

    const isRed = card.suit === "hearts" || card.suit === "diamonds";
    
    return (
        <div className={`card ${isRed ? "card-red" : "card-black"}`}>
            <div>{card.rank}</div>
            <div>{symbolMap[card.suit]}</div>
            </div>
    );
}
