import { useEffect, useMemo, useState } from "react";

const currentYear = new Date().getFullYear();

const normalize = (values = {}) => ({
  title: values.title ?? "",
  publisher: values.publisher ?? "",
  releaseYear: values.releaseYear ?? "",
  platform: values.platform ?? "",
  genre: values.genre ?? "",
  estimatedPrice: values.estimatedPrice ?? "",
  description: values.description ?? "",
  imageUrl: values.imageUrl ?? "",
  systemRequirements: values.systemRequirements ?? "",
});

const isValidHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

function GameForm({ initialValues, submitLabel, onSubmit, onSuccess, onCancel }) {
  const normalizedInitial = normalize(initialValues);
  const initialSignature = JSON.stringify(normalizedInitial);
  const initial = useMemo(() => normalizedInitial, [initialSignature]);
  const [title, setTitle] = useState(initial.title);
  const [publisher, setPublisher] = useState(initial.publisher);
  const [releaseYear, setReleaseYear] = useState(initial.releaseYear);
  const [platform, setPlatform] = useState(initial.platform);
  const [genre, setGenre] = useState(initial.genre);
  const [estimatedPrice, setEstimatedPrice] = useState(initial.estimatedPrice);
  const [description, setDescription] = useState(initial.description);
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [systemRequirements, setSystemRequirements] = useState(initial.systemRequirements);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initial.title);
    setPublisher(initial.publisher);
    setReleaseYear(initial.releaseYear);
    setPlatform(initial.platform);
    setGenre(initial.genre);
    setEstimatedPrice(initial.estimatedPrice);
    setDescription(initial.description);
    setImageUrl(initial.imageUrl);
    setSystemRequirements(initial.systemRequirements);
    setErrors({});
    setSubmitError(null);
  }, [initial]);

  const validate = () => {
    const nextErrors = {};
    const parsedYear = Number(releaseYear);
    const parsedPrice = Number(estimatedPrice);

    if (!title.trim()) {
      nextErrors.title = "Titlul este obligatoriu.";
    }
    if (!publisher.trim()) {
      nextErrors.publisher = "Publisher-ul este obligatoriu.";
    }
    if (!Number.isInteger(parsedYear) || parsedYear < 1970 || parsedYear > currentYear + 1) {
      nextErrors.releaseYear = "Anul lansării trebuie să fie realist.";
    }
    if (!platform.trim()) {
      nextErrors.platform = "Platforma este obligatorie.";
    }
    if (!genre.trim()) {
      nextErrors.genre = "Genul este obligatoriu.";
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      nextErrors.estimatedPrice = "Prețul estimat trebuie să fie pozitiv.";
    }
    if (!description.trim()) {
      nextErrors.description = "Descrierea este obligatorie.";
    }
    if (!imageUrl.trim() || !isValidHttpUrl(imageUrl.trim())) {
      nextErrors.imageUrl = "Introdu un URL valid pentru imagine.";
    }
    if (!systemRequirements.trim()) {
      nextErrors.systemRequirements = "Cerințele de sistem sunt obligatorii.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        publisher: publisher.trim(),
        releaseYear: Number(releaseYear),
        platform: platform.trim(),
        genre: genre.trim(),
        estimatedPrice: Number(estimatedPrice),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        systemRequirements: systemRequirements.trim(),
      };
      const result = await onSubmit(payload);
      onSuccess(result);
    } catch (error) {
      setSubmitError(error?.response?.data?.error || error?.response?.data?.message || error.message || "A apărut o eroare la salvare.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      {submitError ? <p className="status status-error">{submitError}</p> : null}

      <div className="form-grid">
        <label className="field">
          <span>Titlu</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
          {errors.title ? <small className="field-error">{errors.title}</small> : null}
        </label>

        <label className="field">
          <span>Publisher</span>
          <input value={publisher} onChange={(event) => setPublisher(event.target.value)} />
          {errors.publisher ? <small className="field-error">{errors.publisher}</small> : null}
        </label>

        <label className="field">
          <span>An lansare</span>
          <input
            type="number"
            min="1970"
            max={currentYear + 1}
            step="1"
            value={releaseYear}
            onChange={(event) => setReleaseYear(event.target.value)}
          />
          {errors.releaseYear ? <small className="field-error">{errors.releaseYear}</small> : null}
        </label>

        <label className="field">
          <span>Platformă</span>
          <input value={platform} onChange={(event) => setPlatform(event.target.value)} />
          {errors.platform ? <small className="field-error">{errors.platform}</small> : null}
        </label>

        <label className="field">
          <span>Gen</span>
          <input value={genre} onChange={(event) => setGenre(event.target.value)} />
          {errors.genre ? <small className="field-error">{errors.genre}</small> : null}
        </label>

        <label className="field">
          <span>Preț estimat</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={estimatedPrice}
            onChange={(event) => setEstimatedPrice(event.target.value)}
          />
          {errors.estimatedPrice ? <small className="field-error">{errors.estimatedPrice}</small> : null}
        </label>
      </div>

      <label className="field">
        <span>URL imagine</span>
        <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
        {errors.imageUrl ? <small className="field-error">{errors.imageUrl}</small> : null}
      </label>

      <div className="image-preview">
        <img
          src={isValidHttpUrl(imageUrl.trim()) ? imageUrl.trim() : "https://placehold.co/600x900/111827/e5e7eb?text=GameVault"}
          alt=""
          aria-hidden="true"
          onError={(event) => {
            event.currentTarget.src = "https://placehold.co/600x900/111827/e5e7eb?text=GameVault";
          }}
        />
      </div>

      <label className="field">
        <span>Descriere</span>
        <textarea
          rows="4"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {errors.description ? <small className="field-error">{errors.description}</small> : null}
      </label>

      <label className="field">
        <span>Cerințe de sistem</span>
        <textarea
          rows="4"
          value={systemRequirements}
          onChange={(event) => setSystemRequirements(event.target.value)}
        />
        {errors.systemRequirements ? (
          <small className="field-error">{errors.systemRequirements}</small>
        ) : null}
      </label>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel} disabled={submitting}>
          Anulează
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Se salvează..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default GameForm;
