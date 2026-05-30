export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-xl" />
        <div>
          <div className="skeleton mb-1 h-5 w-16" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="skeleton mb-3 h-4 w-24" />
          <div className="skeleton mb-2 h-4 w-full" />
          <div className="skeleton h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
