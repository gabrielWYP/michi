import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

import {Square} from "./componentes/Square.jsx"
import {checkWinnerFrom, checkEndGameFrom} from './utils/logic.js'
import {TURNS} from './constantes/constantes.js'
import { WinnerModal } from './componentes/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner,setWinner] = useState(null);

  
 const updateBoard = (index) => {
    //No actualizar si ya lleno
    if(board[index] || winner) return
    //Actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar turno
    const newTurn = turn  === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn);
    //Verificar si se ha ganado
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGameFrom(newBoard)) {
      setWinner(false)
    }
  } 
  
  const resetGame = () => {
     setBoard(Array(9).fill(null))
     setTurn(TURNS.X)
     setWinner(null)
  }
  

  return (
  <main className='board'>
    <h1 className ='titulo'>Michi</h1>  
    <button onClick={resetGame}>
      Reset del Juego
    </button>
    <section className='game'>
      {
        board.map((_, index) => {
          return (
           <Square
            key = {index}
            index = {index}
            updateBoard={updateBoard}
            >
            {board[index]}
            </Square>
          )
        })
      }
    </section>

    <section className='turn'>
      <Square isSelected = {turn === TURNS.X}>
         {TURNS.X} 
         </Square>
      <Square isSelected = {turn === TURNS.O}>
         {TURNS.O} 
         </Square>
         
    </section> 

      <WinnerModal resetGame={resetGame} winner = {winner}/>

  </main>
  )
}

export default App
