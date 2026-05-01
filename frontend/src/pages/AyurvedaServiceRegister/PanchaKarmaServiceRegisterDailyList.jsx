import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "panchkarma_records";

function getRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ── styles ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Noto+Serif+Devanagari:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Noto Sans Devanagari', sans-serif;
    background: #f0f3f8;
    color: #1a2a4a;
    min-height: 100vh;
    font-size: 13px;
  }

  /* ── breadcrumb bar ─────────────────────────── */
  .pk-bar {
    background: #fff;
    border-bottom: 1px solid #d0d9ec;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(44,74,124,.06);
  }
  .pk-bar__title {
    font-family: 'Noto Serif Devanagari', serif;
    font-size: 17px;
    font-weight: 600;
    color: #2c4a7c;
  }
  .pk-bar__crumb { font-size: 12px; color: #5a6a8a; }
  .pk-bar__crumb a { color: #3a63a8; text-decoration: none; font-weight: 500; }
  .pk-bar__crumb a:hover { text-decoration: underline; }

  /* ── main container ─────────────────────────── */
  .pk-wrap { padding: 20px 24px; max-width: 1500px; margin: 0 auto; }

  /* ── card ───────────────────────────────────── */
  .pk-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(44,74,124,.10);
    border: 1px solid #d0d9ec;
    overflow: hidden;
  }

  /* ── controls row ───────────────────────────── */
  .pk-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 18px;
    border-bottom: 1px solid #d0d9ec;
    background: #f7f9fd;
    flex-wrap: wrap;
    gap: 10px;
  }
  .pk-entries {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #5a6a8a;
    font-size: 12.5px;
  }
  .pk-entries select {
    border: 1px solid #d0d9ec;
    border-radius: 5px;
    padding: 4px 8px;
    font-family: inherit;
    font-size: 13px;
    color: #1a2a4a;
    background: #fff;
    cursor: pointer;
    outline: none;
  }
  .pk-search { display: flex; align-items: center; }
  .pk-search input {
    border: 1px solid #d0d9ec;
    padding: 6px 11px;
    font-family: inherit;
    font-size: 13px;
    color: #1a2a4a;
    background: #fff;
    outline: none;
    width: 170px;
  }
  .pk-search input:first-child { border-radius: 5px 0 0 5px; }
  .pk-search input + input { border-left: none; }
  .pk-search input::placeholder { color: #5a6a8a; }
  .pk-search button {
    background: #2c4a7c;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    padding: 7px 13px;
    font-size: 14px;
    cursor: pointer;
  }
  .pk-search button:hover { background: #3a63a8; }

  /* ── table ──────────────────────────────────── */
  .pk-table-wrap { overflow-x: auto; }

  .pk-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1200px;
    font-size: 12.5px;
  }
  .pk-table thead tr { background: #dce6f5; }
  .pk-table thead th {
    border: 1px solid #d0d9ec;
    padding: 7px 6px;
    text-align: center;
    font-weight: 600;
    color: #2c4a7c;
    font-size: 11.5px;
    vertical-align: middle;
    line-height: 1.4;
  }
  .pk-table thead th.grp {
    background: #c6d8f0;
    font-size: 12px;
    font-weight: 700;
    border-bottom: 2px solid #3a63a8;
  }

  .pk-table tbody tr { transition: background .12s; }
  .pk-table tbody tr:nth-child(even) { background: #f7f9fd; }
  .pk-table tbody tr:hover { background: #dce9fb; }
  .pk-table tbody td {
    border: 1px solid #d0d9ec;
    padding: 7px 7px;
    text-align: center;
    vertical-align: middle;
    color: #1a2a4a;
  }

  /* ── no-data ────────────────────────────────── */
  .pk-nodata {
    text-align: center;
    padding: 36px 0;
    color: #5a6a8a;
    font-size: 14px;
    border: 1px solid #d0d9ec;
    border-top: none;
    background: #fff;
  }

  /* ── pagination ─────────────────────────────── */
  .pk-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 18px;
    border-top: 1px solid #d0d9ec;
    background: #f7f9fd;
    gap: 8px;
    flex-wrap: wrap;
  }
  .pk-pagination__info { font-size: 12px; color: #5a6a8a; }
  .pk-pagination__btns { display: flex; gap: 6px; }
  .pk-btn-page {
    border: 1px solid #d0d9ec;
    background: #fff;
    color: #1a2a4a;
    padding: 6px 16px;
    border-radius: 5px;
    font-family: inherit;
    font-size: 12.5px;
    cursor: pointer;
    transition: all .14s;
  }
  .pk-btn-page:hover:not(:disabled) { background: #2c4a7c; color: #fff; border-color: #2c4a7c; }
  .pk-btn-page:disabled { opacity: .4; cursor: not-allowed; }

  /* ── action buttons ─────────────────────────── */
  .pk-act {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 13px;
    transition: background .13s;
    margin: 0 2px;
  }
  .pk-act--view   { background: #e8f4fd; color: #2980b9; }
  .pk-act--view:hover { background: #2980b9; color: #fff; }
  .pk-act--del    { background: #fde8e8; color: #c0392b; }
  .pk-act--del:hover  { background: #c0392b; color: #fff; }

  /* ── modal overlay ──────────────────────────── */
  .pk-modal-bg {
    position: fixed; inset: 0;
    background: rgba(10,20,50,.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    padding: 20px;
  }
  .pk-modal {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
    width: 100%;
    max-width: 560px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 0;
  }
  .pk-modal__head {
    background: #dce6f5;
    border-bottom: 1px solid #d0d9ec;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px 10px 0 0;
  }
  .pk-modal__head h2 {
    font-family: 'Noto Serif Devanagari', serif;
    font-size: 15px;
    font-weight: 600;
    color: #1e3a5f;
  }
  .pk-modal__close {
    background: none; border: none; font-size: 18px; cursor: pointer; color: #5a6a8a; line-height: 1;
  }
  .pk-modal__close:hover { color: #c0392b; }
  .pk-modal__body { padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; }
  .pk-modal__section {
    border: 1px solid #d0d9ec;
    border-radius: 6px;
    overflow: hidden;
  }
  .pk-modal__sec-title {
    background: #f0f3f8;
    border-bottom: 1px solid #d0d9ec;
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #2c4a7c;
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .pk-modal__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .pk-modal__row {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    border-bottom: 1px solid #f0f3f8;
  }
  .pk-modal__row:last-child { border-bottom: none; }
  .pk-modal__row--full {
    grid-column: 1 / -1;
  }
  .pk-modal__label { font-size: 11px; color: #5a6a8a; margin-bottom: 2px; font-weight: 500; }
  .pk-modal__value { font-size: 13px; color: #1a2a4a; font-weight: 500; }
  .pk-modal__value--empty { color: #aab4c8; font-style: italic; font-weight: 400; }
  .pk-modal__footer { padding: 12px 20px; border-top: 1px solid #d0d9ec; display: flex; justify-content: flex-end; }
  .pk-modal__close-btn {
    background: #2c4a7c; color: #fff; border: none; border-radius: 6px;
    padding: 8px 28px; font-size: 13px; cursor: pointer; font-family: inherit;
  }
  .pk-modal__close-btn:hover { background: #3a63a8; }

  @media (max-width: 768px) {
    .pk-wrap { padding: 12px; }
    .pk-bar { flex-direction: column; align-items: flex-start; gap: 4px; }
    .pk-modal__grid { grid-template-columns: 1fr; }
  }
`;

// ── Modal component ──────────────────────────────────────────────────────────
function RecordModal({ record, onClose }) {
  if (!record) return null;
  const val = (v) => v
    ? <span className="pk-modal__value">{v}</span>
    : <span className="pk-modal__value pk-modal__value--empty">—</span>;

  const bool = (v, label) => v
    ? <span className="pk-modal__value" style={{ color: "#166534" }}>✓ {label}</span>
    : <span className="pk-modal__value pk-modal__value--empty">—</span>;

  return (
    <div className="pk-modal-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pk-modal">
        <div className="pk-modal__head">
          <h2>सेवाग्राही विवरण — {record.sewaNo}</h2>
          <button className="pk-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="pk-modal__body">

          {/* Basic info */}
          <div className="pk-modal__section">
            <div className="pk-modal__sec-title">मूल जानकारी</div>
            <div className="pk-modal__grid">
              <div className="pk-modal__row">
                <span className="pk-modal__label">मूल दर्ता नम्बर</span>
                {val(record.mulDartaNo)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">सेवा दर्ता नम्बर</span>
                {val(record.sewaNo)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">मिति</span>
                {val(record.miti)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">सेवा दर्ता मिति</span>
                {val(record.sewaDartaMiti)}
              </div>
            </div>
          </div>

          {/* Patient */}
          <div className="pk-modal__section">
            <div className="pk-modal__sec-title">सेवाग्राहीको विवरण</div>
            <div className="pk-modal__grid">
              <div className="pk-modal__row">
                <span className="pk-modal__label">नाम</span>
                {val(record.name)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">थर</span>
                {val(record.thar)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">उमेर</span>
                {val(record.umer)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">लिङ्ग</span>
                {val(record.gender === "पु" ? "पुरुष" : record.gender === "म" ? "महिला" : record.gender)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">जाती</span>
                {val(record.jati)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">सम्पर्क नम्बर</span>
                {val(record.contact)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">जिल्ला</span>
                {val(record.district)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">गाउँ/नगरपालिका</span>
                {val(record.municipality)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">वडा नम्बर</span>
                {val(record.ward)}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">टोल</span>
                {val(record.tol)}
              </div>
              <div className="pk-modal__row pk-modal__row--full">
                <span className="pk-modal__label">प्रेषण भई आएको संस्था</span>
                {val(record.preshanSanstha)}
              </div>
            </div>
          </div>

          {/* Health */}
          <div className="pk-modal__section">
            <div className="pk-modal__sec-title">स्वास्थ्य अवस्था</div>
            <div className="pk-modal__grid">
              <div className="pk-modal__row">
                <span className="pk-modal__label">रक्तचाप</span>
                {val(record.bp ? record.bp + " mm Hg" : "")}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">तौल</span>
                {val(record.weight ? record.weight + " kg" : "")}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">FBS</span>
                {val(record.fbs ? record.fbs + " mg/dL" : "")}
              </div>
              <div className="pk-modal__row">
                <span className="pk-modal__label">रोग</span>
                {val(record.rog)}
              </div>
              <div className="pk-modal__row pk-modal__row--full">
                <span className="pk-modal__label">परीक्षण</span>
                {val(record.parikshan)}
              </div>
            </div>
          </div>

          {/* Purwa karma */}
          {record.purwa && (
            <div className="pk-modal__section">
              <div className="pk-modal__sec-title">पूर्वकर्म</div>
              <div className="pk-modal__grid">
                <div className="pk-modal__row">
                  <span className="pk-modal__label">दिपन/पाचन</span>
                  {bool(record.purwa.dipan, `दिपन (${record.purwa.dipanMiti || "—"})`)}
                </div>
                <div className="pk-modal__row">
                  <span className="pk-modal__label">स्नेहन</span>
                  {val(record.purwa.snehan)}
                </div>
                <div className="pk-modal__row">
                  <span className="pk-modal__label">स्वेदन</span>
                  {val(record.purwa.swedan)}
                </div>
              </div>
            </div>
          )}

          {/* Follow-up */}
          {record.followRows && record.followRows.some(r => r.miti || r.sewa) && (
            <div className="pk-modal__section">
              <div className="pk-modal__sec-title">फलो-अप</div>
              {record.followRows.filter(r => r.miti || r.sewa).map((r, i) => (
                <div key={i} className="pk-modal__row pk-modal__row--full">
                  <span className="pk-modal__label">फलो-अप {i + 1} — {r.miti}</span>
                  <span className="pk-modal__value">{r.sewa}{r.parikshan ? " | " + r.parikshan : ""}{r.kaifiyat ? " | " + r.kaifiyat : ""}</span>
                </div>
              ))}
            </div>
          )}

        </div>
        <div className="pk-modal__footer">
          <button className="pk-modal__close-btn" onClick={onClose}>बन्द गर्नुहोस्</button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function PanchaKarmaDailyList() {
  const [allData,      setAllData]      = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage,  setCurrentPage]  = useState(1);
  const [pageSize,     setPageSize]     = useState(10);
  const [searchId,     setSearchId]     = useState("");
  const [searchDate,   setSearchDate]   = useState("");
  const [viewRecord,   setViewRecord]   = useState(null);

  // load from storage
  const load = useCallback(() => {
    setAllData(getRecords());
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [load]);

  // filter whenever data or search terms change
  useEffect(() => {
    const idQ   = searchId.trim().toLowerCase();
    const dateQ = searchDate.trim();
    const filtered = allData.filter(r => {
      const matchId   = !idQ   || (r.mulDartaNo || "").toLowerCase().includes(idQ)
                                || (r.sewaNo    || "").toLowerCase().includes(idQ)
                                || (r.name      || "").toLowerCase().includes(idQ);
      const matchDate = !dateQ || (r.miti || "").includes(dateQ);
      return matchId && matchDate;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [allData, searchId, searchDate]);

  const handleDelete = (id) => {
    if (!window.confirm("के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?")) return;
    const updated = getRecords().filter(r => r.id !== id);
    saveRecords(updated);
    setAllData(updated);
  };

  // pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const start      = (currentPage - 1) * pageSize;
  const pageData   = filteredData.slice(start, start + pageSize);

  const infoText = filteredData.length === 0
    ? "कुनै रेकर्ड भेटिएन"
    : `देखाइएको ${start + 1}–${Math.min(start + pageSize, filteredData.length)} / जम्मा ${filteredData.length} रेकर्ड`;

  return (
    <>
      <style>{css}</style>

      {/* breadcrumb bar */}
      <div className="pk-bar">
        <div className="pk-bar__title">पञ्चकर्म सेवा दैनिक सूची</div>
        <div className="pk-bar__crumb">
          <a href="#">गृहपृष्ठ</a> / पञ्चकर्म सेवा दैनिक सूची
        </div>
      </div>

      <div className="pk-wrap">
        <div className="pk-card">

          {/* controls */}
          <div className="pk-controls">
            <div className="pk-entries">
              <span>Show</span>
              <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <span>entries</span>
            </div>

            <div className="pk-search">
              <input
                type="text"
                placeholder="नाम / मूल दर्ता / सेवा नम्बर"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                style={{ borderRadius: "5px 0 0 5px" }}
              />
              <input
                type="text"
                placeholder="मिति (dd/mm/yyyy)"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
                style={{ borderLeft: "none", width: 150 }}
              />
              <button onClick={() => {}}>&#128269;</button>
            </div>
          </div>

          {/* table */}
          <div className="pk-table-wrap">
            <table className="pk-table">
              <thead>
                <tr>
                  <th rowSpan={3} style={{ minWidth: 60 }}>कार्य</th>
                  <th rowSpan={3} style={{ minWidth: 70 }}>मिति</th>
                  <th rowSpan={3} style={{ minWidth: 42 }}>क्र.सं.</th>
                  <th rowSpan={3} style={{ minWidth: 90 }}>मूल दर्ता नम्बर</th>
                  {/* सेवा दर्ता नम्बर — 2 sub-cols */}
                  <th colSpan={2} className="grp">सेवा दर्ता नम्बर</th>
                  {/* सेवाग्राहीको — नाम, जाती, थर */}
                  <th colSpan={3} className="grp">सेवाग्राहीको</th>
                  {/* लिङ्ग — उमेर, लिङ्ग */}
                  <th colSpan={2} className="grp">लिङ्ग / उमेर</th>
                  {/* ठेगाना — जिल्ला, नगर, वडा, टोल */}
                  <th colSpan={4} className="grp">ठेगाना</th>
                  {/* सम्पर्क */}
                  <th rowSpan={3} style={{ minWidth: 90 }} className="grp">सम्पर्क नम्बर</th>
                  {/* स्वास्थ्य — bp/weight/fbs, rog/parikshan */}
                  <th colSpan={2} className="grp">स्वास्थ्य अवस्था</th>
                </tr>
                <tr>
                  <th rowSpan={2} style={{ minWidth: 80 }}>सेवा दर्ता नम्बर</th>
                  <th rowSpan={2} style={{ minWidth: 75 }}>दर्ता मिति</th>
                  <th rowSpan={2} style={{ minWidth: 90 }}>नाम</th>
                  <th rowSpan={2} style={{ minWidth: 60 }}>जाती</th>
                  <th rowSpan={2} style={{ minWidth: 60 }}>थर</th>
                  <th rowSpan={2} style={{ minWidth: 46 }}>उमेर</th>
                  <th rowSpan={2} style={{ minWidth: 46 }}>लिङ्ग</th>
                  <th rowSpan={2} style={{ minWidth: 70 }}>जिल्ला</th>
                  <th rowSpan={2} style={{ minWidth: 90 }}>गाउँ / नगरपालिका</th>
                  <th rowSpan={2} style={{ minWidth: 52 }}>वडा</th>
                  <th rowSpan={2} style={{ minWidth: 52 }}>टोल</th>
                  <th rowSpan={2} style={{ minWidth: 65 }}>रक्तचाप / तौल / FBS</th>
                  <th rowSpan={2} style={{ minWidth: 75 }}>प्रकृति / रोग / परीक्षण</th>
                </tr>
                <tr />
              </thead>
              <tbody>
                {pageData.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button className="pk-act pk-act--view" title="हेर्नुहोस्" onClick={() => setViewRecord(row)}>&#128065;</button>
                      <button className="pk-act pk-act--del"  title="मेटाउनुहोस्" onClick={() => handleDelete(row.id)}>&#128465;</button>
                    </td>
                    <td>{row.miti || "—"}</td>
                    <td>{start + i + 1}</td>
                    <td>{row.mulDartaNo || "—"}</td>
                    <td>{row.sewaNo || "—"}</td>
                    <td>{row.sewaDartaMiti || "—"}</td>
                    <td>{row.name || "—"}</td>
                    <td>{row.jati || "—"}</td>
                    <td>{row.thar || "—"}</td>
                    <td>{row.umer || "—"}</td>
                    <td>{row.gender || "—"}</td>
                    <td>{row.district || "—"}</td>
                    <td>{row.municipality || "—"}</td>
                    <td>{row.ward || "—"}</td>
                    <td>{row.tol || "—"}</td>
                    <td>{row.contact || "—"}</td>
                    <td style={{ fontSize: 11, lineHeight: 1.6 }}>
                      {row.bp    || "—"}<br />
                      {row.weight ? row.weight + " kg" : "—"}<br />
                      {row.fbs   || "—"}
                    </td>
                    <td style={{ fontSize: 11, lineHeight: 1.6 }}>
                      {row.rog       || "—"}<br />
                      {row.parikshan || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredData.length === 0 && (
              <div className="pk-nodata">No data available in table</div>
            )}
          </div>

          {/* pagination */}
          <div className="pk-pagination">
            <span className="pk-pagination__info">{infoText}</span>
            <div className="pk-pagination__btns">
              <button
                className="pk-btn-page"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >Previous</button>
              <button
                className="pk-btn-page"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >Next</button>
            </div>
          </div>

        </div>
      </div>

      {/* detail modal */}
      {viewRecord && <RecordModal record={viewRecord} onClose={() => setViewRecord(null)} />}
    </>
  );
}