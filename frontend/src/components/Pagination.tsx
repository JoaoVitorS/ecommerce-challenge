import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  per,
}: { page: number; totalPages: number; per: number }) {
  if (totalPages <= 1) return null;

  const mk = (p: number) => `/?page=${p}&per=${per}`;
  const pages = rangeAround(page, 1, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <PagerLink href={mk(Math.max(1, page - 1))} disabled={page === 1}>
        Anterior
      </PagerLink>

      {pages.map((p, i) =>
        p === -1 ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">…</span>
        ) : (
          <Link
            key={p}
            href={mk(p)}
            className={`rounded-md px-3 py-1.5 text-sm ${
              p === page
                ? "bg-black text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:border-black"
            }`}
          >
            {p}
          </Link>
        )
      )}

      <PagerLink href={mk(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Próxima
      </PagerLink>
    </nav>
  );
}

function PagerLink({
  href,
  disabled,
  children,
}: { href: string; disabled?: boolean; children: React.ReactNode }) {
  if (disabled)
    return (
      <span className="cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm text-gray-400">
        {children}
      </span>
    );
  return (
    <Link
      href={href}
      className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-black"
    >
      {children}
    </Link>
  );
}

function rangeAround(current: number, radius: number, total: number): number[] {
  const arr: number[] = [];
  let start = Math.max(1, current - radius);
  let end = Math.min(total, current + radius);
  if (start > 1) arr.push(1, -1);
  for (let p = start; p <= end; p++) arr.push(p);
  if (end < total) arr.push(-1, total);
  return arr;
}
