import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .root {
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    background: #f0f2f5;
    min-height: 100vh;
    font-size: 13px;
    color: #374151;
  }

  /* ── Page Header ── */
  .page-header {
    background: #dde3ef;
    border-bottom: 1px solid #c5cede;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page-header h1 { font-size: 16px; font-weight: 700; color: #1e3a5f; }
  .breadcrumb { font-size: 12px; color: #6b7280; }
  .breadcrumb a { color: #2563eb; text-decoration: none; }
  .breadcrumb a:hover { text-decoration: underline; }

  /* ── Main Content ── */
  .content { padding: 16px 20px; }

  /* ── Filter Bar ── */
  .filter-bar {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    justify-content: space-between;
  }
  .filter-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .filter-label { font-size: 13px; font-weight: 500; color: #374151; white-space: nowrap; }
  .slash { font-size: 18px; color: #6b7280; font-weight: 300; }

  .inp, .sel {
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 12.5px;
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    background: #fff;
    color: #374151;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    appearance: none;
    -webkit-appearance: none;
  }
  .inp:focus, .sel:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.12);
  }
  .inp::placeholder { color: #9ca3af; }
  .sel {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    padding-right: 26px;
    cursor: pointer;
  }
  .sel-fiscal { min-width: 160px; }
  .inp-date { width: 130px; }

  .btn-search {
    background: #0ea5e9;
    color: white;
    border: none;
    border-radius: 4px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
    flex-shrink: 0;
  }
  .btn-search:hover { background: #0284c7; }
  .btn-search svg { width: 16px; height: 16px; fill: white; }

  .btn-print {
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 7px 14px;
    font-size: 12.5px;
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
    white-space: nowrap;
  }
  .btn-print:hover { background: #1d4ed8; }
  .btn-print svg { width: 14px; height: 14px; fill: white; flex-shrink: 0; }

  /* ── Table Card ── */
  .table-card {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    overflow: hidden;
  }

  .show-entries {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    font-size: 13px;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }
  .show-entries select {
    padding: 3px 22px 3px 6px;
    border: 1px solid #d1d5db;
    border-radius: 3px;
    font-size: 12.5px;
    font-family: inherit;
    background: #fff;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 6px center;
    outline: none;
    cursor: pointer;
  }

  /* ── Data Table ── */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 900px; }

  thead th {
    background: #f1f5f9;
    color: #1e3a5f;
    font-weight: 700;
    padding: 8px 10px;
    border: 1px solid #d1d5db;
    text-align: center;
    vertical-align: middle;
    font-size: 12.5px;
    line-height: 1.4;
  }
  thead th.rotate-label { vertical-align: bottom; }

  tbody tr:hover { background: #f8fafc; }
  tbody td {
    padding: 7px 10px;
    border: 1px solid #e5e7eb;
    text-align: center;
    vertical-align: middle;
    color: #374151;
  }

  .no-data {
    text-align: center;
    padding: 28px;
    color: #9ca3af;
    font-size: 13px;
    background: #fafafa;
  }

  /* ── Pagination + Summary ── */
  .table-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 14px;
    border-top: 1px solid #e5e7eb;
    gap: 6px;
  }
  .pg-btn {
    padding: 5px 14px;
    border: 1px solid #d1d5db;
    border-radius: 3px;
    background: #fff;
    font-size: 12.5px;
    font-family: inherit;
    cursor: pointer;
    color: #374151;
    transition: background 0.13s;
  }
  .pg-btn:hover:not(:disabled) { background: #f1f5f9; }
  .pg-btn:disabled { color: #9ca3af; cursor: not-allowed; }
  .pg-info { font-size: 12.5px; color: #6b7280; padding: 0 8px; }

  .summary {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 32px;
    padding: 14px 20px 6px;
    font-size: 14px;
    font-weight: 700;
    color: #1e3a5f;
  }
  .summary-value { font-size: 16px; font-weight: 700; color: #1e3a5f; }

  @media (max-width: 700px) {
    .filter-bar { flex-direction: column; align-items: flex-start; }
    .filter-left { flex-direction: column; align-items: flex-start; }
  }
`;

const FISCAL_YEARS = ["२०७९/०८०", "२०८०/०८१", "२०८१/०८२", "२०८२/०८३", "२०८३/०८४"];

// Sample data for demonstration
const SAMPLE_DATA = [
  { miti: "2083-01-15", pahilo: "MUL-001", punaravrit: "MUL-001R", naam: "राम", thar: "शर्मा", jaati: "ब्राह्मण", linga: "पुरुष", umer: "45", jilla: "काठमाडौं", gaun: "बुढानीलकण्ठ", tol: "टोखा", wada: "3", samparka: "9841000001", sewaSkim: "OPD" },
  { miti: "2083-01-16", pahilo: "MUL-002", punaravrit: "", naam: "सीता", thar: "थापा", jaati: "जनजाति", linga: "महिला", umer: "32", jilla: "ललितपुर", gaun: "ललितपुर", tol: "पुल्चोक", wada: "5", samparka: "9851000002", sewaSkim: "IPD" },
  { miti: "2083-01-17", pahilo: "MUL-003", punaravrit: "MUL-003R", naam: "हरि", thar: "पौडेल", jaati: "ब्राह्मण", linga: "पुरुष", umer: "60", jilla: "भक्तपुर", gaun: "भक्तपुर", tol: "सुर्यविनायक", wada: "8", samparka: "9861000003", sewaSkim: "Emergency" },
];

export default function MulDartaPratibedan2() {
  const [fiscalYear, setFiscalYear] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    // In real app, fetch from API. Here we show sample data.
    setTableData(SAMPLE_DATA);
    setSearched(true);
    setCurrentPage(1);
  };

  const handlePrint = () => window.print();

  const totalPages = Math.max(1, Math.ceil(tableData.length / pageSize));
  const paginated = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <style>{styles}</style>
      <div className="root">

        {/* Page Header */}
        <div className="page-header">
          <h1>मूल दर्ता प्रतिवेदन २</h1>
          <div className="breadcrumb">
            <a href="#">गृहपृष्ठ</a> &nbsp;/&nbsp; मूल दर्ता प्रतिवेदन २
          </div>
        </div>

        <div className="content">

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-left">
              {/* Fiscal Year */}
              <select
                className="sel sel-fiscal"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
              >
                <option value="">आर्थिक वर्ष</option>
                {FISCAL_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>

              <span className="slash">/</span>

              {/* From date */}
              <input
                className="inp inp-date"
                placeholder="मिति"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />

              <span className="filter-label">देखि</span>

              {/* To date */}
              <input
                className="inp inp-date"
                placeholder="मिति"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />

              <span className="filter-label">सम्म</span>

              {/* Search button */}
              <button type="button" className="btn-search" onClick={handleSearch} title="खोज्नुहोस्">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Print Button */}
            <button type="button" className="btn-print" onClick={handlePrint}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              प्रिन्ट गर्नुहोस्
            </button>
          </div>

          {/* Table Card */}
          <div className="table-card">

            {/* Show entries */}
            <div className="show-entries">
              <span>Show</span>
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <span>entries</span>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {/* Row 1 - top headers */}
                    <th rowSpan={3} style={{ minWidth: 70 }}>मिति</th>
                    <th colSpan={2}>दर्ता नम्बर</th>
                    <th colSpan={3}>सेवाग्राहीको</th>
                    <th colSpan={2}>लिङ्ग</th>
                    <th colSpan={3}>ठेगाना</th>
                    <th rowSpan={3} style={{ minWidth: 110 }}>सम्पर्क नम्बर</th>
                    <th rowSpan={3} style={{ minWidth: 100 }}>सेवाको किसिम</th>
                  </tr>
                  <tr>
                    {/* Row 2 */}
                    <th rowSpan={2} style={{ minWidth: 90 }}>पहिलो पटक</th>
                    <th rowSpan={2} style={{ minWidth: 90 }}>पुनरावृत</th>
                    <th rowSpan={2} style={{ minWidth: 80 }}>नाम</th>
                    <th rowSpan={2} style={{ minWidth: 80 }}>जाती</th>
                    <th rowSpan={2} style={{ minWidth: 70 }}>थर</th>
                    <th rowSpan={2} style={{ minWidth: 60 }}>उमेर</th>
                    <th rowSpan={2} style={{ minWidth: 60 }}></th>
                    <th rowSpan={2} style={{ minWidth: 80 }}>जिल्ला</th>
                    <th rowSpan={2} style={{ minWidth: 110 }}>गाउँ/नगरपालिका</th>
                    <th rowSpan={2} style={{ minWidth: 80 }}>टोल</th>
                  </tr>
                  <tr>
                    {/* Row 3 - wada under ठेगाना */}
                  </tr>
                  {/* Corrected merged header */}
                  <tr>
                    <th style={{ background: "#e8edf5", color: "#1e3a5f", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}>वडा नम्बर</th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                    <th style={{ background: "#e8edf5", borderTop: "none" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="no-data">
                        {searched ? "कुनै डाटा फेला परेन।" : "No data available in table"}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((row, i) => (
                      <tr key={i}>
                        <td>{row.miti}</td>
                        <td>{row.pahilo}</td>
                        <td>{row.punaravrit || "—"}</td>
                        <td>{row.naam}</td>
                        <td>{row.jaati}</td>
                        <td>{row.thar}</td>
                        <td>{row.umer}</td>
                        <td>{row.linga}</td>
                        <td>{row.jilla}</td>
                        <td>{row.gaun}</td>
                        <td>{row.tol}<br/><small style={{color:"#6b7280"}}>वडा: {row.wada}</small></td>
                        <td>{row.samparka}</td>
                        <td>{row.sewaSkim}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="table-footer">
              <button
                className="pg-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >Previous</button>
              <span className="pg-info">Page {currentPage} of {totalPages}</span>
              <button
                className="pg-btn"
                disabled={currentPage === totalPages || tableData.length === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
              >Next</button>
            </div>
          </div>

          {/* Summary */}
          <div className="summary">
            <span>कुल दर्ता :</span>
            <span className="summary-value">{tableData.length}</span>
          </div>

        </div>
      </div>
    </>
  );
}