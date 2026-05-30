export default function Loading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 头部骨架 */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
        <div className="skeleton mb-2 h-8 w-48" />
        <div className="skeleton mb-4 h-5 w-80" />
        <div className="flex gap-3">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
      </section>

      {/* 三栏骨架 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="skeleton h-5 w-20" />
              <div className="skeleton h-4 w-10 rounded-full" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="skeleton h-[60px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
