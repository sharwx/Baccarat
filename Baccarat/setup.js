let theDeck = []
let theDiscard = []
let chipsTotal = 1000

let playerTotal = null
let playerWin = false
let playerHand = []
let playerBet = 0
let playerTotalCards = 0

let bankerTotal = null
let bankerWin = false
let bankerHand = []
let bankerTotalCards = 0

let resultTie = false

// Declare card elements

let suits = ["spade", "diamond", "club", "heart"]
let values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
let suitImg = ["S", "D", "C", "H"]
let valueImg = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

// Create 4 decks of cards

function createDeck() {
    for (let x = 0; x < 4; x++) {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let cards = {
                    value: values[j],
                    suit: suits[i],
                    points: points[j],
                    printCard: valueImg[j]+suitImg[i]
                }
                theDeck.push(cards)
            }
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
        playerTotalCards++
        bankerHand.push(theDeck.shift())
        bankerTotalCards++
    }
}
// add function to check for insufficient card and restart createDeck

// Discard player's hand and banker's hand
function discardHand() {
    for (let i = playerHand.length - 1; i >= 0; i--) {
        let burnCard = playerHand.splice(playerHand[i], 1)
        theDiscard.push(burnCard)
        playerTotalCards = 0 // Check if this work
    }
    for (let i = bankerHand.length - 1; i >= 0; i--) {
        let burnCard = bankerHand.splice(theDiscard[i], 1)
        theDiscard.push(burnCard)
        bankerTotalCards = 0 // Check if this work
    }
}

//----------------------------------------------------------------------------------//

// Total points of initial 2 cards

function initialTotalPoints() {
    playerTotal = (playerHand[0].points + playerHand[1].points) % 10
    bankerTotal = (bankerHand[0].points + bankerHand[1].points) % 10
    checkPlayerPair()
}

function checkPlayerPair() {
    console.log("checkPlayerPair activated")
    if (playerHand[0].value === playerHand[1].value) {
        // player pair wagers win
        console.log("Player pair")
    }
    checkBankerPair()
}

function checkBankerPair() {
    console.log("checkBankerPair activated")
    if (bankerHand[0].value === bankerHand[1].value) {
        //Banker pair wagers win
        console.log("Banker pair")
    }
    checkNatural()
}

function checkNatural() {
    console.log("checkNatural activated")
    if (playerTotal === 9 && bankerTotal === 9) {
        resultTie = true
    } else if (playerTotal === 8 && bankerTotal === 8) {
        resultTie = true
    } else if (playerTotal === 9) {
        //player natural 9 wagers win
        playerWin = true 
    } else if (bankerTotal === 9) {
        //banker natural 9 wagers win
        bankerWin = true
    } else if (playerTotal === 8 && bankerTotal < 8) {
        //player natural 8 wagers win
        playerWin = true
    } else if (bankerTotal === 8 && playerTotal < 8) {
        //banker natural 8 wagers win
        bankerWin = true
    } else {
        drawThirdCards()
    }
}

function drawThirdCards() {
    if (playerTotal <= 5) {
        playerHand.push(theDeck.shift())
        playerTotalCards++
    }
    //player do not have a third card
    if (!playerHand[2]) { 
        if (bankerTotal <= 5){
            bankerHand.push(theDeck.shift())
            bankerTotalCards++
        }
    }
    //player have a third card
    if (playerHand[2]) {
        if (bankerTotal <= 2){
            bankerHand.push(theDeck.shift())
            bankerTotalCards++
        } else if (bankerTotal === 3 && playerHand[2].points !== 8) {
            //exception case if player's third card is 8
            bankerHand.push(theDeck.shift())
            bankerTotalCards++            
        } else if (bankerTotal === 4 && [2,3,4,5,6,7].includes(playerHand[2].points)) {
            bankerHand.push(theDeck.shift())
            bankerTotalCards++           
        } else if (bankerTotal === 5 && [4,5,6,7].includes(playerHand[2].points)) {
            bankerHand.push(theDeck.shift())
            bankerTotalCards++  
        } else if (bankerTotal === 6 && [6,7].includes(playerHand[2].points)) {
            bankerHand.push(theDeck.shift())
            bankerTotalCards++  
        }
    }
    finalTotalPoints()
}

function finalTotalPoints() {
    console.log("finalTotal activated")
    if (playerTotalCards === 2) {
        playerTotal = (playerHand[0].points + playerHand[1].points) % 10
    } else if (playerTotalCards === 3 ) {
        playerTotal = (playerHand[0].points + playerHand[1].points + playerHand[2].points) % 10
    }
    if (bankerTotalCards === 2) {
        bankerTotal = (bankerHand[0].points + bankerHand[1].points) % 10
    } else if (bankerTotalCards === 3) {
        bankerTotal = (bankerHand[0].points + bankerHand[1].points + bankerHand[2].points) % 10
    }
    finalHands()    
}

function finalHands() {
    console.log("finalHand activated")
    if (playerTotal > bankerTotal) {
        playerWin = true
    } else if (playerTotal < bankerTotal) {
        bankerWin = true
    } else if (playerTotal === bankerTotal) {
        resultTie = true
    }
}
// result modal and payout structure


createDeck()
shuffleCards()
dealCard()
initialTotalPoints()
console.log(playerHand)
console.log(bankerHand)
console.log("playerTotalCards: " + playerTotalCards)
console.log("bankerTotalCards: " + bankerTotalCards)
console.log("Player: " + playerWin)
console.log("Banker: " + bankerWin)
console.log("Tie: " + resultTie)
console.log("Player points: " + playerTotal)
console.log("Banker points: " + bankerTotal)

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