export default function DealsLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton h-10 w-10 rounded-xl" />
          <div>
            <div className="skeleton mb-1 h-5 w-24" />
            <div className="skeleton h-4 w-40" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
        <div className="space-y-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-[var(--border)] px-4 py-3">
              <div className="skeleton h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
