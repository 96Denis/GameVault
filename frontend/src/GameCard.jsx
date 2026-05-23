import PriceLabel from "./PriceLabel.jsx";

const fallbackImage = "https://placehold.co/1200x675/111827/e5e7eb?text=GameVault";

function GameCard({ game, onEdit, onDelete }) {
  return (
    <article className="game-card">
      <div className="game-cover">
        <img
          src={game.imageUrl}
          alt={`Coperta pentru ${game.title}`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="game-card-body">
        <div className="game-card-head">
          <div>
            <p className="game-kicker">{game.publisher}</p>
            <h3>{game.title}</h3>
            <p className="game-meta">{game.releaseYear}</p>
          </div>
          <span className="genre-pill">{game.genre}</span>
        </div>

        <div className="game-info-grid">
          <div>
            <span className="field-label">Platformă</span>
            <strong>{game.platform}</strong>
          </div>
          <div>
            <span className="field-label">Preț estimat</span>
            <PriceLabel value={game.estimatedPrice} className="price-strong" />
          </div>
        </div>

        <p className="game-description">{game.description}</p>

        <div className="game-sysreq">
          <span className="field-label">Cerințe de sistem</span>
          <p>{game.systemRequirements}</p>
        </div>

        <div className="game-actions">
          <button type="button" className="btn-secondary" onClick={() => onEdit(game)}>
            Editează
          </button>
          <button type="button" className="btn-danger" onClick={() => onDelete(game)}>
            Șterge
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
