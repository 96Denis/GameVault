import GameForm from "./GameForm.jsx";
import { gameApi } from "./api/gameApi";

function CreateGameForm({ onSuccess, onCancel }) {
  return (
    <div className="form-panel">
      <h2>Adăugare joc</h2>
      <GameForm
        initialValues={{
          title: "",
          publisher: "",
          releaseYear: "",
          platform: "",
          genre: "",
          estimatedPrice: "",
          description: "",
          imageUrl: "",
          systemRequirements: "",
        }}
        submitLabel="Creează joc"
        onSubmit={(payload) => gameApi.create(payload)}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </div>
  );
}

export default CreateGameForm;
