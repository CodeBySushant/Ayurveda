import { useState } from "react";

const DISEASES = [
  [1,  "Jwar (Fever)"],
  [2,  "Swash vikar (Respiratory disorder)"],
  [3,  "Amlapitta (APD)"],
  [4,  "Atisar/Grahani (Diarrhoea/IBS)"],
  [5,  "Udarroga (Abdominal disorder)"],
  [6,  "Prameha/Madhumeha"],
  [7,  "Kamala"],
  [8,  "Pandu (Anaemia)"],
  [9,  "Hridaya roga (Cardiac disorder)"],
  [10, "Raktachap (Blood pressure disorder)"],
  [11, "Shotha (Oedema)"],
  [12, "Krimi (Worm infestation)"],
  [13, "Twak vikar (Skin disorder)"],
  [14, "Vrana (Wound/ulcer)"],
  [15, "Abhighataj vikar (Traumatic disorder)"],
  [16, "Vata vyadhi (Skeleto-muscular and nervous system disease)"],
  [17, "Amavata (Rheumatoid arthritis)"],
  [18, "Vatrakta (Gout)"],
  [19, "Raktavikar (Blood disorder)"],
  [20, "Mutravikar (Urinary disorder)"],
  [21, "Prasutivikar (Postpartum disorder)"],
  [22, "Striroga (Gynaecological disorder)"],
  [23, "Gudavikar"],
  [24, "Netraroga (Ophthamological disorder)"],
  [25, "Karna-nasa-mukha-danta-kantha roga"],
  [26, "Shiroroga (Disease related to head)"],
  [27, "Manasvikar (Psychological disorder)"],
  [28, "Balroga (Paediatric disorder)"],
  [29, "Jarajanya vikar (Geriatric problem)"],
  [30, "Anya/vividha"],
  [31, "Other"],
];

const AGE_GROUPS = [
  "Below 6 months",
  "6 months to 1 year",
  "1 year to 4 years",
  "5 years to 9 years",
  "10 years to 19 years",
  "19 years to 59 years",
  "60 years or above",
  "Total",
];

const FISCAL_YEARS = ["2082/83", "2081/82", "2080/81", "2079/80"];

const initialData = () =>
  DISEASES.reduce((acc, [code]) => {
    acc[code] = AGE_GROUPS.reduce((a, g) => {
      a[g] = { F: 0, M: 0 };
      return a;
    }, {});
    return acc;
  }, {});

const styles = {
  root: {
    fontFamily: "'Noto Sans', 'Segoe UI', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    fontSize: 13,
  },
  nav: {
    background: "#4a90a4",
    color: "white",
    padding: "9px 18px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  navTitle: { fontWeight: 700, fontSize: 15 },
  navBreadcrumb: { color: "#c8e6f0", fontSize: 12 },
  navLink: { color: "#a8d8e8", textDecoration: "none" },
  filterBar: {
    background: "#f8f9fa",
    borderBottom: "1px solid #dde",
    padding: "10px 18px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 12,
    height: 32,
    width: 130,
    background: "white",
    outline: "none",
  },
  select: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 8px",
    fontSize: 12,
    height: 32,
    width: 110,
    background: "white",
    cursor: "pointer",
    outline: "none",
  },
  btnSearch: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "5px 14px", border: "none", borderRadius: 4,
    cursor: "pointer", fontSize: 12, height: 32,
    background: "#e53935", color: "white", fontWeight: 600,
  },
  btnPrint: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "5px 14px", border: "none", borderRadius: 4,
    cursor: "pointer", fontSize: 12, height: 32,
    background: "#1e88e5", color: "white", fontWeight: 600,
  },
  btnExport: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "5px 14px", border: "none", borderRadius: 4,
    cursor: "pointer", fontSize: 12, height: 32,
    background: "#00897b", color: "white", fontWeight: 600,
  },
  btnGroupRight: { marginLeft: "auto", display: "flex", gap: 8 },
  tableContainer: { padding: 16, overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 12,
    background: "white",
    border: "1px solid #ccc",
    minWidth: 900,
  },
  titleTh: {
    background: "#e8f4f8",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 13,
    padding: "10px 8px",
    border: "1px solid #bcd",
  },
  ageTh: {
    background: "#d0e8f0",
    textAlign: "center",
    fontWeight: 600,
    padding: "6px 4px",
    border: "1px solid #bcd",
    whiteSpace: "nowrap",
    fontSize: 11,
  },
  labelTh: {
    background: "#d0e8f0",
    fontWeight: 600,
    textAlign: "center",
    padding: "6px 8px",
    border: "1px solid #bcd",
    fontSize: 12,
  },
  fmTh: {
    background: "#e4f2f8",
    textAlign: "center",
    fontWeight: 600,
    padding: "4px 8px",
    border: "1px solid #bcd",
    color: "#555",
    fontSize: 11,
  },
  codeTd: {
    border: "1px solid #d5e5ed",
    padding: "5px 6px",
    textAlign: "center",
    fontWeight: 700,
    color: "#1565c0",
    width: 50,
  },
  nameTd: {
    border: "1px solid #d5e5ed",
    padding: "5px 10px",
    textAlign: "left",
    width: 200,
  },
  dataTd: {
    border: "1px solid #d5e5ed",
    padding: "5px 6px",
    textAlign: "center",
  },
  totalTd: {
    border: "1px solid #d5e5ed",
    padding: "5px 6px",
    textAlign: "center",
    fontWeight: 700,
    background: "#f0f8e8",
  },
};

