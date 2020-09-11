// Game Info
let theDeck = []
let theDiscard = []
let chipsTotal = 2000

// Player Info
let playerTotal = null
let playerWin = false
let playerPairWin = false
let playerHand = []
let playerTotalCards = 0

// Banker Info
let bankerTotal = null
let bankerWin = false
let bankerPairWin = false
let bankerHand = []
let bankerTotalCards = 0

let resultTie = false

// Chips Input Info
let chipInput_PP = 0
let chipInput_BP = 0
let chipInput_PN9 = 0
let chipInput_PN8 = 0
let chipInput_BN9 = 0
let chipInput_BN8 = 0
let chipInput_P = 1500
let chipInput_B = 500
let chipInput_T = 0
let playerChipInput = chipInput_PP + chipInput_BP + chipInput_PN9 + chipInput_PN8 + chipInput_BN9 + chipInput_BN8 + chipInput_P + chipInput_B + chipInput_T

// Payout Info
let playerPairBet = 0
let bankerPairBet = 0
let playerBet = 0
let bankerBet = 0
let tieBet = 0
let playerNatural9 = 0
let playerNatural8 = 0
let bankerNatural9 = 0
let bankerNatural8 = 0

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

// Reset and empty the deck and create new deck
function restartDeck() {
    theDeck = []
    theDiscard = []
    createDeck()
    shuffleCards(theDeck)
}

// Dealt to player's hand and banker's hand
function dealCard() {
    discardHand()
    if (theDeck.length < 6) {
        // show no more cards left.
        console.log("Let's shuffle the deck!")
        restartDeck()
    }
    for (let i = 0; i < 2; i++) {
        playerHand.push(theDeck.shift())
        playerTotalCards++
        bankerHand.push(theDeck.shift())
        bankerTotalCards++
    }
    initialTotalPoints()
}

// Discard player's hand and banker's hand
function discardHand() {
    for (let i = playerHand.length - 1; i >= 0; i--) {
        let burnCard = playerHand.splice(playerHand[i], 1)
        theDiscard.push(burnCard)
        playerTotalCards = 0 
    }
    for (let i = bankerHand.length - 1; i >= 0; i--) {
        let burnCard = bankerHand.splice(theDiscard[i], 1)
        theDiscard.push(burnCard)
        bankerTotalCards = 0 
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
        playerPairWin = true
        playerPairBet++
        console.log("Player pair")
    }
    checkBankerPair()
}

function checkBankerPair() {
    console.log("checkBankerPair activated")
    if (bankerHand[0].value === bankerHand[1].value) {
        bankerPairWin = true
        bankerPairBet++
        console.log("Banker pair")
    }
    checkNatural()
}

function checkNatural() {
    console.log("checkNatural activated")
    if (playerTotal === 9 && bankerTotal === 9) {
        resultTie = true
        tieBet++
        playerNatural9++
        bankerNatural9++
    } else if (playerTotal === 8 && bankerTotal === 8) {
        resultTie = true
        tieBet++
        playerNatural8++
        bankerNatural8++
    } else if (playerTotal === 9) {
        playerWin = true
        playerBet++
        playerNatural9++
    } else if (bankerTotal === 9) {
        bankerWin = true
        bankerBet++
        bankerNatural9++
    } else if (playerTotal === 8 && bankerTotal < 8) {
        playerWin = true
        playerBet++
        playerNatural8++
    } else if (bankerTotal === 8 && playerTotal < 8) {
        bankerWin = true
        bankerBet++
        bankerNatural8++
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
        playerBet++
    } else if (playerTotal < bankerTotal) {
        bankerWin = true
        bankerBet++
    } else if (playerTotal === bankerTotal) {
        resultTie = true
        tieBet++
    }
    gameInfo()
    chipsCount()
}

function chipsCount() {
    console.log("Chips count start")
    chipsTotal -= playerChipInput
    if (playerPairWin === true) {
        chipsTotal += (chipInput_PP * playerPairBet * 12)
    }
    if (bankerPairWin === true) {
        chipsTotal += (chipInput_BP * bankerPairBet * 12)
    }
    if (playerTotal === 9 || playerTotal === 8) {
        chipsTotal += (chipInput_PN9 * playerNatural9 * 9)
        chipsTotal += (chipInput_PN8 * playerNatural8 * 9)
    } else if (bankerTotal === 9 || bankerTotal === 8) {
        chipsTotal += (chipInput_BN9 * bankerNatural9 * 9)
        chipsTotal += (chipInput_BN8 * bankerNatural8 * 9)
    }
    if (playerWin === true) {
        chipsTotal += (chipInput_P * playerBet * 2)
    } else if (bankerWin === true) {
        chipsTotal += (chipInput_B * bankerBet * 2)
    } else if (resultTie === true) {
        chipsTotal += (chipInput_T * tieBet * 9)
    }
    chipsCountReset()
}

function chipsCountReset() {
    console.log("Chip count reset")
    playerPairBet = 0
    bankerPairBet = 0
    playerBet = 0
    bankerBet = 0
    tieBet = 0
    playerNatural9 = 0
    playerNatural8 = 0
    bankerNatural9 = 0
    bankerNatural8 = 0

    playerTotal = null
    bankerTotal = null
    playerWin = false
    bankerWin = false
    resultTie = false
    playerPairWin = false
    bankerPairWin = false
    
    chipsCheck()
}

function chipsCheck() {
    if (chipsTotal <= 0) {
        stopTheGame()
    } else {
    console.log("Game continue")
    }
} 

function stopTheGame() {
    theDeck = []
    theDiscard = []
    restartGame()
}

function restartGame() {
    chipsTotal = 2000
    console.log("2000 added")
}

//----------------------------------------------------------------------------------//


//  Gameplay
function gameInfo() {
    console.log(playerHand)
    console.log(bankerHand)
    console.log("playerTotalCards: " + playerTotalCards)
    console.log("bankerTotalCards: " + bankerTotalCards)
    console.log("Player: " + playerWin)
    console.log("Banker: " + bankerWin)
    console.log("Tie: " + resultTie)
    console.log("Player points: " + playerTotal)
    console.log("Banker points: " + bankerTotal)
    console.log(theDeck.length)
}

function chipsInfo() {
    console.log(chipsTotal)
}

chipsInfo()
dealCard()
// gameInfo()
chipsInfo()