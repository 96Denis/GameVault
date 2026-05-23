import GameForm from "./GameForm.jsx";
import { gameApi } from "./api/gameApi";

function EditGameForm({ game, onSuccess, onCancel }) {
  return (
    <div className="form-panel">
      <h2>Editare joc</h2>
      <GameForm
        initialValues={{
          title: game?.title ?? "",
          publisher: game?.publisher ?? "",
          releaseYear: game?.releaseYear ?? "",
          platform: game?.platform ?? "",
          genre: game?.genre ?? "",
          estimatedPrice: game?.estimatedPrice ?? "",
          description: game?.description ?? "",
          imageUrl: game?.imageUrl ?? "",
          systemRequirements: game?.systemRequirements ?? "",
        }}
        submitLabel="Salvează modificările"
        onSubmit={(payload) => gameApi.update(game.id, payload)}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </div>
  );
}

export default EditGameForm;
