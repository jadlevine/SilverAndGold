// console.log('js is running')
////////////////////////////////////
//IMPORTS//
////////////////////////////////////
import { tmDeck } from './js_modules/treasureMapsDeck.js'
import { etDeck } from './js_modules/explorationTilesDeck.js'

let tmTestCard = tmDeck[39]
console.log(`test id: ${tmTestCard.id}`)

////////////////////////////////////
//GLOBAL VARIABLES//
////////////////////////////////////
// let roundNum, startPlayer, currentPlayer

////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////

////////////////////////////////
/////////////////////////////////
//Shuffle deck function
//Fisher-Yates Shuffle https://bost.ocks.org/mike/shuffle/
const shuffle = (deck) => {
  //rewrite this to make it more succinct
  let unshuffledLength = deck.length
  while (unshuffledLength !== 0) {
    let randomIndex = Math.floor(Math.random() * unshuffledLength)
    unshuffledLength--
    let temp = deck[unshuffledLength] //tempory hold for last card
    deck[unshuffledLength] = deck[randomIndex] //move random to end
    deck[randomIndex] = temp //move last card to middle to be shuffled later
  }
  return deck
}

////////////////////////////////
/////////////////////////////////

//dealET function
const dealET = () => {
  let nextET = shuffledETDeck.shift()
  let etGrid = document.querySelector('#explore-tile-grid')
  etGrid.innerHTML = '' //clears the etGrid
  for (let i = 1; i < 7; i++) {
    let newRegion = document.createElement('div')
    newRegion.innerHTML = `<div class="et region r${i} ${nextET.regions.includes(
      i
    )}"</div>`
    etGrid.appendChild(newRegion)
  }
}

////////////////////////////////
/////////////////////////////////
const convertSuit = (suitVal, bonusValorClass) => {
  let suitClass, bonusValue
  switch (suitVal) {
    case 14:
      suitClass = 'fourteen'
      bonusValue = 2
      break
    case 12:
      suitClass = 'twelve'
      bonusValue = 2
      break
    case 10:
      suitClass = 'ten'
      bonusValue = 1
      break
    case 8:
      suitClass = 'eight'
      bonusValue = 1
      break
    case 0:
      suitClass = ''
      bonusValue = ''
      break
  }
  if (bonusValorClass === 'bonusVal') {
    return bonusValue
  } else {
    return suitClass
  }
}

////////////////////////////////
/////////////////////////////////

//dealTM
const dealTM = (destinationID) => {
  let nextTM = shuffledTMDeck.shift()
  let suitClass = convertSuit(nextTM.suit)
  let bonusClass = convertSuit(nextTM.bonusSuit)
  let bonusValue = convertSuit(nextTM.bonusSuit, 'bonusVal')

  let destination = document.querySelector(`#${destinationID}`)
  let newTop = document.createElement('div')
  newTop.id = `${destinationID}-top`
  newTop.classList = 'tm-top'

  let newSuit = document.createElement('div')
  newSuit.id = `${destinationID}-suit`
  newSuit.classList = suitClass
  newSuit.innerText = nextTM.suit
  newTop.appendChild(newSuit)

  let newBonus = document.createElement('div')
  newBonus.id = `${destinationID}-bonus`
  newBonus.classList = bonusClass
  newBonus.innerText = bonusValue
  newTop.appendChild(newBonus)

  destination.appendChild(newTop)

  let newGrid = document.createElement('div')
  newGrid.id = `${destinationID}-grid`
  newGrid.classList = 'tm-grid'
  destination.appendChild(newGrid)

  ////add regions according to nextTM object properties
  console.log(nextTM.regions)
  let gridElement = document.querySelector(`#${destinationID}-grid`)
  for (let i = 1; i < 17; i++) {
    let newRegion = document.createElement('div')
    newRegion.id = `${destinationID}-r${i}`
    newRegion.classList = 'region'

    let regionPresence = nextTM.regions.includes(i)
    newRegion.classList.add(`region-${regionPresence}`)

    let gemPresence = nextTM.gemRegions.includes(i)
    newRegion.classList.add(`gem-${gemPresence}`)

    let bananaPresence = nextTM.bananaRegions.includes(i)
    newRegion.classList.add(`banana-${bananaPresence}`)

    let coconutPresence = nextTM.coconutRegions.includes(i)
    newRegion.classList.add(`coconut-${coconutPresence}`)

    gridElement.appendChild(newRegion)
  }
}

//player turn function
const playerTurn = () => {}
playerTurn()

const regionClicked = (event) => {
  console.log(`${event.target}`)
}
////////////////////////////////////
//EVENT LISTENERS//
////////////////////////////////////
// document.querySelector('#p1-tm1 .grid').addEventListener('click', regionClicked)
//what i want to do is document.querySelector('#p1-tm1 .region')
//go through the array(?) result with a foreach
//add an event listener to every region that is active
//have the event listener trigger a function that registers the player move (check if valid, place tile, etc...)

////////////////////////////////////
//Function Calls
////////////////////////////////////
// //calling the shuffle function
const shuffledTMDeck = shuffle(tmDeck)
const shuffledETDeck = shuffle(etDeck)
dealET() //removes an etCard from shuffledETDeck and deals it to the #explore-tile-grid

// let bonusVal = convertSuit(14, 'bonusVal')
// let suitClass = convertSuit(14)

dealTM('p1-tm1')
// dealTM('p1-tm2')
// dealTM('p1-tm3')
// dealTM('p1-tm4')
// dealTM('global-tm1')
// dealTM('tm2-avail')
// dealTM('tm3-avail')
// dealTM('tm4-avail')
