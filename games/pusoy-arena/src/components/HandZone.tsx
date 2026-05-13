import type { Card } from "../types/card";
import type { HandZoneName } from "../types/hand";
import { CardView } from "./CardView";

interface HandZoneProps {
  title: string;
  zoneName: HandZoneName;
  cards: Card[];
  maxCards: number;
  onCardClick: (card: Card, fromZone: HandZoneName) => void;
  onZoneClick: (zone: HandZoneName) => void;
}

export function HandZone({
  title,
  zoneName,
  cards,
  maxCards,
  onCardClick,
  onZoneClick,
}: HandZoneProps) {
  return (
    <section className="hand-zone" onClick={() => onZoneClick(zoneName)}>
      <h2>
        {title} {cards.length}/{maxCards}
      </h2>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={`${card.rank}-${card.suit}`}
            onClick={(event) => {
              event.stopPropagation();
              onCardClick(card, zoneName);
            }}
          >
            <CardView card={card} />
          </div>
        ))}
      </div>
    </section>
  );
}