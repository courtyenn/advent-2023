import readline from "readline"
import fs from "fs"

const readInterface = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  output: process.stdout,
  console: false,
})

const MAPS = {}
let count = 0
let currentLabel = ""
readInterface.on("line", function (line) {
  // console.log(line)

  if (count === 0 && line.includes(":")) {
    // gets the seeds
    const [label, val] = line.split("seeds: ")
    MAPS["seeds"] = val.split(" ").map((x) => x * 1)
  } else if (line.includes(":")) {
    // gets labels
    currentLabel = line.split(":")[0]
    console.log("what is currentLabel", currentLabel)
    MAPS[currentLabel] = []
  } else if (line.match(/[\d]/g)?.length > 0) {
    let y = line.split(" ").map((x) => x * 1)
    console.log(y)

    MAPS[currentLabel].push(y)
  }
  count++
})

readInterface.on("close", function () {
  console.log(MAPS)
  doTheAlgorithm()
})

const doTheAlgorithm = () => {
  const seeds = MAPS["seeds"]
  seeds.push("end")
  const labels = Object.keys(MAPS).filter((x) => x !== "seeds")
  labels.push("end")
  let currentLabel = labels[0]
  while (currentSeed !== "end") {
    let currentSeed = seed
    while (currentLabel !== "end") {
      const [range, label] = MAPS[currentLabel]
      currentSeed = doRangeMap(range, currentSeed)
      currentLabel = label
    }
  }
}

const doRangeMap = (seed, ranges) => {
  let rangeNum = 0
  let found = false
  while (!found || rangeNum < ranges.length) {
    const range = ranges[rangeNum]
    const [dest, source, inc] = range.split(" ")
    const newDest = dest + inc - 1
    const newSource = source + inc - 1
    if (seed === source) {
      found = true
    }
    rangeNum++
  }
}
