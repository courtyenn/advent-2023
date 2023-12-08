import { getParsedInput } from "./input.mjs"
const set = await getParsedInput()
const sampleSet = [
  { hand: "32T3K", bid: 765 },
  { hand: "T55J5", bid: 684 },
  { hand: "KK677", bid: 28 },
  { hand: "KTJJT", bid: 220 },
  { hand: "QQQJA", bid: 483 },
]

const cardValMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
}

const cardRankMap = {
  FIVE_OF_KIND: 10,
  FOUR_OF_KIND: 9,
  FULL_HOUSE: 8,
  THREE_OF_KIND: 7,
  TWO_PAIR: 6,
  ONE_PAIR: 5,
  HIGH_CARD: 4,
}

const cardMapRanks = {}
const getHighestMatch = (matches) => {
  const filteredKeys = Object.keys(matches).filter((key) => key !== "J")
  return filteredKeys.reduce((acc, key) => {
    return matches[key] > matches[acc] ? key : acc
  }, filteredKeys[0])
}

const getRankedHand = (matches, ogHand) => {
  const jokers = matches["J"] || 0
  const highKey = getHighestMatch(matches)
  // const newHand = ogHand.replace(/J/g, highKey)
  if (ogHand === "JJJJJ") return cardRankMap.FIVE_OF_KIND
  matches[highKey] = matches[highKey] + jokers
  matches["J"] && delete matches["J"]

  const matchKeys = Object.keys(matches)
  const matchLength = Object.keys(matches).length
  if (cardMapRanks[ogHand]) return cardRankMap[cardMapRanks[ogHand]]
  if (matchLength === 1) {
    cardMapRanks[ogHand] = "FIVE_OF_KIND"
    return cardRankMap.FIVE_OF_KIND
  } else if (matchLength === 2) {
    for (const key of matchKeys) {
      if (matches[key] === 4) {
        cardMapRanks[ogHand] = "FOUR_OF_KIND"
        return cardRankMap.FOUR_OF_KIND
      } else if (matches[key] === 3) {
        cardMapRanks[ogHand] = "FULL_HOUSE"
        return cardRankMap.FULL_HOUSE
      }
    }
  } else if (matchLength === 3) {
    for (const key of matchKeys) {
      if (matches[key] === 3) {
        cardMapRanks[ogHand] = "THREE_OF_KIND"
        return cardRankMap.THREE_OF_KIND
      } else if (matches[key] === 2) {
        cardMapRanks[ogHand] = "TWO_PAIR"
        return cardRankMap.TWO_PAIR
      }
    }
  } else if (matchLength === 4) {
    cardMapRanks[ogHand] = "ONE_PAIR"
    return cardRankMap.ONE_PAIR
  } else {
    cardMapRanks[ogHand] = "HIGH_CARD"
    return cardRankMap.HIGH_CARD
  }
}
const getHandValue = (hand) => {
  const cards = hand.split("")
  const matches = {}
  const cardValues = cards.map((card) => {
    matches[card] = matches[card] ? matches[card] + 1 : 1

    if (cardValMap[card]) {
      return cardValMap[card]
    }
    return parseInt(card)
  })

  return [cardValues, getRankedHand(matches, hand)]
}

const getHighCardHand = (aCardValues, bCardValues) => {
  for (let i = 0; i < aCardValues.length; i++) {
    if (aCardValues[i] > bCardValues[i]) {
      return 1
    } else if (aCardValues[i] < bCardValues[i]) {
      return -1
    }
  }
}

const sortHands = (hands) => {
  const sortedHands = hands.sort((a, b) => {
    const [aCardValues, aCardRank] = getHandValue(a.hand)
    const [bCardValues, bCardRank] = getHandValue(b.hand)
    if (aCardRank > bCardRank) {
      return 1
    } else if (aCardRank < bCardRank) {
      return -1
    } else {
      return getHighCardHand(aCardValues, bCardValues)
    }
  })
  return sortedHands
}

const computeHands = (hands) => {
  const sortedHands = sortHands(hands)
  const winnings = sortedHands.reduce((acc, hand, index) => {
    const { bid } = hand
    const winnings = bid * (index + 1)
    return acc + winnings
  }, 0)
  return winnings
}

const winnings = computeHands(set)

console.log("WINNINGS", winnings)
