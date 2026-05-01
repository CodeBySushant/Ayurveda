import { useState, useMemo } from "react";

const SAMPLE_DATA = [];

const s = {
  root: {
    fontFamily: "'Noto Sans Devanagari', 'Noto Sans', 'Segoe UI', sans-serif",
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
  navTitle: { fontWeight: 700, fontSize: 17, color: "#222" },
  navBreadcrumb: { fontSize: 13, color: "#555" },
  navLink: { color: "#1565c0", textDecoration: "none", fontWeight: 500 },
  filterBar: {
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0f2f5",
    flexWrap: "wrap",
  },
  showLabel: { fontSize: 13, color: "#444", display: "flex", alignItems: "center", gap: 6 },
  select: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "3px 6px",
    fontSize: 13,
    height: 30,
    background: "white",
    cursor: "pointer",
  },
  spacer: { flex: 1 },
  searchInput: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "4px 10px",
    fontSize: 13,
    height: 32,
    background: "white",
    outline: "none",
    minWidth: 150,
  },
  dateInput: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "4px 10px",
    fontSize: 13,
    height: 32,
    background: "white",
    outline: "none",
    width: 120,
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
  pageBody: { padding: "0 20px 24px" },
  tableWrapper: {
    background: "white",
    border: "1px solid #dde",
    borderRadius: 3,
    overflow: "auto",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 1100 },
  th: {
    background: "#eef1f8",
    fontWeight: 600,
    padding: "7px 8px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
    lineHeight: 1.5,
  },
  thGroup: {
    background: "#e4e8f5",
    fontWeight: 700,
    padding: "7px 8px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
  },
  td: (alt) => ({
    border: "1px solid #eee",
    padding: "7px 8px",
    textAlign: "center",
    background: alt ? "#f7f8fc" : "white",
    color: "#444",
    fontSize: 12,
    verticalAlign: "middle",
  }),
  noDataTd: {
    border: "1px solid #eee",
    padding: "18px",
    textAlign: "center",
    color: "#aaa",
    fontSize: 13,
    background: "#fafafa",
  },
  paginationRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 4,
    padding: "10px 12px",
    borderTop: "3px solid #8899cc",
  },
  pageBtn: {
    border: "1px solid #ccc",
    background: "white",
    borderRadius: 3,
    padding: "4px 14px",
    fontSize: 13,
    cursor: "pointer",
    color: "#333",
  },
};

export default function RogiPraveshVivaran() {
  const [entries,    setEntries]    = useState("10");
  const [moolDarta,  setMoolDarta]  = useState("");
  const [dateFilter, setDateFilter] = useState("2083-01-18");
  const [data]                      = useState(SAMPLE_DATA);
  const [page,       setPage]       = useState(1);

  const pageSize   = parseInt(entries) || 10;
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const pageData   = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>रोगी प्रवेश विवरण</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}बिरामी प्रवेश विवरण
        </span>
      </div>

      {/* Filter Bar */}
      <div style={s.filterBar}>
        <span style={s.showLabel}>
          Show
          <select
            style={s.select}
            value={entries}
            onChange={e => { setEntries(e.target.value); setPage(1); }}
          >
            {["10","25","50","100"].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          entries
        </span>
        <div style={s.spacer} />
        <input
          style={s.searchInput}
          placeholder="मूल दर्ता नम्बर"
          value={moolDarta}
          onChange={e => setMoolDarta(e.target.value)}
        />
        <input
          style={s.dateInput}
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        />
        <button style={s.searchBtn}>🔍</button>
      </div>

      {/* Table */}
      <div style={s.pageBody}>
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              {/* Row 1 */}
              <tr>
                <th rowSpan={2} style={s.th}>क्र.सं.</th>
                <th colSpan={2} style={s.thGroup}>प्रवेशको मिति / समय</th>
                <th rowSpan={2} style={s.th}>अन्तर्ज्ञ नम्बर</th>
                <th colSpan={2} style={s.thGroup}>नाम</th>
                <th colSpan={2} style={s.thGroup}>उमेर / लिङ्ग</th>
                <th colSpan={3} style={s.thGroup}>ठेगाना</th>
                <th colSpan={2} style={s.thGroup}>पालनहरूको</th>
                <th rowSpan={2} style={s.th}>अस्पतालको वार्ड</th>
                <th rowSpan={2} style={s.th}>पुलिसको केस</th>
                <th rowSpan={2} style={s.th}>स्थिति</th>
                <th rowSpan={2} style={s.th}>कार्यवाही</th>
              </tr>
              {/* Row 2 */}
              <tr>
                <th style={s.th}>प्रवेशको मिति</th>
                <th style={s.th}>प्रवेशको समय</th>
                <th style={s.th}>पहिलो नाम</th>
                <th style={s.th}>परिवारको नाम</th>
                <th style={s.th}>उमेर</th>
                <th style={s.th}>लिङ्ग</th>
                <th style={s.th}>जिल्ला</th>
                <th style={s.th}>स्थानीय सरकार/नगरपालिका</th>
                <th style={s.th}>वार्ड/टोल</th>
                <th style={s.th}>पालनहरूको नाम</th>
                <th style={s.th}>पालनहरूको सम्पर्क</th>
              </tr>
            </thead>

            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={17} style={s.noDataTd}>No data available in table</td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td(i%2!==0)}>{row.sn}</td>
                    <td style={s.td(i%2!==0)}>{row.admissionDate}</td>
                    <td style={s.td(i%2!==0)}>{row.admissionTime}</td>
                    <td style={s.td(i%2!==0)}>{row.internalNo}</td>
                    <td style={s.td(i%2!==0)}>{row.firstName}</td>
                    <td style={s.td(i%2!==0)}>{row.familyName}</td>
                    <td style={s.td(i%2!==0)}>{row.age}</td>
                    <td style={s.td(i%2!==0)}>{row.gender}</td>
                    <td style={s.td(i%2!==0)}>{row.district}</td>
                    <td style={s.td(i%2!==0)}>{row.municipality}</td>
                    <td style={s.td(i%2!==0)}>{row.wardTol}</td>
                    <td style={s.td(i%2!==0)}>{row.guardianName}</td>
                    <td style={s.td(i%2!==0)}>{row.guardianContact}</td>
                    <td style={s.td(i%2!==0)}>{row.hospitalWard}</td>
                    <td style={s.td(i%2!==0)}>{row.policeCase}</td>
                    <td style={s.td(i%2!==0)}>{row.status}</td>
                    <td style={s.td(i%2!==0)}>
                      <button style={{
                        background: "#1e88e5", color: "white", border: "none",
                        borderRadius: 3, padding: "2px 8px", cursor: "pointer", fontSize: 11,
                      }}>कार्य</button>
                    </td>
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
      </div>
    </div>
  );
}