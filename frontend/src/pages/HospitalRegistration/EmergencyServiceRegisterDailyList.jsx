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
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0f2f5",
  },
  dateInput: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 13,
    height: 34,
    background: "white",
    outline: "none",
    width: 140,
  },
  searchBtn: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "5px 14px",
    height: 34,
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
    background: "#f5f6fa",
    fontWeight: 600,
    padding: "8px 10px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
    lineHeight: 1.5,
  },
  thGroup: {
    background: "#eaecf5",
    fontWeight: 700,
    padding: "8px 10px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
  },
  td: (alt) => ({
    border: "1px solid #eee",
    padding: "7px 10px",
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
};

export default function AapatkalinSevaDartaDainikSuchi() {
  const [dateFilter, setDateFilter] = useState("18/1/2083");
  const [data]                      = useState(SAMPLE_DATA);

  const pageData = useMemo(() => data, [data]);

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>आपातकालीन सेवा दर्ता विवरणको दैनिक सूची</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}आपातकालीन सेवा दर्ता विवरणको दैनिक सूची
        </span>
      </div>

      {/* Filter Bar */}
      <div style={s.filterBar}>
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
              {/* Row 1: लिङ्ग (1 col) | ठेगाना (3 cols) */}
              <tr>
                <th rowSpan={3} style={s.th}>क्र.सं.</th>
                <th rowSpan={3} style={s.th}>दर्ता नम्बर</th>
                <th rowSpan={3} style={s.th}>दर्ता मिति र समय</th>
                <th rowSpan={3} style={s.th}>पहिलो, मध्यम, र परिवारको नाम</th>
                <th rowSpan={3} style={s.th}>जाति/जातियता कोड</th>
                <th colSpan={1} style={s.thGroup}>लिङ्ग</th>
                <th colSpan={3} style={s.thGroup}>ठेगाना</th>
                <th rowSpan={3} style={s.th}>पालनहरूको नाम र सम्पर्क नम्बर</th>
                <th rowSpan={3} style={s.th}>कार्यवाही</th>
              </tr>
              {/* Row 2: उमेर समूह | जिल्ला | स्थानीय सरकार | (3rd ठेगाना col spans 2 rows) */}
              <tr>
                <th style={s.th}>उमेर समूह</th>
                <th style={s.th}>जिल्ला</th>
                <th style={s.th}>स्थानीय सरकार</th>
                <th rowSpan={2} style={s.th}></th>
              </tr>
              {/* Row 3: उमेर | वार्ड नम्बर | टोल */}
              <tr>
                <th style={s.th}>उमेर</th>
                <th style={s.th}>वार्ड नम्बर</th>
                <th style={s.th}>टोल</th>
              </tr>
            </thead>

            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={13} style={s.noDataTd}>No data for this date !</td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td(i%2!==0)}>{row.sn}</td>
                    <td style={s.td(i%2!==0)}>{row.dartaNo}</td>
                    <td style={s.td(i%2!==0)}>{row.dartaMitiSamay}</td>
                    <td style={s.td(i%2!==0)}>{row.fullName}</td>
                    <td style={s.td(i%2!==0)}>{row.casteCode}</td>
                    <td style={s.td(i%2!==0)}>{row.ageGroup}</td>
                    <td style={s.td(i%2!==0)}>{row.age}</td>
                    <td style={s.td(i%2!==0)}>{row.district}</td>
                    <td style={s.td(i%2!==0)}>{row.localGovt}</td>
                    <td style={s.td(i%2!==0)}>{row.wardNo}</td>
                    <td style={s.td(i%2!==0)}>{row.tol}</td>
                    <td style={s.td(i%2!==0)}>{row.guardianContact}</td>
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
        </div>
      </div>
    </div>
  );
}