import { useState } from "react";

const FISCAL_YEARS = ["आर्थिक वर्ष", "२०८२/८३", "२०८१/८२", "२०८०/७९", "२०७९/७८"];

const AGE_GROUPS = ["०-६/२२", "७/२२-१", "२-४", "५-१६", "१७-५९", ">=६०"];
const GENDERS = ["महिला", "पुरुष", "जम्मा"];
const CASTE_GROUPS = ["दलित", "जनजाति", "मधेशी", "मुस्लिम", "ब्राह्मण/क्षेत्री", "अन्य"];

const SECTIONS = [
  { id: 1, title: "जम्मा सेवाग्राही (महल नं. १)", type: "age" },
  { id: 2, title: "नयाँ सेवाग्राही (महल नं. २)", type: "age" },
  { id: 3, title: "पुनरावृत सेवाग्राही (महल नं. ३)", type: "age" },
  { id: 4, title: "जातीगत आधारमा सेवाग्राही (महल नं. ५)", type: "caste" },
];

const zeroAgeData = () =>
  GENDERS.reduce((acc, g) => {
    acc[g] = AGE_GROUPS.reduce((a, ag) => { a[ag] = 0; return a; }, {});
    return acc;
  }, {});

const zeroCasteData = () =>
  GENDERS.reduce((acc, g) => {
    acc[g] = CASTE_GROUPS.reduce((a, c) => { a[c] = 0; return a; }, {});
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
  label: { fontSize: 13, color: "#555", fontWeight: 500 },
  input: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 13,
    height: 34,
    background: "white",
    outline: "none",
    width: 130,
  },
  searchBtn: {
    background: "#3fa7bf",
    color: "white",
    border: "none",
    borderRadius: 4,
    width: 36,
    height: 34,
    fontSize: 16,
    cursor: "pointer",
  },
  printBtn: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "5px 16px",
    height: 34,
    fontSize: 13,
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 600,
  },
  pageBody: { padding: "8px 20px 24px" },
  sectionBlock: {
    background: "white",
    border: "1px solid #dde",
    borderRadius: 4,
    marginBottom: 18,
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  sectionTitleTh: {
    background: "#eaf3f7",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 13,
    padding: "8px",
    border: "1px solid #d0dde8",
    color: "#2c5f7a",
  },
  groupTh: {
    background: "#f0f6f9",
    textAlign: "center",
    fontWeight: 600,
    padding: "6px 4px",
    border: "1px solid #d0dde8",
    fontSize: 12,
    color: "#444",
  },
  ageTh: {
    background: "#f5f8fb",
    textAlign: "center",
    fontWeight: 500,
    padding: "5px 6px",
    border: "1px solid #dde",
    fontSize: 12,
    color: "#555",
  },
  labelTh: {
    background: "#f0f6f9",
    fontWeight: 600,
    textAlign: "center",
    padding: "6px 10px",
    border: "1px solid #d0dde8",
    fontSize: 13,
    width: 80,
    color: "#333",
  },
  genderTd: {
    border: "1px solid #dde",
    padding: "6px 10px",
    textAlign: "center",
    background: "#fafcff",
    fontWeight: 500,
    color: "#333",
  },
  dataTd: {
    border: "1px solid #eee",
    padding: "6px 8px",
    textAlign: "center",
    color: "#555",
  },
  totalTd: {
    border: "1px solid #dde",
    padding: "6px 8px",
    textAlign: "center",
    fontWeight: 700,
    background: "#f5f8e8",
    color: "#333",
  },
  jammaRowTd: {
    border: "1px solid #dde",
    padding: "6px 8px",
    textAlign: "center",
    fontWeight: 700,
    background: "#eaf3f7",
    color: "#222",
  },
  jammaLabelTd: {
    border: "1px solid #dde",
    padding: "6px 10px",
    textAlign: "center",
    fontWeight: 700,
    background: "#eaf3f7",
    color: "#222",
  },
};

function AgeTable({ data }) {
  return (
    <table style={s.table}>
      <thead>
        <tr>
          <th rowSpan={3} style={s.labelTh}>लिङ्ग</th>
          <th colSpan={AGE_GROUPS.length} style={s.groupTh}>उमेर समुह</th>
          <th rowSpan={3} style={{ ...s.labelTh, background: "#eaf3f7" }}>जम्मा</th>
        </tr>
        <tr>
          {AGE_GROUPS.map(ag => (
            <th key={ag} style={s.ageTh}>{ag}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {GENDERS.map((g) => {
          const isJamma = g === "जम्मा";
          const rowTotal = AGE_GROUPS.reduce((s, ag) => s + (data[g]?.[ag] || 0), 0);
          return (
            <tr key={g}>
              <td style={isJamma ? s.jammaLabelTd : s.genderTd}>{g}</td>
              {AGE_GROUPS.map(ag => (
                <td key={ag} style={isJamma ? s.jammaRowTd : s.dataTd}>
                  {data[g]?.[ag] ?? 0}
                </td>
              ))}
              <td style={isJamma ? s.jammaRowTd : s.totalTd}>{rowTotal}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function CasteTable({ data }) {
  return (
    <table style={s.table}>
      <thead>
        <tr>
          <th rowSpan={2} style={s.labelTh}>लिङ्ग</th>
          <th colSpan={CASTE_GROUPS.length} style={s.groupTh}>जात/जाती समुह</th>
          <th rowSpan={2} style={{ ...s.labelTh, background: "#eaf3f7" }}>जम्मा</th>
        </tr>
        <tr>
          {CASTE_GROUPS.map(c => (
            <th key={c} style={s.ageTh}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {GENDERS.map((g) => {
          const isJamma = g === "जम्मा";
          const rowTotal = CASTE_GROUPS.reduce((s, c) => s + (data[g]?.[c] || 0), 0);
          return (
            <tr key={g}>
              <td style={isJamma ? s.jammaLabelTd : s.genderTd}>{g}</td>
              {CASTE_GROUPS.map(c => (
                <td key={c} style={isJamma ? s.jammaRowTd : s.dataTd}>
                  {data[g]?.[c] ?? 0}
                </td>
              ))}
              <td style={isJamma ? s.jammaRowTd : s.totalTd}>{rowTotal}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function MoolDartaPratiwedan() {
  const [fiscalYear, setFiscalYear] = useState("आर्थिक वर्ष");
  const [mitiDekhi, setMitiDekhi]  = useState("");
  const [mitiSamma, setMitiSamma]  = useState("");

  const ageData  = zeroAgeData();
  const casteData = zeroCasteData();

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>मूल दर्ता प्रतिवेदन</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>गृहपृष्ठ</a>
          {" / "}मूल दर्ता प्रतिवेदन
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

        <button style={s.printBtn} onClick={() => window.print()}>
          🖨 प्रिन्ट गर्नुहोस्
        </button>
      </div>

      {/* Sections */}
      <div style={s.pageBody}>
        {SECTIONS.map(section => (
          <div key={section.id} style={s.sectionBlock}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th
                    colSpan={section.type === "age" ? AGE_GROUPS.length + 2 : CASTE_GROUPS.length + 2}
                    style={s.sectionTitleTh}
                  >
                    {section.title}
                  </th>
                </tr>
              </thead>
            </table>
            {section.type === "age"
              ? <AgeTable data={ageData} />
              : <CasteTable data={casteData} />
            }
          </div>
        ))}
      </div>
    </div>
  );
}