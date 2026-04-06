"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handle = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        onClick={() => handle(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Prev
      </button>

      <div className="pagination__pages">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e-${i}`} className="pagination__ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`pagination__page${currentPage === p ? " pagination__page--active" : ""}`}
              onClick={() => handle(p as number)}
              aria-label={`Page ${p}`}
              aria-current={currentPage === p ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        className="pagination__btn"
        onClick={() => handle(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
