import { useState } from 'react'

import './App.css'
import { WinnerModal } from './components/WinnerModal'
import { Square } from './components/Square'

import { TURNS } from './constant'

import { checkWinner, checkEndGame } from './logic/board'

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage :  TURNS.X

  })
  const [winner, setWinner] = useState(null)

 
  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  
  const updateBoard = (index) =>{

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    
   const newWinner = checkWinner(newBoard)
    
    if(newWinner) {
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }
  return (
    <main className="board">
      <h1> Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'> 
      {
        board.map((__, index) =>{
          return (
            <Square 
              key={index} 
              index= {index}
              updateBoard={updateBoard}  
            >
                 {board[index]}
            </Square>
          )

        })
      }
      </section>
      {winner}
      <section className='turn'>
        <Square isSelected={ turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={ turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
