import { useState } from "react";
import { HandZone } from "./components/HandZone";
import { createDeck, dealCards, shuffleDeck } from "./game/deck";
import type { Card } from "./types/card";
import type { HandZoneName, HandZones } from "./types/hand";
import { areZonesComplete } from "./game/validateZones";
import { evaluateFiveCardHand } from "./game/evaluateHand";



const maxCardsByZone: Record<HandZoneName, number> = {
  front: 3,
  middle: 5,
  back: 5,
  unassigned: 13,
};

function App() {
  const [zones, setZones] = useState<HandZones>(() => {
    const deck = shuffleDeck(createDeck());
    const playerHand = dealCards(deck, 13);
    

    return {
      front: [],
      middle: [],
      back: [],
      unassigned: playerHand,
    };
  });

  const [selectedCard, setSelectedCard] = useState<{
    card: Card;
    fromZone: HandZoneName;
  } | null>(null);

  const isComplete = areZonesComplete(zones);

  const backHandResult =
    zones.back.length === 5
      ? evaluateFiveCardHand(zones.back)
      : null;
  
  const middleHandResult =
    zones.middle.length === 5
      ? evaluateFiveCardHand(zones.middle)
      : null;


  function handleCardClick(card: Card, fromZone: HandZoneName) {
    setSelectedCard({ card, fromZone });
  }

  function handleZoneClick(targetZone: HandZoneName) {
    if (!selectedCard) return;

    if (targetZone === selectedCard.fromZone) {
      setSelectedCard(null);
      return;
    }

    if (zones[targetZone].length >= maxCardsByZone[targetZone]) {
      return;
    }

    setZones((currentZones) => {
      const newZones: HandZones = {
        front: currentZones.front.filter((card) => card !== selectedCard.card),
        middle: currentZones.middle.filter((card) => card !== selectedCard.card),
        back: currentZones.back.filter((card) => card !== selectedCard.card),
        unassigned: currentZones.unassigned.filter(
          (card) => card !== selectedCard.card
        ),
      };

      newZones[targetZone] = [...newZones[targetZone], selectedCard.card];

      return newZones;
    });

    setSelectedCard(null);
  }

  return (
    <main className="app">
      <h1>Pusoy Arena</h1>

      <p className={isComplete ? "valid-text" : "invalid-text"}>
    {isComplete
    
    ? "Hand layout complete"
    : "Arrange all cards into Front 3, Middle 5, Back 5"}
    </p>

    <button disabled={!isComplete}>
      Submit Hand
    </button>

    {backHandResult && (
      <p>
        Back Hand: {backHandResult.rankName}
    </p>
  )}

    {middleHandResult && (
      <p>
        Middle Hand: {middleHandResult.rankName}
      </p>
  )}
      <p>
        Selected card:{" "}
        {selectedCard
          ? `${selectedCard.card.rank} of ${selectedCard.card.suit}`
          : "None"}
      </p>

      <HandZone
        title="Front"
        zoneName="front"
        cards={zones.front}
        maxCards={3}
        onCardClick={handleCardClick}
        onZoneClick={handleZoneClick}
      />

      <HandZone
        title="Middle"
        zoneName="middle"
        cards={zones.middle}
        maxCards={5}
        onCardClick={handleCardClick}
        onZoneClick={handleZoneClick}
      />

      <HandZone
        title="Back"
        zoneName="back"
        cards={zones.back}
        maxCards={5}
        onCardClick={handleCardClick}
        onZoneClick={handleZoneClick}
      />

      <HandZone
        title="Unassigned"
        zoneName="unassigned"
        cards={zones.unassigned}
        maxCards={13}
        onCardClick={handleCardClick}
        onZoneClick={handleZoneClick}
      />
    </main>
  );
}

export default App;