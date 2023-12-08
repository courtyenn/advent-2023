import readline from "readline"
import fs from "fs"

export const getParsedInput = async () =>
  new Promise((resolve) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream("./day-7/input.txt"),
    })
    const hands = []
    readInterface.on("line", function (line) {
      const [hand, bid] = line.split(" ")
      hands.push({ hand, bid: bid * 1 })
    })

    readInterface.on("close", function () {
      resolve(hands)
    })
  })
