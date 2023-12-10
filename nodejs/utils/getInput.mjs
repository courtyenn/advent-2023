import readline from "readline"
import fs from "fs"

let entireFile = ``
export const getParsedInput = async (fileName) =>
  new Promise((resolve) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(fileName),
    })
    readInterface.on("line", function (line) {
      entireFile = entireFile + line + "\n"
    })

    readInterface.on("close", function () {
      resolve(entireFile)
    })
  })
