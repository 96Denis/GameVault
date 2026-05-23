function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return String(value);
  }

  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 2,
  }).format(numberValue);
}

function PriceLabel({ value, className = "" }) {
  return <span className={`price-label ${className}`.trim()}>{formatPrice(value)}</span>;
}

export default PriceLabel;
