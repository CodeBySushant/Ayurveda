import { useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

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

function ActionButtons({ row, onDelete, onView, onPrint }) {
  return (
    <div style={s.actionCell}>
      <button style={s.btnPrint} onClick={() => onPrint(row)} type="button">
        Print
      </button>

      <button style={s.btnView} onClick={() => onView(row)} type="button">
        View
      </button>

      <button style={s.btnDelete} onClick={() => onDelete(row)} type="button">
        Delete
      </button>
    </div>
  );
}

function TableHeader() {
  return (
    <thead>
      {/* Row 1 */}
      <tr>
        <th style={s.th} rowSpan={2}>
          क्र.सं.
        </th>
        <th style={s.th} rowSpan={2}>
          मुल दर्ता नम्बर
        </th>
        <th style={s.th} rowSpan={1}>
          <div style={s.thTop}>सेवा दर्ता नम्बर</div>
        </th>
        <th style={s.th} rowSpan={2}>
          सेवाग्राहीको पुरा नाम
        </th>
        <th style={s.th} rowSpan={2}>
          जाती
        </th>
        <th style={s.th} rowSpan={2}>
          उमेर
        </th>
        <th style={s.th} rowSpan={2}>
          लिङ्ग
        </th>
        {/* ठेगाना spans 2 sub-columns */}
        <th style={{ ...s.th, ...s.thGroup }} colSpan={2}>
          ठेगाना
        </th>
        <th style={s.th} rowSpan={1}>
          <div style={s.thTop}>सम्पर्क नम्बर</div>
        </th>
        <th style={{ ...s.th, ...s.thSticky }} rowSpan={2}>
          कार्य
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

function TableRow({ row, index, onDelete, onView, onPrint }) {
  return (
    <tr style={index % 2 === 0 ? s.trEven : s.trOdd}>
      <td style={s.td}>{row.sn}</td>

      <td style={s.td}>{row.mool_darta}</td>

      <td style={s.td}>
        <div>{row.service_number}</div>
        <div style={s.subText}>{row.miti}</div>
      </td>

      <td
        style={{
          ...s.td,
          ...s.tdName,
        }}
      >
        {row.full_name}
      </td>

      <td style={s.td}>{row.jaati}</td>

      <td style={s.td}>{row.umer}</td>

      <td style={s.td}>{row.linga}</td>

      <td style={s.td}>
        <div>{row.jilla}</div>
        <div style={s.subText}>{row.wada}</div>
      </td>

      <td style={s.td}>
        <div>-</div>
        <div style={s.subText}>{row.tol}</div>
      </td>

      <td style={s.td}>
        <div>{row.sampark_num}</div>
        <div style={s.subText}>-</div>
      </td>

      <td style={{ ...s.td, ...s.tdSticky }}>
        <ActionButtons
          row={row}
          onDelete={onDelete}
          onView={onView}
          onPrint={onPrint}
        />
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function JesthaNagarikRegisterDailyList() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMul, setSearchMul] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/ayurveda/jestha-nagarik",
      );

      setData(res.data || []);
    } catch (error) {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (row) => {
    const ok = window.confirm("Delete this record?");

    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/ayurveda/jestha-nagarik/${row.id}`,
      );

      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleView = async (row) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ayurveda/jestha-nagarik/${row.id}/items`,
      );

      setDetails(res.data || []);
      setShowModal(true);
    } catch (error) {
      alert("Failed to load details");
    }
  };

  const handlePrint = (row) => {
    const w = window.open("", "_blank");

    w.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body{font-family:Arial;padding:25px}
          table{
            width:100%;
            border-collapse:collapse;
          }
          td,th{
            border:1px solid #ccc;
            padding:8px;
          }
        </style>
      </head>
      <body>
        <h2>Jestha Nagarik Record</h2>
        <table>
          <tr>
            <th>Service No</th>
            <td>${row.service_number}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>${row.full_name}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>${row.miti}</td>
          </tr>
          <tr>
            <th>Contact</th>
            <td>${row.sampark_num}</td>
          </tr>
        </table>

        <script>
          window.onload=function(){
            window.print();
            window.onafterprint=()=>window.close();
          }
        </script>
      </body>
    </html>
  `);

    w.document.close();
  };

  // ── Client-side filtering (replace with server-side if data is large) ──
  const filtered = useMemo(() => {
    return data.filter((row) => {
      const mulMatch = searchMul.trim()
        ? String(row.mool_darta || "")
            .toLowerCase()
            .includes(searchMul.toLowerCase())
        : true;

      const dateMatch = searchDate.trim()
        ? String(row.miti || "").includes(searchDate.trim())
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
          <a href="#" style={s.breadcrumbLink}>
            गृहपृष्ठ
          </a>
          <span style={s.breadcrumbSep} aria-hidden="true">
            /
          </span>
          <span style={s.breadcrumbCurrent}>जेष्ठ नागरिक सेवा दैनिक सूची</span>
        </nav>
      </header>

      {/* ── Card ── */}
      <main style={s.card}>
        {/* Controls */}
        <div style={s.controls}>
          {/* Left: Show N entries */}
          <div style={s.showEntries}>
            <label htmlFor="pageSizeSelect" style={s.controlLabel}>
              Show
            </label>
            <select
              id="pageSizeSelect"
              style={s.select}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
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
              onClick={fetchData}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          style={s.tableWrapper}
          role="region"
          aria-label="जेष्ठ नागरिक सेवा सूची"
        >
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
                  <TableRow
                    key={row.id ?? i}
                    row={row}
                    index={i}
                    onDelete={handleDelete}
                    onView={handleView}
                    onPrint={handlePrint}
                  />
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
                <span key={`ellipsis-${i}`} style={s.ellipsis}>
                  …
                </span>
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
              ),
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
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                width: "700px",
                maxHeight: "80vh",
                overflow: "auto",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h3>फलोअप विवरण</h3>

              {details.length === 0 ? (
                <p>No data</p>
              ) : (
                details.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px 0",
                    }}
                  >
                    <strong>{item.panel_type}</strong>

                    <div>मिति: {item.miti}</div>
                    <div>BMI: {item.bmi}</div>
                    <div>HB: {item.hb}</div>
                    <div>ESR: {item.esr}</div>
                    <div>निन्द्रा: {item.nindra}</div>
                    <div>कैफियत: {item.kaifiyat}</div>
                  </div>
                ))
              )}

              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: "15px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
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
    right: 0,
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
    right: 0,
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
    flexWrap: "wrap",
  },

  btnPrint: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    minWidth: "58px",
  },

  btnView: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    minWidth: "58px",
  },

  btnDelete: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    minWidth: "58px",
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
