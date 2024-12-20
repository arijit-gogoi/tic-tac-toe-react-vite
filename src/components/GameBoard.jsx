export default function GameBoard({ handleClick, board }) {
  return (
    <ol id="game-board">
      {board.map((row, i) => (
        <li key={i}>
          <ol>
            {row.map((sign, j) => (
              <li key={j}>
                <button onClick={() => handleClick(i, j)} disabled={sign}>
                  {sign}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
