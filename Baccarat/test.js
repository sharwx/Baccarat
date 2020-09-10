'use strict'

let theDeck = [
    { value: '8', suit: 'spade', points: 8, printCard: '8S' },
    { value: '9', suit: 'heart', points: 9, printCard: '9H' }
]
let playerTotal = null
let playerWin = false
let playerHand = [
    { value: '6', suit: 'diamond', points: 6, printCard: '6D' },
    { value: 'Ace', suit: 'spade', points: 1, printCard: 'AS' }
]
let playerBet = 0
let playerTotalCards = 2

let bankerTotal = null
let bankerWin = false
let bankerHand = [
    { value: 'Ace', suit: 'diamond', points: 1, printCard: 'AD' },
    { value: '3', suit: 'club', points: 3, printCard: '3C' }
]
let bankerTotalCards = 2

let resultTie = false


//----------------------------------------------------------------//

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


// createDeck()
// shuffleCards()
// dealCard()
console.log(playerHand)
console.log(bankerHand)
initialTotalPoints()
console.log("playerTotalCards: " + playerTotalCards)
console.log("bankerTotalCards: " + bankerTotalCards)
console.log("Player: " + playerWin)
console.log("Banker: " + bankerWin)
console.log("Tie: " + resultTie)
console.log("Player points: " + playerTotal)
console.log("Banker points: " + bankerTotal)
console.log(theDeck)
