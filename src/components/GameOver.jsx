export default function GameOver({ winner, handleRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won.</p>}
      {!winner && <p>Draw.</p>}
      <p>
        <button onClick={handleRematch}>REMATCH?</button>
      </p>
    </div>
  );
}
