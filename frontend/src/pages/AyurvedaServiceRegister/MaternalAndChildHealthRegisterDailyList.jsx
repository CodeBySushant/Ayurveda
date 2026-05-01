import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// DATA SHAPE  (match your API response to this)
// ─────────────────────────────────────────────
// {
//   id          : number,
//   mulDartaNo  : string,   // मुल दर्ता नम्बर
//   sewaDartaNo : string,   // सेवा दर्ता नम्बर
//   miti        : string,   // मिति
//   fullName    : string,   // सेवाग्राहीको पूरा नाम
//   jaati       : string,   // जाती
//   aamaUmer    : string,   // आमाको उमेर
//   sishuUmer   : string,   // शिशुको उमेर
//   linga       : string,   // लिङ्ग
//   jilla       : string,   // जिल्ला
//   wadaNo      : string,   // वडा नम्बर
//   gaauNagar   : string,   // गाउँ / नगरपालिका
//   tol         : string,   // टोल
//   sampark     : string,   // सम्पर्क नम्बर
//   preson      : string,   // प्रेषण भई आएको संस्था
// }

// ─────────────────────────────────────────────
// DATA HOOK  –  replace mock with real API call
// ─────────────────────────────────────────────
function useTableData({ searchQuery, pageSize, currentPage }) {
  const [rows, setRows]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // ── REPLACE THIS BLOCK with your real fetch ─────────────────────────
    // fetch(`/api/stanpayi?q=${searchQuery}&page=${currentPage}&size=${pageSize}`)
    //   .then(r => r.json())
    //   .then(data => { setRows(data.rows); setTotal(data.total); })
    //   .catch(setError)
    //   .finally(() => setLoading(false));
    // ────────────────────────────────────────────────────────────────────

    setTimeout(() => {
      setRows([]);
      setTotal(0);
      setLoading(false);
    }, 300);
  }, [searchQuery, pageSize, currentPage]);

  return { rows, total, loading, error };
}

// ─────────────────────────────────────────────
// BREADCRUMB
// ─────────────────────────────────────────────
function Breadcrumb({ onHome }) {
  return (
    <div style={s.breadcrumbBar}>
      <span style={s.pageTitle}>स्तनपायी आमा तथा शिशु सेवा दैनिक सूची</span>
      <span style={{ flex: 1 }} />
      <span style={s.breadcrumbLink} onClick={onHome}>गृहपृष्ठ</span>
      <span style={s.breadcrumbSep}>/</span>
      <span>स्तनपायी आमा तथा शिशु सेवा दैनिक सूची</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// TOP CONTROLS
// ─────────────────────────────────────────────
function TopControls({ pageSize, onPageSizeChange, searchInput, onSearchInputChange, onSearch }) {
  return (
    <div style={s.topControls}>
      <div style={s.showEntries}>
        <span>Show</span>
        <select
          value={pageSize}
          onChange={e => onPageSizeChange(Number(e.target.value))}
          style={s.select}
        >
          {[10, 25, 50, 100].map(n => <option key={n}>{n}</option>)}
        </select>
        <span>entries</span>
      </div>

      <div style={s.searchBox}>
        <input
          type="text"
          placeholder="मूल दर्ता नम्बर"
          value={searchInput}
          onChange={e => onSearchInputChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSearch()}
          style={s.searchInput}
        />
        <button onClick={onSearch} style={s.searchBtn} title="खोज्नुहोस्">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TABLE HEADER
//
// Matches the screenshot layout exactly:
//
// ROW 1: कार्य(r2) | क्र.सं.(r2) | मुल दर्ता नम्बर(r2) | सेवा दर्ता नम्बर | सेवाग्राहीको पूरा नाम(r2) | जाती(r2) | उमेर(c2) | लिङ्ग(r2) | ठेगाना(c4) | सम्पर्क नम्बर(r2)
// ROW 2:                                                    मिति              |                            |          | आमाको | शिशुको |        | जिल्ला | वडा नम्बर | गाउँ/नगरपालिका | टोल | प्रेषण भई आएको संस्था
// ─────────────────────────────────────────────
function TableHeader() {
  return (
    <thead>
      {/* ── ROW 1 ── */}
      <tr>
        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 80 }}>कार्य</th>
        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 44 }}>क्र.सं.</th>
        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 110 }}>मुल दर्ता नम्बर</th>

        {/* Top label; मिति goes below in row 2 */}
        <th style={{ ...s.th, minWidth: 110 }}>सेवा दर्ता नम्बर</th>

        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 150 }}>
          सेवाग्राहीको पूरा नाम
        </th>
        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 70 }}>जाती</th>

        {/* उमेर group — 2 sub-columns */}
        <th colSpan={2} style={{ ...s.th, minWidth: 160 }}>उमेर</th>

        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 55 }}>लिङ्ग</th>

        {/* ठेगाना group — 4 sub-columns */}
        <th colSpan={4} style={{ ...s.th }}>ठेगाना</th>

        {/* सम्पर्क नम्बर — row 1 label only (row-span 1);
            प्रेषण भई आएको संस्था is a NEW column that only appears in row 2 */}
        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 120 }}>
          सम्पर्क नम्बर
        </th>

        {/* प्रेषण भई आएको संस्था — only in row 2 visually, but
            placing a rowSpan=2 header here keeps columns aligned */}
        <th rowSpan={2} style={{ ...s.th, verticalAlign: "middle", minWidth: 160 }}>
          प्रेषण भई आएको संस्था
        </th>
      </tr>

      {/* ── ROW 2 ── */}
      <tr>
        {/* under सेवा दर्ता नम्बर */}
        <th style={s.th}>मिति</th>

        {/* under उमेर */}
        <th style={s.th}>आमाको उमेर</th>
        <th style={s.th}>शिशुको उमेर</th>

        {/* under ठेगाना */}
        <th style={s.th}>जिल्ला</th>
        <th style={s.th}>वडा नम्बर</th>
        <th style={s.th}>गाउँ / नगरपालिका</th>
        <th style={s.th}>टोल</th>

        {/* सम्पर्क नम्बर and प्रेषण are rowSpan=2 above, so nothing here */}
      </tr>
    </thead>
  );
}

