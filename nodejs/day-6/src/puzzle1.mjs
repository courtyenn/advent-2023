const myRecords = [
  { time: 41, distance: 214 },
  { time: 96, distance: 1789 },
  { time: 88, distance: 1127 },
  { time: 94, distance: 1055 },
]

const sampleRecords = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
]

const partTwoRecord = { time: 41968894, distance: 214178911271055 }
const calculateNumberofWins = (record) => {
  const { time, distance } = record
  let numberOfWins = 0
  let calcDistance = 0
  let initialTime = 1
  while (initialTime < time) {
    calcDistance = initialTime * (time - initialTime)
    if (calcDistance > distance) {
      numberOfWins++
    }
    initialTime++
  }
  return numberOfWins
}

const compute = (records) => {
  let numberOfWins = 1
  records.forEach((record) => {
    numberOfWins = numberOfWins * calculateNumberofWins(record)
  })
  console.log(numberOfWins)
}

// compute(myRecords)
console.log(calculateNumberofWins(partTwoRecord))