export default function HospitalMorbidityReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fiscalYear, setFiscalYear] = useState("2082/83");
  const [data] = useState(initialData);
  const [hoveredRow, setHoveredRow] = useState(null);

  const nonTotalGroups = AGE_GROUPS.filter((g) => g !== "Total");

  return (
    <div style={styles.root}>
      {/* Top Nav */}
      <div style={styles.nav}>
        <span style={styles.navTitle}>Hospital Reporting 2</span>
        <span style={styles.navBreadcrumb}>
          &nbsp;/&nbsp;
          <a href="#" style={styles.navLink}>गृहपृष्ठ</a>
          &nbsp;/&nbsp;Hospital Reporting 2
        </span>
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <input
          style={styles.input}
          type="text"
          placeholder="सुरू मिति"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="अन्य मिति"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select
          style={styles.select}
          value={fiscalYear}
          onChange={(e) => setFiscalYear(e.target.value)}
        >
          {FISCAL_YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button style={styles.btnSearch}>🔍 खोज्नुहोस्</button>
        <div style={styles.btnGroupRight}>
          <button style={styles.btnPrint} onClick={() => window.print()}>
            🖨 प्रिन्ट
          </button>
          <button style={styles.btnExport}>⬇ निर्यात</button>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            {/* Title Row */}
            <tr>
              <th colSpan={2 + AGE_GROUPS.length * 2} style={styles.titleTh}>
                Inpatient Morbidity (No. of Patients Discharged)
              </th>
            </tr>

            {/* Age Group Headers */}
            <tr>
              <th rowSpan={2} style={styles.labelTh}>Disease Code</th>
              <th rowSpan={2} style={{ ...styles.labelTh, minWidth: 190, textAlign: "center" }}>
                Diseases
              </th>
              {AGE_GROUPS.map((g) => (
                <th key={g} colSpan={2} style={styles.ageTh}>{g}</th>
              ))}
            </tr>

            {/* F / M Sub-headers */}
            <tr>
              {AGE_GROUPS.map((g) => (
                <>
                  <th key={`${g}-F`} style={styles.fmTh}>F</th>
                  <th key={`${g}-M`} style={styles.fmTh}>M</th>
                </>
              ))}
            </tr>
          </thead>

          <tbody>
            {DISEASES.map(([code, name]) => {
              const isHovered = hoveredRow === code;
              const rowBg = isHovered
                ? "#e8f4ff"
                : code % 2 === 0
                ? "#fafcff"
                : "white";

              const rowData = data[code];
              const totalF = nonTotalGroups.reduce((s, g) => s + (rowData[g]?.F || 0), 0);
              const totalM = nonTotalGroups.reduce((s, g) => s + (rowData[g]?.M || 0), 0);

              return (
                <tr
                  key={code}
                  onMouseEnter={() => setHoveredRow(code)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ background: rowBg, transition: "background 0.15s" }}
                >
                  <td style={styles.codeTd}>{code}</td>
                  <td style={styles.nameTd}>{name}</td>
                  {nonTotalGroups.map((g) => (
                    <>
                      <td key={`${code}-${g}-F`} style={styles.dataTd}>
                        {rowData[g]?.F ?? 0}
                      </td>
                      <td key={`${code}-${g}-M`} style={styles.dataTd}>
                        {rowData[g]?.M ?? 0}
                      </td>
                    </>
                  ))}
                  <td style={styles.totalTd}>{totalF}</td>
                  <td style={styles.totalTd}>{totalM}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}