// ─────────────────────────────────────────────
// TABLE BODY
// ─────────────────────────────────────────────
// Total columns = 14 (कार्य, क्र.सं., मुल दर्ता, सेवा दर्ता/मिति, पूरा नाम, जाती,
//                     आमाको उमेर, शिशुको उमेर, लिङ्ग, जिल्ला, वडा, गाउँ, टोल,
//                     सम्पर्क, प्रेषण) = 15
const TOTAL_COLS = 15;

function TableBody({ rows, loading }) {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={TOTAL_COLS} style={s.emptyCell}>
            <span style={{ color: "#888" }}>लोड हुँदैछ…</span>
          </td>
        </tr>
      </tbody>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={TOTAL_COLS} style={s.emptyCell}>
            No data available in table
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row, idx) => (
        <tr key={row.id ?? idx} style={idx % 2 !== 0 ? { background: "#f7f9fc" } : {}}>
          <td style={s.td}>
            <ActionButtons
              onView={()    => console.log("View",   row.id)}
              onEdit={()    => console.log("Edit",   row.id)}
              onDelete={()  => console.log("Delete", row.id)}
            />
          </td>
          <td style={{ ...s.td, textAlign: "center" }}>{idx + 1}</td>
          <td style={s.td}>{row.mulDartaNo}</td>
          <td style={s.td}>
            <div>{row.sewaDartaNo}</div>
            <div style={{ color: "#888", fontSize: 11 }}>{row.miti}</div>
          </td>
          <td style={s.td}>{row.fullName}</td>
          <td style={s.td}>{row.jaati}</td>
          <td style={s.td}>{row.aamaUmer}</td>
          <td style={s.td}>{row.sishuUmer}</td>
          <td style={s.td}>{row.linga}</td>
          <td style={s.td}>{row.jilla}</td>
          <td style={s.td}>{row.wadaNo}</td>
          <td style={s.td}>{row.gaauNagar}</td>
          <td style={s.td}>{row.tol}</td>
          <td style={s.td}>{row.sampark}</td>
          <td style={s.td}>{row.preson}</td>
        </tr>
      ))}
    </tbody>
  );
}

