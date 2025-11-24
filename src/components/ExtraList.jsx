// src/components/ExtrasList.jsx

// Reuse the same badge styling you already use
const Badge = ({ label }) => {
  const map = {
    V: "bg-amber-100 text-amber-800 border-amber-200",
    VG: "bg-green-100 text-green-800 border-green-200",
    GF: "bg-teal-100 text-teal-800 border-teal-200",
  };
  const cls = map[label] || "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}
    >
      {label}
    </span>
  );
};

export default function ExtrasList({
  title = "Add Extras",
  subtitle = "",
  items = [],
  className = "",
}) {
  if (!items?.length) return null;

  return (
    <div className={`col-span-full ${className}`}>
      <h3 className="text-base font-semibold text-[var(--color-brand-teal,#007ba7)]">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-0.5 text-[13px] text-black/60">{subtitle}</p>
      )}

      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((ex) => (
          <li
            key={`${title}-${ex.name}`}
            className="flex items-center justify-between rounded-xl border border-black/10 bg-white p-3"
          >
            {/* Name + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-[var(--color-brand-ink,#000)]">
                {ex.name}
              </span>
              {Array.isArray(ex.badges) &&
                ex.badges.map((b) => <Badge key={b} label={b} />)}
            </div>

            {/* Price */}
            <span className="text-sm text-black/70">{ex.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
