# Pusoy Arena — Web Game Project Plan

## 1. Project Goal

Build a web version of **Pusoy**, also known as **Chinese Poker / Filipino 13-card poker**.

The goal is to create the game step by step while learning:

- TypeScript
- JavaScript logic
- Card game rules
- UI state management
- Drag-and-drop interaction
- Poker hand evaluation
- Clean project structure
- Later: multiplayer with backend/websockets

---

## 2. What is Pusoy?

Pusoy is a 13-card poker arrangement game.

Each player receives **13 cards** and must arrange them into 3 hands:

| Hand | Cards | Strength Rule |
|---|---:|---|
| Back / Bottom | 5 cards | Strongest hand |
| Middle | 5 cards | Weaker than back |
| Front / Top | 3 cards | Weakest hand |

The hands must follow this order:

```txt
Back >= Middle >= Front
```

If the order is invalid, the player has a **foul** or **dead hand**.

---

## 3. Basic Rules

### 5-card hand rankings

From weakest to strongest:

1. High card
2. One pair
3. Two pair
4. Three of a kind
5. Straight
6. Flush
7. Full house
8. Four of a kind
9. Straight flush

### 3-card front hand rankings

The front hand only has 3 cards, so it can only be:

1. High card
2. Pair
3. Three of a kind

---

## 4. Recommended Tech Stack

Start simple.

```txt
Frontend: React + TypeScript + Vite
Styling: CSS or CSS Modules
State: React useState first, Zustand later if needed
Backend later: Node.js + Socket.io
Database later: PostgreSQL + Prisma
```

Do **not** start with multiplayer. First build a local playable version.

---

# Development Milestones

---

## Milestone 1 — Project Setup

### Goal

Create the basic web project.

### Tasks

- [x] Create Vite React TypeScript project
- [x] Clean default files
- [x] Create folders:
  - [x] `src/components`
  - [x] `src/types`
  - [x] `src/utils`
  - [x] `src/game`
  - [x] `src/styles`
- [x] Add basic page layout
- [x] Show title: `Pusoy Arena`

### Suggested structure

```txt
src/
  components/
  game/
  styles/
  types/
  utils/
  App.tsx
  main.tsx
```

### Checkpoint question

Can the app run locally and show a basic page?

---

## Milestone 2 — Card and Deck Types

### Goal

Represent cards properly in TypeScript.

### Types to create

```ts
type Suit = "hearts" | "diamonds" | "clubs" | "spades";

type Rank =
  | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  | "J" | "Q" | "K" | "A";

interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}
```

### Tasks

- [x] Create card types
- [x] Create all 52 cards
- [x] Make sure each card has:
  - [x] suit
  - [x] rank
  - [x] numeric value

### Checkpoint question

Can you generate exactly 52 unique cards?

---

## Milestone 3 — Shuffle and Deal

### Goal

Shuffle the deck and deal 13 cards to the player.

### Tasks

- [x] Create `createDeck()`
- [x] Create `shuffleDeck(deck)`
- [x] Create `dealCards(deck, amount)`
- [x] Display 13 cards on screen

### Important concept

Use the **Fisher-Yates shuffle** instead of sorting randomly.

Bad:

```ts
deck.sort(() => Math.random() - 0.5);
```

Better:

```ts
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}
```

### Checkpoint question

Can you refresh the page and get a different 13-card hand?

---

## Milestone 4 — Card UI

### Goal

Render cards in a clean visual way.

### Tasks

- [ ] Create `CardView` component
- [ ] Show card rank
- [ ] Show card suit
- [ ] Add simple styling
- [ ] Make red suits visually different from black suits
- [ ] Add hover effect

### Example component idea

```tsx
<CardView card={card} />
```

### Checkpoint question

Can you clearly see all 13 cards?

---

## Milestone 5 — Hand Zones

### Goal

Create the three Pusoy hand areas.

### Zones

```txt
Front: 3 cards
Middle: 5 cards
Back: 5 cards
Unassigned: remaining cards
```

### Tasks

- [ ] Create a `HandZone` component
- [ ] Add Front zone
- [ ] Add Middle zone
- [ ] Add Back zone
- [ ] Add Unassigned zone
- [ ] Show how many cards each zone contains

### Checkpoint question

Can the UI show separate areas for each hand?

---

## Milestone 6 — Move Cards Between Zones

### Goal

Allow the player to arrange cards.

### Simple first version

Do not start with drag-and-drop immediately.

Start with click-based movement.

Example:

- Click a card
- Click a zone
- Card moves to that zone

### Tasks

- [ ] Track selected card
- [ ] Allow moving card to Front
- [ ] Allow moving card to Middle
- [ ] Allow moving card to Back
- [ ] Prevent too many cards in each zone
- [ ] Add reset button

### Checkpoint question

Can you arrange 13 cards into 3 / 5 / 5?

---

## Milestone 7 — Hand Evaluation

### Goal

Detect poker hand strength.

### Tasks

Create a function:

```ts
evaluateFiveCardHand(cards: Card[]): HandResult
```