// ─────────────────────────────────────────────
// ACTION BUTTONS  –  wire to your routes/handlers
// ─────────────────────────────────────────────
function ActionButtons({ onView, onEdit, onDelete }) {
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
      <button onClick={onView}   style={{ ...s.actionBtn, background: "#17a2b8" }} title="हेर्नुहोस्">👁</button>
      <button onClick={onEdit}   style={{ ...s.actionBtn, background: "#e6a817" }} title="सम्पादन">✏️</button>
      <button onClick={onDelete} style={{ ...s.actionBtn, background: "#dc3545" }} title="मेटाउनुहोस्">🗑</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div style={s.pagination}>
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        style={{ ...s.pageBtn, opacity: currentPage <= 1 ? 0.5 : 1 }}
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        style={{ ...s.pageBtn, opacity: currentPage >= totalPages ? 0.5 : 1 }}
      >
        Next
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function StanpayiAamaShishuSevaList() {
  const [pageSize, setPageSize]       = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("18/01/2083");
  const [searchQuery, setSearchQuery] = useState("18/01/2083");

  const { rows, total, loading } = useTableData({ searchQuery, pageSize, currentPage });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function handleSearch() {
    setCurrentPage(1);
    setSearchQuery(searchInput);
  }

  function handlePageSizeChange(size) {
    setPageSize(size);
    setCurrentPage(1);
  }

  // ── Wire to your router: e.g. navigate("/")
  function handleHome() {
    console.log("Navigate to home");
  }

  return (
    <div style={s.page}>
      <Breadcrumb onHome={handleHome} />

      <div style={s.container}>
        <div style={s.card}>
          <TopControls
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onSearch={handleSearch}
          />

          {/* overflowX keeps the table inside the card on small screens */}
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <TableHeader />
              <TableBody rows={rows} loading={loading} />
            </table>
          </div>

          <div style={s.divider} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage(p => Math.max(1, p - 1))}
            onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const s = {
  page: {
    minHeight: "100vh",
    background: "#f0f2f5",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    fontSize: 13,
  },

  // breadcrumb
  breadcrumbBar: {
    background: "#e8eaf0",
    padding: "10px 20px",
    fontSize: 13,
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  pageTitle:       { fontWeight: 700, fontSize: 15, color: "#333" },
  breadcrumbLink:  { color: "#1a6fc4", cursor: "pointer", textDecoration: "underline" },
  breadcrumbSep:   { color: "#bbb" },

  // layout
  container: { padding: 20 },
  card: {
    background: "#fff",
    borderRadius: 4,
    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
    padding: 16,
  },

  // top controls
  topControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    flexWrap: "wrap",
    gap: 10,
  },
  showEntries: { display: "flex", alignItems: "center", gap: 8, color: "#555" },
  select: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "3px 6px",
    fontSize: 13,
    outline: "none",
  },
  searchBox:   { display: "flex", alignItems: "center" },
  searchInput: {
    border: "1px solid #ccc",
    borderRight: "none",
    borderRadius: "4px 0 0 4px",
    padding: "6px 10px",
    fontSize: 13,
    width: 170,
    outline: "none",
    color: "#444",
  },
  searchBtn: {
    background: "#1a6fc4",
    border: "none",
    color: "#fff",
    padding: "7px 12px",
    borderRadius: "0 4px 4px 0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  // table
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
    tableLayout: "auto",
  },
  th: {
    padding: "7px 10px",
    textAlign: "center",
    color: "#444",
    fontWeight: 600,
    border: "1px solid #cdd2db",
    background: "#e8edf5",
    lineHeight: 1.45,
    whiteSpace: "nowrap",
  },
  td: {
    padding: "7px 10px",
    border: "1px solid #e0e4eb",
    color: "#444",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  emptyCell: {
    textAlign: "center",
    padding: 24,
    color: "#666",
    background: "#fafafa",
    fontSize: 14,
  },

  // bottom
  divider: {
    height: 3,
    background: "linear-gradient(to right, #1a6fc4, #5aabff, #1a6fc4)",
    margin: "14px 0 0 0",
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: 12,
  },
  pageBtn: {
    border: "1px solid #ccc",
    background: "#fff",
    borderRadius: 4,
    padding: "6px 16px",
    fontSize: 13,
    cursor: "pointer",
    color: "#333",
  },

  // action buttons
  actionBtn: {
    border: "none",
    borderRadius: 3,
    padding: "3px 7px",
    cursor: "pointer",
    color: "#fff",
    fontSize: 13,
  },
};