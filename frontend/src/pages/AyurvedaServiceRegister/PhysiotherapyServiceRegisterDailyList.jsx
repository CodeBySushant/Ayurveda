import { useState, useCallback } from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'IBM Plex Sans', 'Noto Sans Devanagari', sans-serif",
    background: "#f0f2f7",
    minHeight: "100vh",
    color: "#1a1f3a",
  },
  breadcrumbBar: {
    background: "#ffffff",
    borderBottom: "1px solid #dde1f0",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
  },
  breadcrumbTitle: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#1a1f3a",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    flex: 1,
  },
  crumbHome: {
    color: "#3b5bdb",
    cursor: "pointer",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  },
  crumbSep: { color: "#6b7399" },
  crumbCurrent: {
    color: "#6b7399",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  },
  card: {
    margin: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #dde1f0",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(59,91,219,0.06)",
  },
  controls: {
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    borderBottom: "1px solid #dde1f0",
    flexWrap: "wrap",
  },
  controlsLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#6b7399",
  },
  select: {
    border: "1px solid #dde1f0",
    borderRadius: "5px",
    padding: "4px 8px",
    fontSize: "13px",
    color: "#1a1f3a",
    background: "#ffffff",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  controlsRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  searchLabel: {
    border: "1px solid #dde1f0",
    borderRadius: "5px 0 0 5px",
    padding: "6px 12px",
    fontSize: "13px",
    color: "#6b7399",
    background: "#eef0f8",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    minWidth: "140px",
  },
  dateInput: {
    border: "1px solid #dde1f0",
    borderLeft: "none",
    padding: "6px 10px",
    fontSize: "13px",
    color: "#1a1f3a",
    background: "#ffffff",
    fontFamily: "inherit",
    width: "120px",
    outline: "none",
  },
  btnSearch: {
    background: "#3b5bdb",
    color: "white",
    border: "none",
    borderRadius: "0 5px 5px 0",
    padding: "7px 12px",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
  },
  addBtn: {
    background: "#3b5bdb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "7px 16px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    fontWeight: 500,
  },
  tableWrap: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    background: "#eef0f8",
    border: "1px solid #dde1f0",
    padding: "8px 10px",
    textAlign: "center",
    fontWeight: 600,
    color: "#1a1f3a",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    lineHeight: 1.5,
  },
  thGroup: {
    background: "#e6e9f4",
    border: "1px solid #dde1f0",
    padding: "8px 10px",
    textAlign: "center",
    fontWeight: 600,
    color: "#1a1f3a",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  td: {
    border: "1px solid #dde1f0",
    padding: "9px 10px",
    textAlign: "center",
    color: "#1a1f3a",
    verticalAlign: "middle",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    fontSize: "13px",
  },
  noData: {
    border: "1px solid #dde1f0",
    padding: "32px",
    textAlign: "center",
    color: "#6b7399",
    fontStyle: "italic",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "13px",
  },
  pagination: {
    padding: "12px 18px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "6px",
    borderTop: "1px solid #dde1f0",
    alignItems: "center",
  },
  pagInfo: {
    fontSize: "13px",
    color: "#6b7399",
    marginRight: "auto",
  },
  pagBtn: {
    border: "1px solid #dde1f0",
    background: "#ffffff",
    color: "#1a1f3a",
    padding: "5px 14px",
    borderRadius: "5px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  pagBtnDisabled: {
    border: "1px solid #dde1f0",
    background: "#ffffff",
    color: "#1a1f3a",
    padding: "5px 14px",
    borderRadius: "5px",
    fontSize: "13px",
    cursor: "not-allowed",
    opacity: 0.45,
    fontFamily: "inherit",
  },
  actionBtn: {
    background: "#e8ecff",
    color: "#3b5bdb",
    border: "1px solid #3b5bdb",
    borderRadius: "4px",
    padding: "3px 10px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    marginRight: "4px",
  },
  deleteBtn: {
    background: "#fff5f5",
    color: "#c0392b",
    border: "1px solid #c0392b",
    borderRadius: "4px",
    padding: "3px 10px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 100,
    overflowY: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 16px",
  },
  modalBox: {
    background: "white",
    maxWidth: "700px",
    width: "100%",
    borderRadius: "12px",
    padding: "28px",
    position: "relative",
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
  },
  modalTitle: {
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    fontSize: "17px",
    fontWeight: 600,
    color: "#1a1f3a",
    marginBottom: "20px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  formField: { display: "flex", flexDirection: "column", gap: "4px" },
  formLabel: {
    fontSize: "12px",
    color: "#6b7399",
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  },
  formInput: {
    border: "1px solid #dde1f0",
    borderRadius: "5px",
    padding: "7px 10px",
    fontSize: "13px",
    fontFamily: "inherit",
    outline: "none",
    color: "#1a1f3a",
  },
  modalActions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    border: "1px solid #dde1f0",
    background: "#f0f2f7",
    color: "#6b7399",
    borderRadius: "6px",
    padding: "8px 20px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  saveBtn: {
    background: "#3b5bdb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 500,
  },
};

