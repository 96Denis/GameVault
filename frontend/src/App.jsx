import { useEffect, useState } from "react";
import CreateGameForm from "./CreateGameForm.jsx";
import EditGameForm from "./EditGameForm.jsx";
import GamesList from "./GamesList.jsx";
import Toast from "./Toast.jsx";
import "./App.css";

function App() {
  const [mode, setMode] = useState("list");
  const [editGame, setEditGame] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (nextToast) => {
    setToast(nextToast);
  };

  const handleCreateClick = () => {
    setEditGame(null);
    setMode("create");
  };

  const handleEdit = (game) => {
    setEditGame(game);
    setMode("edit");
  };

  const handleFormSuccess = (message) => {
    setMode("list");
    setEditGame(null);
    setRefreshKey((current) => current + 1);
    showToast({ type: "success", message });
  };

  const handleFormCancel = () => {
    setMode("list");
    setEditGame(null);
  };

  return (
    <div className="app-shell">
      {toast ? <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} /> : null}

      <header className="app-header">
        <div className="hero-panel">
          <p className="app-eyebrow">GameVault</p>
          <h1>Bibliotecă de jocuri</h1>
          <p className="app-subtitle">
            Un catalog curat pentru gestionarea jocurilor, cu imagini prin URL, preț estimat, genuri și cerințe de sistem.
          </p>
        </div>

        <div className="control-panel">
          <div className="control-grid">
            <input
              className="search"
              placeholder="Caută titlu sau publisher..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="search compact-control"
              value={genreFilter}
              onChange={(event) => setGenreFilter(event.target.value)}
            >
              <option value="all">Toate genurile</option>
              <option value="Action RPG">Action RPG</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Simulation">Simulation</option>
              <option value="Strategy">Strategy</option>
              <option value="Racing">Racing</option>
              <option value="Sports">Sports</option>
            </select>
            <input
              className="search compact-control"
              type="number"
              min="0"
              step="1"
              placeholder="Preț max"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
            <select className="search compact-control" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="title">Titlu A-Z</option>
              <option value="price-asc">Preț crescător</option>
              <option value="price-desc">Preț descrescător</option>
              <option value="genre">Gen A-Z</option>
              <option value="year-desc">An descrescător</option>
            </select>
          </div>

          <button type="button" className="btn-primary primary-action" onClick={handleCreateClick}>
            Adaugă joc
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="panel panel-list">
          <GamesList
            search={search}
            genreFilter={genreFilter}
            maxPrice={maxPrice}
            sortBy={sortBy}
            refreshKey={refreshKey}
            onEdit={handleEdit}
            onNotify={showToast}
          />
        </section>

        <aside className="panel panel-detail">
          {mode === "create" ? (
            <CreateGameForm
              key="create"
              onSuccess={() => handleFormSuccess("Jocul a fost creat cu succes.")}
              onCancel={handleFormCancel}
            />
          ) : null}

          {mode === "edit" && editGame ? (
            <EditGameForm
              key={editGame.id}
              game={editGame}
              onSuccess={() => handleFormSuccess("Jocul a fost actualizat cu succes.")}
              onCancel={handleFormCancel}
            />
          ) : null}

          {mode === "list" ? (
            <div className="empty-state">
              <h2>Acțiuni rapide</h2>
              <p className="empty">Folosește butonul de adăugare sau editează un joc direct din listă.</p>
            </div>
          ) : null}
        </aside>
      </main>
    </div>
  );
}

export default App;
