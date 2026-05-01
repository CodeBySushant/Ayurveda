import { useState, useMemo, useCallback } from "react";

// ─────────────────────────────────────────────
// CONFIG — swap API_URL with the real endpoint
// ─────────────────────────────────────────────
const API_URL = "/api/jeshtha-nagarik-seva"; // TODO: replace with real URL
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ─────────────────────────────────────────────
// Static sample data for UI preview
// Remove / replace once connected to backend
// ─────────────────────────────────────────────
const SAMPLE_DATA = [
  // Uncomment and fill to test UI:
  // {
  //   id: 1,
  //   mulDartaNumber: "001-2083",
  //   sewaDartaNumber: "S-001",
  //   sewaDartaDate: "18/01/2083",
  //   fullName: "राम बहादुर श्रेष्ठ",
  //   caste: "क्षेत्री",
  //   age: "72",
  //   gender: "पुरुष",
  //   district: "काठमाडौं",
  //   wardNumber: "05",
  //   municipality: "काठमाडौं महानगरपालिका",
  //   tol: "बानेश्वर",
  //   contact: "9841000000",
  //   referredBy: "स्वास्थ्य चौकी",
  // },
];

// ─────────────────────────────────────────────
// Utility: build page number array with ellipsis
// ─────────────────────────────────────────────
function buildPageRange(current, total) {
  const pages = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return pages;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ActionButtons({ row, onEdit, onView }) {
  return (
    <div style={s.actionCell}>
      <button
        style={s.btnEdit}
        title="सम्पादन गर्नुहोस्"
        onClick={() => onEdit && onEdit(row)}
        aria-label="Edit"
      >
        ✏️
      </button>
      <button
        style={s.btnView}
        title="हेर्नुहोस्"
        onClick={() => onView && onView(row)}
        aria-label="View"
      >
        👁️
      </button>
    </div>
  );
}

function TableHeader() {
  return (
    <thead>
      {/* Row 1 */}
      <tr>
        <th style={{ ...s.th, ...s.thSticky }} rowSpan={2}>कार्य</th>
        <th style={s.th} rowSpan={2}>क्र.सं.</th>
        <th style={s.th} rowSpan={2}>मुल दर्ता नम्बर</th>
        <th style={s.th} rowSpan={1}>
          <div style={s.thTop}>सेवा दर्ता नम्बर</div>
        </th>
        <th style={s.th} rowSpan={2}>सेवाग्राहीको पुरा नाम</th>
        <th style={s.th} rowSpan={2}>जाती</th>
        <th style={s.th} rowSpan={2}>उमेर</th>
        <th style={s.th} rowSpan={2}>लिङ्ग</th>
        {/* ठेगाना spans 2 sub-columns */}
        <th style={{ ...s.th, ...s.thGroup }} colSpan={2}>ठेगाना</th>
        <th style={s.th} rowSpan={1}>
          <div style={s.thTop}>सम्पर्क नम्बर</div>
        </th>
      </tr>
      {/* Row 2 */}
      <tr>
        {/* सेवा दर्ता मिति */}
        <th style={s.th}>
          <div style={s.thSub}>मिति</div>
        </th>
        {/* जिल्ला / वडा नम्बर */}
        <th style={s.th}>
          <div style={s.thTop}>जिल्ला</div>
          <div style={s.thSub}>वडा नम्बर</div>
        </th>
        {/* गाउँ / नगरपालिका / टोल */}
        <th style={s.th}>
          <div style={s.thTop}>गाउँ / नगरपालिका</div>
          <div style={s.thSub}>टोल</div>
        </th>
        {/* प्रेषण भई आएको संस्था */}
        <th style={s.th}>
          <div style={s.thSub}>प्रेषण भई आएको संस्था</div>
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ row, index }) {
  return (
    <tr style={index % 2 === 0 ? s.trEven : s.trOdd}>
      <td style={{ ...s.td, ...s.tdSticky }}>
        <ActionButtons row={row} />
      </td>
      <td style={s.td}>{row.sn}</td>
      <td style={s.td}>{row.mulDartaNumber}</td>
      <td style={s.td}>
        <div>{row.sewaDartaNumber}</div>
        <div style={s.subText}>{row.sewaDartaDate}</div>
      </td>
      <td style={{ ...s.td, ...s.tdName }}>{row.fullName}</td>
      <td style={s.td}>{row.caste}</td>
      <td style={s.td}>{row.age}</td>
      <td style={s.td}>{row.gender}</td>
      <td style={s.td}>
        <div>{row.district}</div>
        <div style={s.subText}>{row.wardNumber}</div>
      </td>
      <td style={s.td}>
        <div>{row.municipality}</div>
        <div style={s.subText}>{row.tol}</div>
      </td>
      <td style={s.td}>
        <div>{row.contact}</div>
        <div style={s.subText}>{row.referredBy}</div>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function JesthaNagarikSeva() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMul, setSearchMul] = useState("");
  const [searchDate, setSearchDate] = useState("18/01/2083");
  // `data` would normally come from an API call / prop.
  // Replace SAMPLE_DATA with your fetched state.
  const [data] = useState(SAMPLE_DATA);
  const [loading] = useState(false); // set true while fetching

  // ── Client-side filtering (replace with server-side if data is large) ──
  const filtered = useMemo(() => {
    return data.filter((row) => {
      const mulMatch = searchMul.trim()
        ? row.mulDartaNumber?.toLowerCase().includes(searchMul.trim().toLowerCase())
        : true;
      const dateMatch = searchDate.trim()
        ? row.sewaDartaDate?.includes(searchDate.trim()) ||
          row.mulDartaDate?.includes(searchDate.trim())
        : true;
      return mulMatch && dateMatch;
    });
  }, [data, searchMul, searchDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Guard current page if filter shrinks results
  const safePage = Math.min(currentPage, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize).map((row, i) => ({
      ...row,
      sn: (safePage - 1) * pageSize + i + 1,
    }));
  }, [filtered, safePage, pageSize]);

  const handlePageSizeChange = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const handleSearchMulChange = useCallback((e) => {
    setSearchMul(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSearchDateChange = useCallback((e) => {
    setSearchDate(e.target.value);
    setCurrentPage(1);
  }, []);

  const showingFrom = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = Math.min(safePage * pageSize, filtered.length);
  const pageRange = buildPageRange(safePage, totalPages);

  return (
    <div style={s.page}>
      {/* ── Page Header ── */}
      <header style={s.pageHeader}>
        <h1 style={s.pageTitle}>जेष्ठ नागरिक सेवा दैनिक सूची</h1>
        <nav aria-label="breadcrumb" style={s.breadcrumb}>
          <a href="#" style={s.breadcrumbLink}>गृहपृष्ठ</a>
          <span style={s.breadcrumbSep} aria-hidden="true">/</span>
          <span style={s.breadcrumbCurrent}>जेष्ठ नागरिक सेवा दैनिक सूची</span>
        </nav>
      </header>

      {/* ── Card ── */}
      <main style={s.card}>
        {/* Controls */}
        <div style={s.controls}>
          {/* Left: Show N entries */}
          <div style={s.showEntries}>
            <label htmlFor="pageSizeSelect" style={s.controlLabel}>Show</label>
            <select
              id="pageSizeSelect"
              style={s.select}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span style={s.controlLabel}>entries</span>
          </div>

          {/* Right: Search */}
          <div style={s.searchRow}>
            <input
              style={s.searchInput}
              type="text"
              placeholder="मूल दर्ता नम्बर"
              value={searchMul}
              onChange={handleSearchMulChange}
              aria-label="मूल दर्ता नम्बर खोज्नुहोस्"
            />
            <input
              style={s.searchInput}
              type="text"
              placeholder="मिति (DD/MM/YYYY)"
              value={searchDate}
              onChange={handleSearchDateChange}
              aria-label="मिति खोज्नुहोस्"
            />
            <button
              style={s.searchBtn}
              title="खोज्नुहोस्"
              aria-label="खोज्नुहोस्"
              onClick={() => setCurrentPage(1)}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={s.tableWrapper} role="region" aria-label="जेष्ठ नागरिक सेवा सूची">
          <table style={s.table} aria-live="polite">
            <TableHeader />
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} style={s.noData}>
                    <span style={s.loadingDot}>Loading…</span>
                  </td>
                </tr>
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={11} style={s.noData}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <TableRow key={row.id ?? i} row={row} index={i} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Divider */}
        <div style={s.divider} />

        {/* Pagination */}
        <div style={s.pagination}>
          <span style={s.pageInfo} aria-live="polite">
            Showing {showingFrom} to {showingTo} of {filtered.length} entries
          </span>

          <div style={s.pageButtons} role="navigation" aria-label="Pagination">
            <button
              style={{
                ...s.pageBtn,
                ...(safePage === 1 ? s.pageBtnDisabled : {}),
              }}
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>

            {pageRange.map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} style={s.ellipsis}>…</span>
              ) : (
                <button
                  key={p}
                  style={{
                    ...s.pageBtn,
                    ...(p === safePage ? s.pageBtnActive : {}),
                  }}
                  onClick={() => setCurrentPage(p)}
                  aria-current={p === safePage ? "page" : undefined}
                >
                  {p}
                </button>
              )
            )}

            <button
              style={{
                ...s.pageBtn,
                ...(safePage === totalPages ? s.pageBtnDisabled : {}),
              }}
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const s = {
  page: {
    fontFamily: "'Noto Sans Devanagari', 'Mukta', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
  },

  /* Header */
  pageHeader: {
    background: "#e8eaf0",
    borderBottom: "1px solid #d0d4de",
    padding: "11px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    color: "#2d3748",
    letterSpacing: "0.01em",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "13px",
  },
  breadcrumbLink: {
    color: "#4a6cf7",
    textDecoration: "none",
    fontWeight: "500",
  },
  breadcrumbSep: { color: "#a0aec0" },
  breadcrumbCurrent: { color: "#718096" },

  /* Card */
  card: {
    background: "#fff",
    margin: "20px 24px",
    borderRadius: "8px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.09)",
    overflow: "hidden",
  },

  /* Controls */
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 16px",
    borderBottom: "1px solid #edf2f7",
    flexWrap: "wrap",
    gap: "10px",
  },
  showEntries: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  controlLabel: { fontSize: "13px", color: "#4a5568" },
  select: {
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    padding: "4px 6px",
    fontSize: "13px",
    color: "#2d3748",
    background: "#fff",
    cursor: "pointer",
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    flexWrap: "wrap",
  },
  searchInput: {
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    padding: "6px 10px",
    fontSize: "13px",
    color: "#2d3748",
    outline: "none",
    width: "158px",
    fontFamily: "inherit",
  },
  searchBtn: {
    background: "#4a6cf7",
    border: "none",
    borderRadius: "4px",
    padding: "7px 11px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* Table */
  tableWrapper: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    tableLayout: "auto",
  },

  /* TH */
  th: {
    background: "#eef1f8",
    color: "#3a4a6b",
    fontWeight: "700",
    padding: "8px 10px",
    textAlign: "center",
    border: "1px solid #d8dff0",
    fontSize: "12.5px",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  thSticky: {
    position: "sticky",
    left: 0,
    zIndex: 2,
    background: "#eef1f8",
  },
  thGroup: {
    background: "#e4e9f5",
  },
  thTop: {
    fontWeight: "700",
    color: "#3a4a6b",
  },
  thSub: {
    fontSize: "11.5px",
    color: "#6b7fa8",
    fontWeight: "500",
    marginTop: "2px",
  },

  /* TD */
  td: {
    padding: "8px 10px",
    border: "1px solid #edf2f7",
    color: "#2d3748",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "13px",
  },
  tdSticky: {
    position: "sticky",
    left: 0,
    background: "inherit",
    zIndex: 1,
  },
  tdName: {
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  subText: {
    fontSize: "11px",
    color: "#718096",
    marginTop: "2px",
  },

  /* Row colors */
  trEven: { background: "#fff" },
  trOdd: { background: "#f7f9fc" },

  /* Empty / loading */
  noData: {
    textAlign: "center",
    padding: "30px",
    color: "#a0aec0",
    fontSize: "14px",
    background: "#fafbfc",
  },
  loadingDot: { color: "#4a6cf7" },

  /* Action buttons */
  actionCell: {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
  },
  btnEdit: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "2px 3px",
    borderRadius: "3px",
    lineHeight: 1,
  },
  btnView: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "2px 3px",
    borderRadius: "3px",
    lineHeight: 1,
  },

  /* Divider */
  divider: {
    height: "3px",
    background: "linear-gradient(to right, #4a6cf7 60%, #c0caff)",
    opacity: 0.35,
  },

  /* Pagination */
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "11px 16px",
    flexWrap: "wrap",
    gap: "10px",
  },
  pageInfo: { fontSize: "13px", color: "#718096" },
  pageButtons: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  pageBtn: {
    border: "1px solid #cbd5e0",
    background: "#fff",
    color: "#4a5568",
    borderRadius: "4px",
    padding: "5px 11px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.12s, color 0.12s",
  },
  pageBtnActive: {
    background: "#4a6cf7",
    color: "#fff",
    borderColor: "#4a6cf7",
    fontWeight: "600",
  },
  pageBtnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  ellipsis: {
    padding: "5px 3px",
    color: "#a0aec0",
    fontSize: "13px",
    userSelect: "none",
  },
};