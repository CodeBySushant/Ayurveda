import { useState } from "react";

const S = {
  page:        { padding: "24px", backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif", boxSizing: "border-box" },
  card:        { backgroundColor: "#fff", borderRadius: "8px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "1200px", margin: "0 auto" },
  headerBar:   { display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f1f5f9", border: "1px solid #d1d5db", borderRadius: "6px", padding: "10px 16px", marginBottom: "16px" },
  headerTitle: { fontSize: "17px", fontWeight: "700", color: "#1f2937" },
  breadcrumb:  { fontSize: "12px", color: "#6b7280" },
  bcLink:      { color: "#0d9488", cursor: "pointer" },
  mitiRow:     { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  mitiLabel:   { fontSize: "13px", fontWeight: "600", color: "#374151" },
  inputRO:     { border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#6b7280", backgroundColor: "#f9fafb", outline: "none", fontFamily: "inherit", width: "200px" },
  input:       { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  select:      { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", cursor: "pointer", fontFamily: "inherit" },
  textarea:    { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 8px", fontSize: "12px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: "60px" },
  label:       { fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "5px", display: "block" },
  field:       { display: "flex", flexDirection: "column" },
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  topGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "20px", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  leftCol:     { padding: "18px 20px", borderRight: "1px solid #d1d5db", display: "flex", flexDirection: "column", gap: "16px" },
  rightCol:    { padding: "18px 20px", display: "flex", flexDirection: "column", gap: "14px" },
  secTitle:    { textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#1f2937", marginBottom: "4px" },
  // sewa section
  sewaSection: { border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden", marginBottom: "20px" },
  sewaTitle:   { backgroundColor: "#f8fafc", borderBottom: "1px solid #d1d5db", textAlign: "center", padding: "10px", fontSize: "14px", fontWeight: "600", color: "#374151" },
  table:       { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th:          { backgroundColor: "#e5e7eb", color: "#374151", fontWeight: "600", padding: "9px 10px", border: "1px solid #d1d5db", textAlign: "center", whiteSpace: "nowrap" },
  td:          { padding: "8px 8px", border: "1px solid #d1d5db", verticalAlign: "top" },
  tdc:         { padding: "8px 8px", border: "1px solid #d1d5db", verticalAlign: "middle", textAlign: "center" },
  submitWrap:  { display: "flex", justifyContent: "center", marginTop: "8px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "11px 52px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
};

const PRAKRITI_OPTIONS = ["वात", "पित्त", "कफ", "वात-पित्त", "पित्त-कफ", "वात-कफ", "त्रिदोष"];
const ROG_OPTIONS      = ["अस्थि रोग", "मांसपेशी रोग", "न्यूरोलजी", "खेलकुद चोट", "अन्य"];
const LINGA_OPTIONS    = [{ v: "male", l: "पुरुष" }, { v: "female", l: "महिला" }, { v: "other", l: "अन्य" }];
const JAATI_OPTIONS    = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS    = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];
const SEWA_OPTIONS     = ["इलेक्ट्रोथेरापी", "म्यानुअल थेरापी", "व्यायाम थेरापी", "हाइड्रोथेरापी", "अन्य"];
const UPSEWA_OPTIONS   = ["TENS", "IFT", "UST", "SWD", "Hot Pack", "Cold Pack", "Massage", "Exercise", "अन्य"];

const newRow = () => ({ id: Date.now() + Math.random(), miti: "", sewa: "", upSewa: "", jatilata: "", parikshan: "", kaifiyat: "" });

export default function PhysiotherapyServiceRegister() {
  const today = "18/01/2083";

  const [form, setForm] = useState({
    moolDarta: "",
    raktachap: "", taul: "", fbs: "", prakriti: "", rog: "", parikshan: "",
    naam: "", thar: "", umer: "", linga: "",
    samparkNum: "", jaati: "", wada: "", tol: "", jilla: "",
  });
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const [rows, setRows] = useState([newRow()]);
  const addRow    = () => setRows((r) => [...r, newRow()]);
  const removeRow = (id) => setRows((r) => r.length > 1 ? r.filter((x) => x.id !== id) : r);
  const updateRow = (id, f, val) => setRows((r) => r.map((x) => x.id === id ? { ...x, [f]: val } : x));

  const handleSubmit = () => alert("फारम सफलतापूर्वक बुझाइयो!");

  const iconBtn = (color, onClick, icon) => (
    <button type="button" onClick={onClick}
      style={{ background: "none", border: "none", color, fontSize: "17px", fontWeight: "700", cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>
      {icon}
    </button>
  );

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>फिजियोथेरापी सेवा सृजना</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}फिजियोथेरापी सेवा सृजना
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.mitiLabel}>मिति :</span>
          <input style={S.inputRO} value={today} readOnly />
        </div>

        {/* Top two-column panel */}
        <div style={S.topGrid}>

          {/* Left */}
          <div style={S.leftCol}>
            <div style={S.field}>
              <label style={S.label}>मूल दर्ता नम्बर</label>
              <input style={S.input} placeholder="मूल दर्ता नम्बर *" value={form.moolDarta} onChange={set("moolDarta")} />
            </div>

            <div style={S.secTitle}>स्वास्थ्य अवस्था</div>

            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>रक्तचाप</label><input style={S.input} placeholder="mm Hg" value={form.raktachap} onChange={set("raktachap")} /></div>
              <div style={S.field}><label style={S.label}>तौल</label><input style={S.input} placeholder="के.जी." value={form.taul} onChange={set("taul")} /></div>
            </div>

            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>FBS</label><input style={S.input} placeholder="mg / dL" value={form.fbs} onChange={set("fbs")} /></div>
              <div style={S.field}><label style={S.label}>प्रकृति</label>
                <select style={S.select} value={form.prakriti} onChange={set("prakriti")}>
                  <option value="">प्रकृति छनोट गर्नहोस</option>
                  {PRAKRITI_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>रोग</label>
                <select style={S.select} value={form.rog} onChange={set("rog")}>
                  <option value="">रोग छनोट गर्नहोस</option>
                  {ROG_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.field}><label style={S.label}>परीक्षण</label><input style={S.input} value={form.parikshan} onChange={set("parikshan")} /></div>
            </div>
          </div>

          {/* Right: सेवाग्राहीको विवरण */}
          <div style={S.rightCol}>
            <div style={{ ...S.secTitle, textAlign: "right" }}>सेवाग्राहीको विवरण</div>
            <div style={S.g2}>
              <input style={S.input} placeholder="नाम" value={form.naam} onChange={set("naam")} />
              <input style={S.input} placeholder="थर" value={form.thar} onChange={set("thar")} />
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>उमेर</label><input style={S.input} value={form.umer} onChange={set("umer")} /></div>
              <div style={S.field}><label style={S.label}>लिङ्ग</label>
                <select style={S.select} value={form.linga} onChange={set("linga")}>
                  <option value="">लिङ्ग छनोट गर्नहोस</option>
                  {LINGA_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>सम्पर्क नम्बर</label><input style={S.input} value={form.samparkNum} onChange={set("samparkNum")} /></div>
              <div style={S.field}><label style={S.label}>जाती</label>
                <select style={S.select} value={form.jaati} onChange={set("jaati")}>
                  <option value="">जाती छनोट गर्नहोस</option>
                  {JAATI_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>वडा नम्बर</label><input style={S.input} value={form.wada} onChange={set("wada")} /></div>
              <div style={S.field}><label style={S.label}>टोल</label><input style={S.input} value={form.tol} onChange={set("tol")} /></div>
            </div>
            <div style={S.field}><label style={S.label}>जिल्ला</label>
              <select style={S.select} value={form.jilla} onChange={set("jilla")}>
                <option value="">जिल्ला छनोट गर्नहोस</option>
                {JILLA_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* सेवा विवरण table */}
        <div style={S.sewaSection}>
          <div style={S.sewaTitle}>सेवा विवरण</div>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={{ ...S.th, width: "48px" }}>क्र.सं.</th>
                <th style={{ ...S.th, width: "130px" }}>मिति</th>
                <th style={S.th}>सेवा</th>
                <th style={S.th}>उप-सेवा</th>
                <th style={{ ...S.th, width: "110px" }}>जटिलता</th>
                <th style={{ ...S.th, width: "140px" }}>परीक्षण / सल्लाह</th>
                <th style={{ ...S.th, width: "120px" }}>कैफियत</th>
                <th style={{ ...S.th, width: "60px" }}>थप</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id}>
                  <td style={S.tdc}>{idx + 1}</td>
                  <td style={S.td}><input style={S.input} value={row.miti} onChange={(e) => updateRow(row.id, "miti", e.target.value)} /></td>
                  <td style={S.td}>
                    <select style={S.select} value={row.sewa} onChange={(e) => updateRow(row.id, "sewa", e.target.value)}>
                      <option value="">सेवा छनोट गर्नहोस</option>
                      {SEWA_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </td>
                  <td style={S.td}>
                    <select style={S.select} value={row.upSewa} onChange={(e) => updateRow(row.id, "upSewa", e.target.value)}>
                      <option value="">उप-सेवा छनोट गर्नहोस</option>
                      {UPSEWA_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </td>
                  <td style={S.td}><textarea style={S.textarea} value={row.jatilata} onChange={(e) => updateRow(row.id, "jatilata", e.target.value)} /></td>
                  <td style={S.td}><textarea style={S.textarea} value={row.parikshan} onChange={(e) => updateRow(row.id, "parikshan", e.target.value)} /></td>
                  <td style={S.td}><textarea style={S.textarea} value={row.kaifiyat} onChange={(e) => updateRow(row.id, "kaifiyat", e.target.value)} /></td>
                  <td style={S.tdc}>
                    {iconBtn("#0d9488", addRow, "+")}
                    {iconBtn("#ef4444", () => removeRow(row.id), "✕")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit */}
        <div style={S.submitWrap}>
          <button
            type="button"
            style={S.submitBtn}
            onClick={handleSubmit}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
          >
            बुझाउनुहोस्
          </button>
        </div>

      </div>
    </div>
  );
}