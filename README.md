## Description

A simplified game of Baccarat using HTML, CSS, Javascript and Bootstrap.

**URL: https://sharwx.github.io/Baccarat/**

The game of Baccarat is played with four decks of cards, with each deck having 52 cards without jokers.

Betting includes "Player", "Banker", "Tie", "Player Pair", "Banker Pair", "Player Natural 8", "Player Natural 9", "Banker Natural 8" and "Banker Natural 9".

## Instructions

```
- Click on the "Play" button to start. Player will start with $2000 chips.

- Player to place bets before clicking on "Deal".

- When player runs out of chip, click on "Restart".

- Click on "Payout" for information on payout.
```

## Gameplay

```
- The point value of cards is as follows:
    - Any cards from 2 to 9 inclusive will have its point value and an Ace will have the point value of 1;
    - Any 10, Jack, Queen or King will have a point value of 0

- The point total of a hand is as follows:
    - The total value of the cards in the hand is a number between 0 to 9, the total point will be that number;
    - The total value of the cards in the hand is 10 or more, the total point shall be the right digit of that number only (eg: 21 = total point of 1; 19 = total point of 9)

- Two hands will be dealt: one as "Player" hand and the other as "Banker hand.

- Four cards will be dealt: two to "Player" hand and two to "Banker" hand.

- The first four cards will determine the outcome of "Player Pair", "Banker Pair", "Player Natural 8", "Player Natural 9", "Banker Natural 8" and "Banker Natural 9".
    - "Pair" wagers win if the first two cards in the respective hand constitutes a pair
    - "Natural 9" wagers win if the first two cards in the hand has a total value of 9
    - "Natural 8" wagers win if the first two cards in the hand has a total value of 8 and is the winning hand (i.e. the other hand is not a "Natural 9")
    - When the total point of the "Player" or "Banker" hand after the initial four cards is 8 or 9, no more cards will be dealt to either hand

- A third card will be dealt if "Player" or "Banker" has total point of less than 5. "Player" will stand at total point of 6 or 7 and "Banker" will usually stand at total point of 6 or 7 except for some cases.

- The winner of the round of play is the hand with the highest total point.

- If the "Player" and "Banker" hands have an identical total point, the round of play is a "Tie".
```

## Credits

[Card images:] (http://acbl.mybigcommerce.com/52-playing-cards/)<br/>
[Gameplay instructions:] (https://www.cra.gov.sg/docs/default-source/game-rule-documents/mbs/mbs-0620001-power-baccarat-98-game-rules_cra-ver-4.pdf#:~:text=%E2%80%9CNatural%E2%80%9D%20means%20a%20point%20total,or%20two%20Q'%20s).)