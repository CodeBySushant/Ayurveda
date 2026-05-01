import { useState, useMemo } from "react";

const COLUMNS = [
  { key: "action", label: "कार्य" },
  { key: "sn", label: "क्र.सं." },
  { key: "mulDartaNumber", label: "मुल दर्ता नम्बर" },
  { key: "sewaDartaNumber", label: "सेवा दर्ता नम्बर", sub: "मिति" },
  { key: "fullName", label: "सेवाग्राहीको पुरा नाम" },
  { key: "caste", label: "जाती" },
  { key: "age", label: "उमेर" },
  { key: "gender", label: "लिङ्ग" },
  { key: "district", label: "ठेगाना / जिल्ला", sub: "वडा नम्बर" },
  { key: "municipality", label: "गाउँ / नगरपालिका", sub: "टोल" },
  { key: "contact", label: "सम्पर्क नम्बर", sub: "प्रेषण भई आएको संस्था" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function UpcharatmakYogaSeva() {
  const [entries, setEntries] = useState(10);
  const [searchDate, setSearchDate] = useState("18/01/2083");
  const [searchMul, setSearchMul] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Replace with real API data
  const data = [];

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesMul = searchMul ? row.mulDartaNumber?.includes(searchMul) : true;
      const matchesDate = searchDate ? row.mulDartaDate?.includes(searchDate) : true;
      return matchesMul && matchesDate;
    });
  }, [data, searchMul, searchDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const paged = filtered.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div style={styles.page}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <span style={styles.pageTitle}>उपचारात्मक योग सेवा दैनिक सूची</span>
        <nav style={styles.breadcrumb}>
          <a href="#" style={styles.breadcrumbLink}>गृहपृष्ठ</a>
          <span style={styles.breadcrumbSep}>/</span>
          <span style={styles.breadcrumbCurrent}>उपचारात्मक योग सेवा दैनिक सूची</span>
        </nav>
      </div>

      {/* Table Card */}
      <div style={styles.card}>
        {/* Controls Row */}
        <div style={styles.controls}>
          <div style={styles.showEntries}>
            <span style={styles.controlLabel}>Show</span>
            <select
              style={styles.select}
              value={entries}
              onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span style={styles.controlLabel}>entries</span>
          </div>

          <div style={styles.searchRow}>
            <input
              style={styles.searchInput}
              placeholder="मूल दर्ता नम्बर"
              value={searchMul}
              onChange={(e) => { setSearchMul(e.target.value); setCurrentPage(1); }}
            />
            <input
              style={styles.searchInput}
              placeholder="मिति"
              value={searchDate}
              onChange={(e) => { setSearchDate(e.target.value); setCurrentPage(1); }}
            />
            <button style={styles.searchBtn} title="खोज्नुहोस्">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {/* Action */}
                <th style={{ ...styles.th, ...styles.thAction }} rowSpan={2}>कार्य</th>
                {/* क्र.सं. */}
                <th style={{ ...styles.th, ...styles.thSn }} rowSpan={2}>क्र.सं.</th>
                {/* मुल दर्ता नम्बर */}
                <th style={styles.th} rowSpan={2}>मुल दर्ता नम्बर</th>
                {/* सेवा दर्ता नम्बर / मिति */}
                <th style={styles.th} colSpan={1}>
                  <div style={styles.thInner}>सेवा दर्ता नम्बर</div>
                  <div style={styles.thSub}>मिति</div>
                </th>
                {/* सेवाग्राहीको पुरा नाम */}
                <th style={styles.th} rowSpan={2}>सेवाग्राहीको पुरा नाम</th>
                {/* जाती */}
                <th style={styles.th} rowSpan={2}>जाती</th>
                {/* उमेर */}
                <th style={styles.th} rowSpan={2}>उमेर</th>
                {/* लिङ्ग */}
                <th style={styles.th} rowSpan={2}>लिङ्ग</th>
                {/* ठेगाना header spanning जिल्ला + गाउँ/नगरपालिका */}
                <th style={{ ...styles.th, ...styles.thAddress }} colSpan={2}>ठेगाना</th>
                {/* सम्पर्क नम्बर / प्रेषण */}
                <th style={styles.th} colSpan={1}>
                  <div style={styles.thInner}>सम्पर्क नम्बर</div>
                  <div style={styles.thSub}>प्रेषण भई आएको संस्था</div>
                </th>
              </tr>
              <tr>
                {/* sub-row for सेवा दर्ता - already handled above with colSpan approach */}
                {/* जिल्ला / वडा नम्बर */}
                <th style={styles.th}>
                  <div style={styles.thInner}>जिल्ला</div>
                  <div style={styles.thSub}>वडा नम्बर</div>
                </th>
                {/* गाउँ / नगरपालिका / टोल */}
                <th style={styles.th}>
                  <div style={styles.thInner}>गाउँ / नगरपालिका</div>
                  <div style={styles.thSub}>टोल</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={11} style={styles.noData}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        <button style={styles.actionBtnEdit} title="सम्पादन">✏️</button>
                        <button style={styles.actionBtnView} title="हेर्नुहोस्">👁️</button>
                      </div>
                    </td>
                    <td style={styles.td}>{(currentPage - 1) * entries + i + 1}</td>
                    <td style={styles.td}>{row.mulDartaNumber}</td>
                    <td style={styles.td}>
                      <div>{row.sewaDartaNumber}</div>
                      <div style={styles.subText}>{row.sewaDartaDate}</div>
                    </td>
                    <td style={styles.td}>{row.fullName}</td>
                    <td style={styles.td}>{row.caste}</td>
                    <td style={styles.td}>{row.age}</td>
                    <td style={styles.td}>{row.gender}</td>
                    <td style={styles.td}>
                      <div>{row.district}</div>
                      <div style={styles.subText}>{row.wardNumber}</div>
                    </td>
                    <td style={styles.td}>
                      <div>{row.municipality}</div>
                      <div style={styles.subText}>{row.tol}</div>
                    </td>
                    <td style={styles.td}>
                      <div>{row.contact}</div>
                      <div style={styles.subText}>{row.referredBy}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={styles.pageInfo}>
            {filtered.length === 0
              ? "Showing 0 to 0 of 0 entries"
              : `Showing ${(currentPage - 1) * entries + 1} to ${Math.min(currentPage * entries, filtered.length)} of ${filtered.length} entries`}
          </span>
          <div style={styles.pageButtons}>
            <button
              style={{ ...styles.pageBtn, ...(currentPage === 1 ? styles.pageBtnDisabled : {}) }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} style={styles.ellipsis}>…</span>
                ) : (
                  <button
                    key={p}
                    style={{ ...styles.pageBtn, ...(p === currentPage ? styles.pageBtnActive : {}) }}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              style={{ ...styles.pageBtn, ...(currentPage === totalPages ? styles.pageBtnDisabled : {}) }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Noto Sans Devanagari', 'Mukta', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  pageHeader: {
    background: "#e8eaf0",
    borderBottom: "1px solid #d0d4de",
    padding: "12px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2d3748",
    letterSpacing: "0.01em",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
  },
  breadcrumbLink: {
    color: "#4a6cf7",
    textDecoration: "none",
    fontWeight: "500",
  },
  breadcrumbSep: { color: "#a0aec0" },
  breadcrumbCurrent: { color: "#718096" },
  card: {
    background: "#fff",
    margin: "20px 24px",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
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
    padding: "4px 8px",
    fontSize: "13px",
    color: "#2d3748",
    background: "#fff",
    cursor: "pointer",
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  searchInput: {
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    padding: "6px 10px",
    fontSize: "13px",
    color: "#2d3748",
    outline: "none",
    width: "160px",
  },
  searchBtn: {
    background: "#4a6cf7",
    border: "none",
    borderRadius: "4px",
    padding: "7px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableWrapper: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    background: "#eef1f8",
    color: "#3a4a6b",
    fontWeight: "700",
    padding: "8px 10px",
    textAlign: "center",
    borderBottom: "2px solid #d0d8ee",
    borderRight: "1px solid #dde3f0",
    fontSize: "12.5px",
    verticalAlign: "middle",
  },
  thAction: { minWidth: "70px" },
  thSn: { minWidth: "50px" },
  thAddress: {
    background: "#e8ecf8",
  },
  thInner: {
    fontWeight: "700",
    color: "#3a4a6b",
  },
  thSub: {
    fontSize: "11px",
    color: "#6b7fa8",
    fontWeight: "500",
    marginTop: "2px",
  },
  td: {
    padding: "9px 10px",
    borderBottom: "1px solid #edf2f7",
    borderRight: "1px solid #edf2f7",
    color: "#2d3748",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "13px",
  },
  subText: {
    fontSize: "11px",
    color: "#718096",
    marginTop: "2px",
  },
  trEven: { background: "#fff" },
  trOdd: { background: "#f9fafc" },
  noData: {
    textAlign: "center",
    padding: "32px",
    color: "#a0aec0",
    fontSize: "14px",
    background: "#fafbfc",
  },
  actionBtns: {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
  },
  actionBtnEdit: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "2px 4px",
    borderRadius: "4px",
  },
  actionBtnView: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "2px 4px",
    borderRadius: "4px",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    borderTop: "1px solid #edf2f7",
    flexWrap: "wrap",
    gap: "10px",
  },
  pageInfo: { fontSize: "13px", color: "#718096" },
  pageButtons: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  pageBtn: {
    border: "1px solid #cbd5e0",
    background: "#fff",
    color: "#4a5568",
    borderRadius: "4px",
    padding: "5px 12px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  pageBtnActive: {
    background: "#4a6cf7",
    color: "#fff",
    borderColor: "#4a6cf7",
    fontWeight: "600",
  },
  pageBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  ellipsis: {
    padding: "5px 4px",
    color: "#a0aec0",
    fontSize: "13px",
  },
};