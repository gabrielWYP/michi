import { WINCON} from '../constantes/constantes.js'

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINCON) {
        const [a,b,c] = combo
        if (
          boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
    }
    return null
  }

export const checkEndGameFrom = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

