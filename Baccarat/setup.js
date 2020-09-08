let theDeck = []
let theDiscard = []
let chipsTotal = 1000

let playerTotal = null
let playerWin = false
let playerHand = []
let playerBet = 0

let bankerTotal = null
let bankerWin = false
let bankerHand = []

let resultTie = false

// Declare card elements

let suits = ["spade", "diamond", "club", "heart"]
let values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
let points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

// Create a deck of cards

function createDeck() {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let cards = {
                value: values[j],
                suit: suits[i],
                points: points[j]
            }
            theDeck.push(cards)
        }
    }
}


// Shuffle the cards

function shuffleCards() {
    for (let i = theDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let temp = theDeck[i]
        theDeck[i] = theDeck[j]
        theDeck[j] = temp
    }
}

// Reset the game and empty the deck
function restartGame() {
    theDeck = []
    theDiscard = []
    createDeck()
    shuffleCards(theDeck)
}

// Dealt to player's hand and banker's hand
function dealCard() {
    for (let i = 0; i < 2; i++) {
        playerHand.push(theDeck.shift())
        bankerHand.push(theDeck.shift())
    }
}

// Discard player's hand and banker's hand
function discardHand() {
    for (let i = playerHand.length - 1; i >= 0; i--) {
        let burnCard = playerHand.splice(playerHand[i], 1)
        theDiscard.push(burnCard)
    }
    for (let i = bankerHand.length - 1; i >= 0; i--) {
        let burnCard = bankerHand.splice(theDiscard[i], 1)
        theDiscard.push(burnCard)
    }
}

// createDeck()
// shuffleCards()
// dealCard()
// console.log(playerHand)
// console.log(bankerHand)
// console.log(theDeck.length)
// discardHand()
// console.log(playerHand)
// console.log(bankerHand)
// console.log(theDeck.length)
// console.log(theDiscard)
// dealCard()
// console.log(playerHand)
// console.log(bankerHand)
// console.log(theDeck.length)
// console.log(theDiscard.length)