Create another function:

```ts
evaluateThreeCardHand(cards: Card[]): HandResult
```

### Suggested result type

```ts
interface HandResult {
  rankName: string;
  rankValue: number;
  tiebreakers: number[];
}
```

### Example

```ts
{
  rankName: "Pair",
  rankValue: 1,
  tiebreakers: [14, 10, 8, 3]
}
```

### Checkpoint question

Can the game identify a pair, flush, straight, and full house?

---

## Milestone 8 — Validate Pusoy Arrangement

### Goal

Check whether the player made a legal Pusoy hand.

### Rule

```txt
Back must be stronger than Middle
Middle must be stronger than Front
```

### Tasks

- [ ] Compare Back vs Middle
- [ ] Compare Middle vs Front
- [ ] Show `Valid hand` or `Invalid hand`
- [ ] Detect foul/dead hand
- [ ] Disable submit button if invalid

### Important function

```ts
compareHands(handA: HandResult, handB: HandResult): number
```

Return:

```txt
1  = handA wins
0  = tie
-1 = handB wins
```

### Checkpoint question

Can the app detect an invalid arrangement?

---

## Milestone 9 — Opponent Logic

### Goal

Add a basic computer opponent.

### Simple version

The opponent does not need to be smart at first.

### Tasks

- [ ] Deal 13 cards to opponent
- [ ] Create simple auto-arrangement logic
- [ ] Validate opponent hand
- [ ] Display opponent result after player submits

### Later improvement

Create smarter sorting logic:

- strongest 5-card hand to Back
- next strongest 5-card hand to Middle
- weakest 3-card hand to Front

### Checkpoint question

Can you play one full round against the computer?

---

## Milestone 10 — Scoring

### Goal

Compare player hands against opponent hands.

### Comparison

| Row | Compare |
|---|---|
| Front | Player front vs opponent front |
| Middle | Player middle vs opponent middle |
| Back | Player back vs opponent back |

### Basic scoring

```txt
+1 point for each row won
0 points for tie
-1 point for each row lost
```

### Tasks

- [ ] Compare front hands
- [ ] Compare middle hands
- [ ] Compare back hands
- [ ] Show points won/lost
- [ ] Show round winner

### Checkpoint question

Can the game decide who won the round?

---

## Milestone 11 — Better UX

### Goal

Make the game feel better to play.

### Tasks

- [ ] Add card animations
- [ ] Add better buttons
- [ ] Add hand labels
- [ ] Add error messages
- [ ] Add visual invalid-hand warning
- [ ] Add mobile-friendly layout
- [ ] Add card sorting button
- [ ] Add new round button

### Checkpoint question

Does the game feel understandable without reading instructions?

---

## Milestone 12 — Drag and Drop

### Goal

Replace click movement with drag-and-drop.

### Recommended library

```txt
@dnd-kit/core
```

### Tasks

- [ ] Install drag-and-drop library
- [ ] Make cards draggable
- [ ] Make zones droppable
- [ ] Prevent invalid zone sizes
- [ ] Keep click controls as backup if possible

### Checkpoint question

Can cards be dragged naturally between zones?

---

## Milestone 13 — Multiplayer Later

### Goal

Add real multiplayer after the local version works.

### Backend ideas

```txt
Node.js
Express
Socket.io
```

### Multiplayer features

- [ ] Create room
- [ ] Join room
- [ ] Deal cards server-side
- [ ] Submit hands
- [ ] Reveal both players after both submit
- [ ] Score round
- [ ] Start next round

### Important warning

Do not trust the frontend in multiplayer.

The server should handle:

- deck creation
- shuffle
- dealing
- validation
- scoring

---

# Core Files To Create

## Types

```txt
src/types/card.ts
src/types/hand.ts
src/types/game.ts
```

## Game logic

```txt
src/game/deck.ts
src/game/shuffle.ts
src/game/evaluateHand.ts
src/game/compareHands.ts
src/game/validatePusoy.ts
src/game/scoring.ts
```

## Components

```txt
src/components/CardView.tsx
src/components/HandZone.tsx
src/components/GameBoard.tsx
src/components/ScoreBoard.tsx
src/components/Button.tsx
```

---

# Suggested First Coding Order

1. Create project
2. Create card types
3. Generate deck
4. Shuffle deck
5. Deal 13 cards
6. Render cards
7. Create hand zones
8. Move cards between zones
9. Evaluate hands
10. Validate arrangement
11. Add opponent
12. Add scoring
13. Improve UI
14. Add drag-and-drop
15. Add multiplayer

---

# Important Learning Goals

By building this project, you should understand:

- How to model real-world data with TypeScript types
- How arrays and objects represent game state
- How to separate UI from game logic
- How poker hand evaluation works
- How to compare complex data
- How to build a project in small steps
- How to avoid making the project too big too early

---

# Notes

Start with the smallest working version.

Do not try to build the full final game immediately.

The first real goal is:

```txt
Generate deck → shuffle → deal 13 cards → display them
```

After that, improve one system at a time.
