import { useState } from "react";

const FISCAL_YEARS = ["आर्थिक वर्ष", "२०८२/८३", "२०८१/८२", "२०८०/७९", "२०७९/७८"];

const THERAPY_TYPES = ["Electro Therapy", "Exercise Therapy", "Manual Therapy"];

const ROW_GROUPS = [
  { key: "sewagrahi", label: "सेवाग्राही संख्या" },
  { key: "sewa",      label: "सेवा संख्या" },
];

const GENDERS = [
  { key: "F", label: "महिला", alt: true  },
  { key: "M", label: "पुरुष", alt: false },
];

const initData = () =>
  ROW_GROUPS.reduce((acc, g) => {
    acc[g.key] = THERAPY_TYPES.reduce((a, t) => {
      a[t] = { F: 0, M: 0 };
      return a;
    }, {});
    return acc;
  }, {});

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
    gap: 6,
    background: "#f0f2f5",
    flexWrap: "wrap",
  },
  select: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 13,
    height: 34,
    background: "white",
    cursor: "pointer",
    minWidth: 170,
  },
  slash: { fontSize: 16, fontWeight: 700, color: "#555", padding: "0 2px" },
  label: { fontSize: 13, color: "#444", fontWeight: 500 },
  input: {
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
    background: "#3fa7bf",
    color: "white",
    border: "none",
    borderRadius: 4,
    width: 38,
    height: 34,
    fontSize: 16,
    cursor: "pointer",
  },
  printBtn: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 4,
    width: 36,
    height: 34,
    fontSize: 16,
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pageBody: { padding: "12px 20px 24px" },
  tableWrapper: {
    background: "white",
    border: "1px solid #dde",
    borderRadius: 4,
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  sectionTitleTh: {
    background: "#eaf3f7",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 14,
    padding: "10px 8px",
    border: "1px solid #d0dde8",
    color: "#2c5f7a",
  },
  headerTh: {
    background: "#f0f6f9",
    fontWeight: 600,
    padding: "9px 14px",
    border: "1px solid #d0dde8",
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  groupLabelTd: (alt) => ({
    border: "1px solid #eee",
    padding: "6px 14px",
    textAlign: "center",
    background: alt ? "#f2f5f8" : "white",
    color: "#8899aa",
    fontSize: 13,
    verticalAlign: "middle",
  }),
  genderTd: (alt) => ({
    border: "1px solid #eee",
    padding: "8px 12px",
    textAlign: "center",
    background: alt ? "#f2f5f8" : "white",
    color: alt ? "#8899aa" : "#555",
    fontSize: 13,
  }),
  dataTd: (alt) => ({
    border: "1px solid #eee",
    padding: "8px 12px",
    textAlign: "center",
    background: alt ? "#f2f5f8" : "white",
    color: alt ? "#8899aa" : "#555",
    fontSize: 13,
  }),
};

export default function FiziotherapiSevaPratiwedan() {
  const [fiscalYear, setFiscalYear] = useState("आर्थिक वर्ष");
  const [mitiDekhi,  setMitiDekhi]  = useState("");
  const [mitiSamma,  setMitiSamma]  = useState("");
  const [data]                      = useState(initData);

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>फिजियोथेरापी सेवा प्रतिवेदन</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}फिजियोथेरापी सेवा प्रतिवेदन
        </span>
      </div>

      {/* Filter Bar */}
      <div style={s.filterBar}>
        <select style={s.select} value={fiscalYear} onChange={e => setFiscalYear(e.target.value)}>
          {FISCAL_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <span style={s.slash}>/</span>

        <input
          style={s.input}
          placeholder="मिति"
          value={mitiDekhi}
          onChange={e => setMitiDekhi(e.target.value)}
        />
        <span style={s.label}>देखि</span>
        <input
          style={s.input}
          placeholder="मिति"
          value={mitiSamma}
          onChange={e => setMitiSamma(e.target.value)}
        />
        <span style={s.label}>सम्म</span>
        <button style={s.searchBtn}>🔍</button>

        <button style={s.printBtn} title="Print" onClick={() => window.print()}>
          🖨
        </button>
      </div>

      {/* Table */}
      <div style={s.pageBody}>
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              <tr>
                <th colSpan={2 + THERAPY_TYPES.length} style={s.sectionTitleTh}>
                  फिजियोथेरापी प्रतिवेदन
                </th>
              </tr>
              <tr>
                <th colSpan={2} style={s.headerTh}>सेवाको विवरण</th>
                {THERAPY_TYPES.map(t => (
                  <th key={t} style={s.headerTh}>{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROW_GROUPS.map((group, gi) => (
                GENDERS.map((gender, ri) => {
                  const isAlt = gender.alt;
                  return (
                    <tr key={`${group.key}-${gender.key}`}>
                      {/* Group label — only on first gender row, spans 2 rows */}
                      {ri === 0 && (
                        <td
                          rowSpan={2}
                          style={{
                            ...s.groupLabelTd(true),
                            borderBottom: gi === ROW_GROUPS.length - 1 ? "1px solid #eee" : "1px solid #dde",
                            width: 160,
                          }}
                        >
                          {group.label}
                        </td>
                      )}
                      <td style={s.genderTd(isAlt)}>{gender.label}</td>
                      {THERAPY_TYPES.map(t => (
                        <td key={t} style={s.dataTd(isAlt)}>
                          {data[group.key][t][gender.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}