// ─── EMPTY FORM STATE ─────────────────────────────────────────────────────────
const emptyForm = {
  miti: "",
  mul_darta: "",
  seva_darta: "",
  seva_miti: "",
  naam: "",
  thar: "",
  jaati: "",
  linga: "",
  umer: "",
  jilla: "",
  gaun: "",
  wada: "",
  tol: "",
  contact: "",
  bp: "",
  weight: "",
  fbs: "",
  rog: "",
  exam: "",
};

// ─── FORM FIELDS CONFIG ───────────────────────────────────────────────────────
const FORM_FIELDS = [
  { key: "miti", label: "मिति *", placeholder: "dd/mm/yyyy" },
  { key: "mul_darta", label: "मूल दर्ता नम्बर *", placeholder: "" },
  { key: "seva_darta", label: "सेवा दर्ता नम्बर *", placeholder: "" },
  { key: "seva_miti", label: "सेवा दर्ता मिति", placeholder: "dd/mm/yyyy" },
  { key: "naam", label: "नाम *", placeholder: "" },
  { key: "thar", label: "थर *", placeholder: "" },
  { key: "jaati", label: "जाती", placeholder: "" },
  { key: "linga", label: "लिङ्ग", type: "select", options: ["", "पुरुष", "महिला", "अन्य"] },
  { key: "umer", label: "उमेर", type: "number", placeholder: "" },
  { key: "jilla", label: "जिल्ला", placeholder: "" },
  { key: "gaun", label: "गाउँ/नगरपालिका", placeholder: "" },
  { key: "wada", label: "वडा नम्बर", placeholder: "" },
  { key: "tol", label: "टोल", placeholder: "" },
  { key: "contact", label: "सम्पर्क नम्बर", placeholder: "" },
  { key: "bp", label: "रक्तचाप", placeholder: "" },
  { key: "weight", label: "तौल", placeholder: "" },
  { key: "fbs", label: "FBS", placeholder: "" },
  { key: "rog", label: "प्रकृति रोग", placeholder: "" },
  { key: "exam", label: "परीक्षण", placeholder: "", span: 2 },
];

