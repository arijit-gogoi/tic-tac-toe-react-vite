import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning_combinations.js";
import { useState } from "react";

const NAMES = {
  X: "Player 1",
  O: "Player 2",
};

function initialiseBoard() {
  const initialBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  return initialBoard;
}

function deriveActivePlayer(turns) {
  if (turns.length > 0 && turns[0].player === "X") {
    return "O";
  }
  return "X";
}

function deriveWinner(board, names) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const sign1 = board[combination[0].row][combination[0].column];
    const sign2 = board[combination[1].row][combination[1].column];
    const sign3 = board[combination[2].row][combination[2].column];

    if (sign1 && sign1 === sign2 && sign1 === sign3) {
      winner = names[sign1];
    }
  }
  return winner;
}

function deriveBoardState(board, turns) {
  // derive board state from turns array
  // where each turn has all that is needed.
  for (const turn of turns) {
    const { cell, player } = turn;
    const { row, col } = cell;
    board[row][col] = player;
  }
  return board;
}

function App() {
  const [turns, setTurns] = useState([]);
  const [names, setNames] = useState(NAMES);

  let board = initialiseBoard();
  board = deriveBoardState(board, turns);

  const player = deriveActivePlayer(turns);
  const winner = deriveWinner(board, names);

  const isDraw = turns.length == 9 && !winner;

  function handleNameChange(sign, newName) {
    setNames((names) => {
      return {
        ...names,
        [sign]: newName,
      };
    });
  }

  function handleClick(i, j) {
    setTurns((turn) => {
      const player = deriveActivePlayer(turns);

      const newTurns = [{ cell: { row: i, col: j }, player: player }, ...turn];
      return newTurns;
    });
  }
  function handleRematch() {
    board = initialiseBoard();
    setTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialname={NAMES.X}
            sign="X"
            isActive={player === "X"}
            handleNameChange={handleNameChange}
          />
          <Player
            initialname={NAMES.O}
            sign="O"
            isActive={player === "O"}
            handleNameChange={handleNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} handleRematch={handleRematch} />
        )}
        <GameBoard board={board} handleClick={handleClick} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
