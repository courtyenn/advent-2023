import { getParsedInput } from "../utils/getInput.mjs"

const input = await getParsedInput("./nodejs/day-10/input.txt")

const rows = input.split("\n")
// const cols = rows.split("")

const getStart = () => {
  for (let x = 0; x < rows.length; x++) {
    const row = rows[x]
    for (let y = 0; y < row.length; y++) {
      if (row[y] === "S") {
        return [x, y]
      }
    }
  }
}

const isValidPath = (start, coord, prevPos, dir) => {
  if (coord[0] < 0 || coord[1] < 0) return { isValid: false, foundStart: false }
  const TOP = ["|", "F", "7", "S"]
  const RIGHT = ["-", "J", "7", "S"]
  const BOTTOM = ["|", "J", "L", "S"]
  const LEFT = ["-", "F", "L", "S"]
  const rules = {
    BOTTOM,
    RIGHT,
    LEFT,
    TOP,
    S: [...TOP, ...LEFT, ...BOTTOM, ...RIGHT],
  }
  const [x2, y2] = coord
  const validPaths = rules[dir].includes(rows[x2][y2])
  return {
    isValid: (x2 !== prevPos[0] || y2 !== prevPos[1]) && validPaths,
    foundStart:
      rows[x2][y2] === "S" && (x2 !== prevPos[0] || y2 !== prevPos[1]),
    validPath: [x2, y2], // not really "valid", just couldn't think of a better name
  }
}
const getLoopPaths = (start, prevPos) => {
  const paths = []
  const [x, y] = start
  const {
    isValid: validTop,
    foundStart: foundStartTop,
    validPath: validTopPath,
  } = isValidPath(start, [x - 1, y], prevPos, "TOP")
  const {
    isValid: validBottom,
    foundStart: foundStartBottom,
    validPath: validBottomPath,
  } = isValidPath(start, [x + 1, y], prevPos, "BOTTOM")
  const {
    isValid: validLeft,
    foundStart: foundStartLeft,
    validPath: validLeftPath,
  } = isValidPath(start, [x, y - 1], prevPos, "LEFT")
  const {
    isValid: validRight,
    foundStart: foundStartRight,
    validPath: validRightPath,
  } = isValidPath(start, [x, y + 1], prevPos, "RIGHT")

  validLeft && paths.push(validLeftPath)
  validRight && paths.push(validRightPath)
  validTop && paths.push(validTopPath)
  validBottom && paths.push(validBottomPath)
  return [
    paths,
    foundStartLeft || foundStartRight || foundStartBottom || foundStartTop,
  ]
}

const computeLoopLength = () => {
  let [x, y] = getStart()
  let isLoopComplete = false
  let countPaths = 0
  let prevPos = [null, null]
  while (!isLoopComplete) {
    const [paths, foundStart] = getLoopPaths([x, y], prevPos)
    if (foundStart) {
      isLoopComplete = true
      break
    }
    for (let i = 0; i < paths.length; i++) {
      const [x2, y2] = paths[i]
      if (prevPos[0] !== x2 || prevPos[1] !== y2) {
        prevPos = [x, y]
        x = x2
        y = y2
        console.log(x, y)
        break
      }
    }

    countPaths++
  }
  return Math.ceil(countPaths / 2)
}

const win = computeLoopLength()
console.log(win)
