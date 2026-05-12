import { CardView } from "./components/CardView";
import { createDeck, dealCards, shuffleDeck } from "./game/deck";

function App() {
  const deck = shuffleDeck(createDeck());
  const playerHand = dealCards(deck, 13);

  return (
    <main className="app">
      <h1>Pusoy Arena</h1>

      <section>
        <h2>Your Hand</h2>

        <div className="card-grid">
          {playerHand.map((card) => (
            <CardView
              key={`${card.rank}-${card.suit}`}
              card={card}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;