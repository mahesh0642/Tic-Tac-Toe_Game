import { useState } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let line of lines) {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(board)
  const isBoardFull = board.every(square => square !== null)
  const isDraw = isBoardFull && !winner

  const handleClick = (index) => {
    if (board[index] || winner || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner || isBoardFull) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
  }

  const renderSquare = (index) => (
    <button
      className="square"
      onClick={() => handleClick(index)}
      data-symbol={isXNext ? 'X' : 'O'}
    >
      {board[index]}
    </button>
  )

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      <div className="status">
        {winner ? (
          <div className="winner-message">🎉 Player {winner} Wins! 🎉</div>
        ) : isDraw ? (
          <div className="draw-message">It's a Draw!</div>
        ) : (
          <div className="current-turn">Current Turn: <span className={`player ${isXNext ? 'x' : 'o'}`}>{isXNext ? 'X' : 'O'}</span></div>
        )}
      </div>

      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  )
}

export default App
