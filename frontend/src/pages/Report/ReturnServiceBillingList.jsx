import { useState, useMemo } from "react";

const COLUMNS = [
  { key: "billNo",      label: "बिल नं" },
  { key: "name",        label: "नाम" },
  { key: "serviceType", label: "सेवाको किसिम" },
  { key: "subService",  label: "उप-सेवाको किसिम" },
  { key: "customerName",label: "ग्राहकको नाम" },
  { key: "billDate",    label: "बिल मिति" },
  { key: "totalAmount", label: "कुल रकम" },
];

const SAMPLE_DATA = []; // Replace with real data or API call

export default function SevaBilFirtiPratiwedan() {
  const [entries,    setEntries]    = useState("10");
  const [mitiDekhi, setMitiDekhi]  = useState("");
  const [mitiSamma, setMitiSamma]  = useState("");
  const [data]                     = useState(SAMPLE_DATA);
  const [page,       setPage]      = useState(1);

  const pageSize   = parseInt(entries) || 10;
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const total = data.reduce((s, r) => s + (r.totalAmount || 0), 0);

  const s = {
    root: {
      fontFamily: "'Noto Sans', 'Segoe UI', sans-serif",
      background: "#f0f2f5",
      minHeight: "100vh",
      fontSize: 13,
      color: "#333",
    },
    nav: {
      background: "#e8eaf0",
      borderBottom: "1px solid #d0d3db",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    navTitle:      { fontWeight: 700, fontSize: 17, color: "#222" },
    navBreadcrumb: { fontSize: 13, color: "#555" },
    navLink:       { color: "#1565c0", textDecoration: "none", fontWeight: 500 },
    pageBody:      { padding: "16px 20px" },
    topActions: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 14,
    },
    btnPrint: {
      background: "#1e88e5",
      color: "white",
      border: "none",
      borderRadius: 4,
      width: 36,
      height: 36,
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    filterRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      flexWrap: "wrap",
    },
    showLabel: {
      fontSize: 13,
      color: "#444",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    select: {
      border: "1px solid #ccc",
      borderRadius: 3,
      padding: "3px 6px",
      fontSize: 13,
      height: 30,
      background: "white",
      cursor: "pointer",
    },
    input: {
      border: "1px solid #ccc",
      borderRadius: 3,
      padding: "4px 10px",
      fontSize: 13,
      height: 32,
      background: "white",
      outline: "none",
      minWidth: 140,
    },
    searchBtn: {
      background: "#1e88e5",
      color: "white",
      border: "none",
      borderRadius: 3,
      padding: "4px 14px",
      height: 32,
      fontSize: 15,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    tableWrapper: {
      background: "white",
      border: "1px solid #dde",
      borderRadius: 3,
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13,
    },
    th: {
      border: "1px solid #dde",
      padding: "8px 12px",
      textAlign: "center",
      fontWeight: 600,
      color: "#444",
      whiteSpace: "nowrap",
      background: "#f5f6fa",
    },
    td: {
      border: "1px solid #eee",
      padding: "7px 12px",
      textAlign: "center",
      color: "#333",
    },
    noData: {
      textAlign: "center",
      padding: "18px",
      color: "#aaa",
      fontSize: 13,
      background: "#fafafa",
      border: "1px solid #eee",
    },
    paginationRow: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 4,
      padding: "10px 12px",
      borderTop: "2px solid #5b9bd5",
    },
    pageBtn: {
      border: "1px solid #ccc",
      background: "white",
      borderRadius: 3,
      padding: "4px 12px",
      fontSize: 13,
      cursor: "pointer",
      color: "#333",
    },
    summarySection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginTop: 24,
      paddingRight: 8,
    },
    summaryRow: {
      display: "flex",
      gap: 80,
      fontSize: 13,
      minWidth: 220,
      justifyContent: "space-between",
    },
    summaryLabel: { fontWeight: 700, color: "#222" },
    summaryValue: { fontWeight: 700, color: "#222", minWidth: 30, textAlign: "right" },
  };

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>सेवा बिल फिर्ती प्रतिवेदन</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}सेवा बिल फिर्ती प्रतिवेदन
        </span>
      </div>

      <div style={s.pageBody}>
        {/* Print button */}
        <div style={s.topActions}>
          <button style={s.btnPrint} title="Print" onClick={() => window.print()}>
            🖨
          </button>
        </div>

        {/* Filter Row */}
        <div style={s.filterRow}>
          <span style={s.showLabel}>
            Show
            <select
              style={s.select}
              value={entries}
              onChange={(e) => { setEntries(e.target.value); setPage(1); }}
            >
              {["10", "25", "50", "100"].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            entries
          </span>

          <div style={{ flex: 1 }} />

          <input
            style={s.input}
            placeholder="मितिदेखि"
            value={mitiDekhi}
            onChange={(e) => setMitiDekhi(e.target.value)}
          />
          <input
            style={s.input}
            placeholder="मितिसम्म"
            value={mitiSamma}
            onChange={(e) => setMitiSamma(e.target.value)}
          />
          <button style={s.searchBtn}>🔍</button>
        </div>

        {/* Table */}
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              <tr>
                {COLUMNS.map(col => (
                  <th key={col.key} style={s.th}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} style={s.noData}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                    <td style={s.td}>{row.billNo}</td>
                    <td style={s.td}>{row.name}</td>
                    <td style={s.td}>{row.serviceType}</td>
                    <td style={s.td}>{row.subService}</td>
                    <td style={s.td}>{row.customerName}</td>
                    <td style={s.td}>{row.billDate}</td>
                    <td style={s.td}>{row.totalAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={s.paginationRow}>
            <button
              style={s.pageBtn}
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button
              style={s.pageBtn}
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>

        {/* Summary */}
        <div style={s.summarySection}>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>Total :</span>
            <span style={s.summaryValue}>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}