// ─── SEARCH ICON ──────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="6" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ─── MODAL COMPONENT ──────────────────────────────────────────────────────────
function RecordModal({ isOpen, editIndex, initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || emptyForm);

  // sync when opening for edit
  useState(() => { setForm(initialData || emptyForm); }, [initialData]);

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    // ── TODO: Replace with real API call ──────────────────────────────────────
    // const method = editIndex === null ? "POST" : "PUT";
    // const url = editIndex === null ? "/api/physiotherapy" : `/api/physiotherapy/${form.id}`;
    // await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    // ─────────────────────────────────────────────────────────────────────────
    onSave(form, editIndex);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modalBox}>
        <div style={styles.modalTitle}>
          {editIndex === null ? "नयाँ सेवाग्राही दर्ता" : "रेकर्ड सम्पादन"}
        </div>
        <div style={styles.formGrid}>
          {FORM_FIELDS.map((field) => (
            <div
              key={field.key}
              style={{ ...styles.formField, gridColumn: field.span === 2 ? "span 2" : "span 1" }}
            >
              <label style={styles.formLabel}>{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={form[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  style={styles.formInput}
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt || "छान्नुहोस्"}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  style={styles.formInput}
                />
              )}
            </div>
          ))}
        </div>
        <div style={styles.modalActions}>
          <button style={styles.cancelBtn} onClick={onClose}>रद्द गर्नुहोस्</button>
          <button style={styles.saveBtn} onClick={handleSave}>सुरक्षित गर्नुहोस्</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PhysiotherapyDailyList() {
  // ── DATA STATE ──────────────────────────────────────────────────────────────
  // To load from API, replace with:
  // const [records, setRecords] = useState([]);
  // useEffect(() => { fetch('/api/physiotherapy').then(r=>r.json()).then(setRecords); }, []);
  const [records, setRecords] = useState([]);

  // ── UI STATE ────────────────────────────────────────────────────────────────
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState("18/01/2083");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  // ── FILTERING & PAGINATION ──────────────────────────────────────────────────
  const filtered = searchDate
    ? records.filter((r) => r.miti === searchDate)
    : records;
  const total = filtered.length;
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageRecords = filtered.slice(start, end);

  const pagInfo =
    total === 0
      ? "Showing 0 entries"
      : `Showing ${start + 1} to ${end} of ${total} entries`;

  // ── HANDLERS ────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditIndex(null);
    setEditData({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (globalIdx) => {
    setEditIndex(globalIdx);
    setEditData({ ...records[globalIdx] });
    setModalOpen(true);
  };

  const handleDelete = (globalIdx) => {
    if (!window.confirm("के तपाईं यो रेकर्ड हटाउन चाहनुहुन्छ?")) return;
    // ── TODO: Replace with API call ──────────────────────────────────────────
    // await fetch(`/api/physiotherapy/${records[globalIdx].id}`, { method: "DELETE" });
    // ────────────────────────────────────────────────────────────────────────
    setRecords((prev) => prev.filter((_, i) => i !== globalIdx));
  };

  const handleSave = useCallback((form, idx) => {
    if (idx === null) {
      setRecords((prev) => [...prev, form]);
    } else {
      setRecords((prev) => prev.map((r, i) => (i === idx ? form : r)));
    }
    setModalOpen(false);
    setCurrentPage(1);
  }, []);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');`}</style>

      {/* Breadcrumb */}
      <div style={styles.breadcrumbBar}>
        <span style={styles.breadcrumbTitle}>फिजियोथेरापी सेवा दैनिक सूची</span>
        <span style={styles.crumbHome}>गृहपृष्ठ</span>
        <span style={styles.crumbSep}>/</span>
        <span style={styles.crumbCurrent}>फिजियोथेरापी सेवा दैनिक सूची</span>
      </div>

      {/* Card */}
      <div style={styles.card}>
        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.controlsLeft}>
            Show
            <select style={styles.select} value={pageSize} onChange={handlePageSizeChange}>
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            entries
          </div>
          <div style={styles.controlsRight}>
            <button style={styles.addBtn} onClick={openAdd}>+ नयाँ थप्नुहोस्</button>
            <div style={{ display: "flex" }}>
              <div style={styles.searchLabel}>मूल दर्ता नम्बर</div>
              <input
                style={styles.dateInput}
                type="text"
                value={searchDate}
                onChange={(e) => { setSearchDate(e.target.value); setCurrentPage(1); }}
              />
              <button style={styles.btnSearch}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th rowSpan={4} style={styles.th}>मिति</th>
                <th rowSpan={4} style={styles.th}>क्र.सं.</th>
                <th rowSpan={4} style={styles.th}>मूल दर्ता नम्बर</th>
                <th colSpan={2} style={styles.th}>सेवा दर्ता नम्बर</th>
                <th colSpan={3} style={styles.th}>सेवाग्राहीको</th>
                <th rowSpan={4} style={styles.th}>जाती</th>
                <th colSpan={2} style={styles.th}>लिङ्ग</th>
                <th colSpan={4} style={styles.thGroup}>ठेगाना</th>
                <th rowSpan={4} style={styles.th}>सम्पर्क नम्बर</th>
                <th colSpan={3} style={styles.thGroup}>स्वास्थ्य अवस्था</th>
                <th rowSpan={4} style={styles.th}>कार्य</th>
              </tr>
              <tr>
                <th rowSpan={3} style={styles.th}>नम्बर</th>
                <th rowSpan={3} style={styles.th}>मिति</th>
                <th rowSpan={3} style={styles.th}>नाम</th>
                <th rowSpan={3} style={styles.th}>थर</th>
                <th rowSpan={3} style={styles.th}></th>
                <th rowSpan={3} style={styles.th}>जिल्ला</th>
                <th rowSpan={3} style={styles.th}>उमेर</th>
                <th rowSpan={3} style={styles.th}>वडा नम्बर</th>
                <th rowSpan={3} style={styles.th}>गाउँ/नगरपालिका</th>
                <th rowSpan={3} style={styles.th}>टोल</th>
                <th rowSpan={3} style={styles.th}>रक्तचाप<br />तौल<br />FBS</th>
                <th rowSpan={3} style={styles.th}>प्रकृति रोग<br />परीक्षण</th>
                <th rowSpan={3} style={styles.th}></th>
              </tr>
              <tr />
              <tr />
            </thead>
            <tbody>
              {pageRecords.length === 0 ? (
                <tr>
                  <td colSpan={21} style={styles.noData}>No data available in table</td>
                </tr>
              ) : (
                pageRecords.map((r, i) => {
                  const globalIdx = records.indexOf(r);
                  return (
                    <tr key={globalIdx} style={{ background: i % 2 === 0 ? "#fff" : "#f9faff" }}>
                      <td style={styles.td}>{r.miti}</td>
                      <td style={styles.td}>{start + i + 1}</td>
                      <td style={styles.td}>{r.mul_darta}</td>
                      <td style={styles.td}>{r.seva_darta}</td>
                      <td style={styles.td}>{r.seva_miti}</td>
                      <td style={styles.td}>{r.naam}</td>
                      <td style={styles.td}>{r.thar}</td>
                      <td style={styles.td}></td>
                      <td style={styles.td}>{r.jaati}</td>
                      <td style={styles.td}>{r.linga}</td>
                      <td style={styles.td}>{r.umer}</td>
                      <td style={styles.td}>{r.jilla}</td>
                      <td style={styles.td}>{r.wada}</td>
                      <td style={styles.td}>{r.gaun}</td>
                      <td style={styles.td}>{r.tol}</td>
                      <td style={styles.td}>{r.contact}</td>
                      <td style={styles.td}>
                        {r.bp && <div>{r.bp}</div>}
                        {r.weight && <div>{r.weight}</div>}
                        {r.fbs && <div>{r.fbs}</div>}
                      </td>
                      <td style={styles.td}>
                        {r.rog && <div>{r.rog}</div>}
                        {r.exam && <div>{r.exam}</div>}
                      </td>
                      <td style={styles.td}></td>
                      <td style={styles.td}>
                        <button style={styles.actionBtn} onClick={() => openEdit(globalIdx)}>सम्पादन</button>
                        <button style={styles.deleteBtn} onClick={() => handleDelete(globalIdx)}>हटाउ</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={styles.pagInfo}>{pagInfo}</span>
          <button
            style={currentPage <= 1 ? styles.pagBtnDisabled : styles.pagBtn}
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
          <button
            style={end >= total ? styles.pagBtnDisabled : styles.pagBtn}
            disabled={end >= total}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <RecordModal
        isOpen={modalOpen}
        editIndex={editIndex}
        initialData={editData}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}