import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gameApi } from "./api/gameApi";
import ConfirmModal from "./ConfirmModal.jsx";
import GameCard from "./GameCard.jsx";
import PriceLabel from "./PriceLabel.jsx";

const sortGames = (games, sortBy) => {
  const copy = [...games];

  switch (sortBy) {
    case "price-asc":
      return copy.sort((left, right) => Number(left.estimatedPrice) - Number(right.estimatedPrice));
    case "price-desc":
      return copy.sort((left, right) => Number(right.estimatedPrice) - Number(left.estimatedPrice));
    case "genre":
      return copy.sort((left, right) => left.genre.localeCompare(right.genre));
    case "year-desc":
      return copy.sort((left, right) => right.releaseYear - left.releaseYear);
    case "title":
    default:
      return copy.sort((left, right) => left.title.localeCompare(right.title));
  }
};

function GamesList({
  search = "",
  genreFilter = "all",
  maxPrice = "",
  sortBy = "title",
  refreshKey = 0,
  onEdit,
  onNotify,
}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const abortRef = useRef(null);
  const snapshotRef = useRef([]);

  const loadGames = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    gameApi
      .getAll({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) {
          setGames(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(loadGames, 0);
    return () => {
      window.clearTimeout(timer);
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [loadGames, refreshKey]);

  const availableGenres = useMemo(
    () =>
      Array.from(new Set(games.map((game) => game.genre).filter(Boolean))).sort((left, right) =>
        left.localeCompare(right),
      ),
    [games],
  );

  const visibleGames = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();
    const parsedMaxPrice = Number(maxPrice);
    const base = games.filter((game) => {
      const matchesSearch =
        !lowerSearch ||
        game.title.toLowerCase().includes(lowerSearch) ||
        game.publisher.toLowerCase().includes(lowerSearch);
      const matchesGenre = genreFilter === "all" || game.genre === genreFilter;
      const matchesPrice =
        !Number.isFinite(parsedMaxPrice) || parsedMaxPrice <= 0 || Number(game.estimatedPrice) <= parsedMaxPrice;
      return matchesSearch && matchesGenre && matchesPrice;
    });

    return sortGames(base, sortBy);
  }, [games, genreFilter, maxPrice, search, sortBy]);

  const totalEstimatedValue = useMemo(
    () => visibleGames.reduce((sum, game) => sum + Number(game.estimatedPrice || 0), 0),
    [visibleGames],
  );

  const handleDeleteRequest = (game) => {
    setDeleteTarget(game);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    const gameToDelete = deleteTarget;
    snapshotRef.current = games;
    setDeleteTarget(null);
    setGames((current) => current.filter((game) => game.id !== gameToDelete.id));

    try {
      await gameApi.remove(gameToDelete.id);
      onNotify?.({
        type: "success",
        message: `Jocul "${gameToDelete.title}" a fost șters.`,
      });
    } catch (error) {
      setGames(snapshotRef.current);
      onNotify?.({
        type: "error",
        message:
          error?.response?.data?.error || error?.response?.data?.message || error.message || "Ștergerea a eșuat.",
      });
    }
  };

  if (loading) {
    return <p className="status">Se încarcă jocurile...</p>;
  }

  if (error) {
    return (
      <div className="status-block">
        <p className="status status-error">Eroare: {error.message}</p>
        <button className="btn-reload" onClick={loadGames}>
          Reîncarcă lista
        </button>
      </div>
    );
  }

  return (
    <div className="games-shell">
      <div className="list-toolbar">
        <div>
          <h2>Jocuri</h2>
          <p className="list-meta">
            {visibleGames.length} din {games.length} afișate
          </p>
        </div>
        <button className="btn-reload" onClick={loadGames}>
          Reîncarcă lista
        </button>
      </div>

      <div className="filters-bar">
        <div className="filter-summary">
          <span className="field-label">Căutare</span>
          <strong>{search.trim() || "Nicio căutare"}</strong>
        </div>
        <div className="filter-summary">
          <span className="field-label">Gen</span>
          <strong>{genreFilter === "all" ? "Toate" : genreFilter}</strong>
        </div>
        <div className="filter-summary">
          <span className="field-label">Preț max</span>
          <strong>{maxPrice || "Orice"}</strong>
        </div>
        <div className="filter-summary">
          <span className="field-label">Sortare</span>
          <strong>
            {{
              title: "Titlu A-Z",
              "price-asc": "Preț crescător",
              "price-desc": "Preț descrescător",
              genre: "Gen A-Z",
              "year-desc": "An descrescător",
            }[sortBy] || "Titlu A-Z"}
          </strong>
        </div>
      </div>

      <div className="collection-summary">
        <div>
          <span className="field-label">Total vizibile</span>
          <strong>{visibleGames.length}</strong>
        </div>
        <div>
          <span className="field-label">Preț total estimat</span>
          <PriceLabel value={totalEstimatedValue} className="price-strong" />
        </div>
        <div>
          <span className="field-label">Genuri</span>
          <strong>{availableGenres.length}</strong>
        </div>
      </div>

      {visibleGames.length === 0 ? (
        <p className="status">Nu există jocuri pentru filtrul curent.</p>
      ) : (
        <div className="game-list">
          {visibleGames.map((game) => (
            <GameCard key={game.id} game={game} onEdit={onEdit} onDelete={handleDeleteRequest} />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        message={
          deleteTarget
            ? `Sigur vrei să ștergi jocul "${deleteTarget.title}"? Această acțiune nu poate fi anulată.`
            : ""
        }
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default GamesList;
