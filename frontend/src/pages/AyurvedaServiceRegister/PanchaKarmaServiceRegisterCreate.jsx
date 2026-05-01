import { useState } from "react";

const S = {
  page:       { padding: "20px", backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif", boxSizing: "border-box" },
  card:       { backgroundColor: "#fff", borderRadius: "8px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "960px", margin: "0 auto" },
  headerBar:  { display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f1f5f9", border: "1px solid #d1d5db", borderRadius: "6px", padding: "10px 16px", marginBottom: "16px" },
  headerTitle:{ fontSize: "17px", fontWeight: "700", color: "#1f2937" },
  breadcrumb: { fontSize: "12px", color: "#6b7280" },
  bcLink:     { color: "#0d9488", cursor: "pointer" },
  mitiRow:    { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  mitiLabel:  { fontSize: "13px", fontWeight: "600", color: "#374151" },
  input:      { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 10px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  inputRO:    { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", backgroundColor: "#f9fafb", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  select:     { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 10px", fontSize: "13px", color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", cursor: "pointer", fontFamily: "inherit" },
  section:    { border: "1px solid #d1d5db", borderRadius: "6px", marginBottom: "16px", overflow: "hidden" },
  secTitle:   { backgroundColor: "#f8fafc", borderBottom: "1px solid #d1d5db", textAlign: "center", padding: "9px", fontSize: "13px", fontWeight: "600", color: "#374151" },
  secBody:    { padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" },
  subsecTitle:{ textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#374151", padding: "6px 0 2px" },
  g2:         { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  topGrid:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  topBox:     { border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  field:      { display: "flex", flexDirection: "column", gap: "3px" },
  fieldLabel: { fontSize: "12px", color: "#6b7280" },
  // Checkbox rows: [checkbox 180px] [select/empty 1fr] [miti-label 160px] [input 1fr]
  checkRow:   { display: "grid", gridTemplateColumns: "180px 1fr 160px 1fr", alignItems: "center", gap: "8px" },
  checkLabel: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#374151" },
  mitiLbl:    { fontSize: "12px", color: "#374151", textAlign: "right" },
  table:      { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th:         { backgroundColor: "#e5e7eb", color: "#374151", fontWeight: "600", padding: "8px 10px", border: "1px solid #d1d5db", textAlign: "center" },
  td:         { padding: "6px 8px", border: "1px solid #d1d5db", verticalAlign: "middle" },
  tdc:        { padding: "6px 8px", border: "1px solid #d1d5db", verticalAlign: "middle", textAlign: "center" },
  submitWrap: { display: "flex", justifyContent: "center", marginTop: "20px" },
  submitBtn:  { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 48px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
  moolRow:    { display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "8px" },
  moolLabel:  { fontSize: "13px", fontWeight: "500", color: "#374151" },
};

const ROG_OPTIONS = ["वात रोग", "पित्त रोग", "कफ रोग", "सन्धिवात", "अम्लपित्त", "अन्य"];
const SNEHAN_OPTIONS = ["सर्वाङ्ग अभ्यङ्ग", "एकाङ्ग अभ्यङ्ग", "पाद अभ्यङ्ग", "मुर्धा तैल", "अन्य"];
const SWEDAN_OPTIONS = ["सर्वाङ्ग स्वेद", "एकाङ्ग स्वेद", "बाष्प स्वेद", "अन्य"];
const BASTI_OPTIONS  = ["अनुवासन वस्ती", "निरुह वस्ती", "उत्तर वस्ती", "अन्य"];
const SEWA_OPTIONS   = ["पूर्वकर्म", "उपक्रम", "प्रधानकर्म", "पश्चातकर्म", "अन्य"];
const JAATI_OPTIONS  = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS  = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];

const newFollowRow = () => ({ id: Date.now() + Math.random(), miti: "", sewa: "", parikshan: "", kaifiyat: "" });

export default function PanchaKarmaServiceRegister() {
  const today = "18/01/2083";

  // मूल दर्ता नम्बर
  const [moolDarta, setMoolDarta] = useState("");

  // स्वास्थ्य अवस्था
  const [health, setHealth] = useState({ raktachap: "", taul: "", fbs: "", rog: "", parikshan: "" });
  const setH = (f) => (e) => setHealth((p) => ({ ...p, [f]: e.target.value }));

  // सेवाग्राहीको विवरण
  const [patient, setPatient] = useState({ naam: "", thar: "", umer: "", linga: "", samparkNum: "", jaati: "", wada: "", tol: "", jilla: "", preshanSanstha: "" });
  const setPt = (f) => (e) => setPatient((p) => ({ ...p, [f]: e.target.value }));

  // पूर्वकर्म
  const [purwa, setPurwa] = useState({ dipan: false, dipanMiti: "", snehan: "", snehanMiti: "", swedan: "", swedanMiti: "" });
  const setPw = (f) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPurwa((p) => ({ ...p, [f]: val }));
  };

  // उपक्रम
  const [upakram, setUpakram] = useState({
    sthanikBasti: false, sthanikBastiMiti: "",
    pichu: false, pichuMiti: "",
    potaliSwed: false, potaliSwedMiti: "",
    shiroDhara: false, shiroDharaMiti: "",
    akshitarpan: false, akshitarpanMiti: "",
    anya: false, anyaMiti: "",
  });
  const setUk = (f) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUpakram((p) => ({ ...p, [f]: val }));
  };

  // प्रधानकर्म
  const [pradhan, setPradhan] = useState({
    baman: false, bamanMiti: "",
    virechan: false, virechanMiti: "",
    basti: "", bastiMiti: "",
    nasya: false, nasyaMiti: "",
    raktamokshan: false, raktamokshanMiti: "",
  });
  const setPd = (f) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPradhan((p) => ({ ...p, [f]: val }));
  };

  // फलो-अप rows
  const [followRows, setFollowRows] = useState([newFollowRow()]);
  const addFollowRow = () => setFollowRows((r) => [...r, newFollowRow()]);
  const removeFollowRow = (id) => setFollowRows((r) => r.length > 1 ? r.filter((x) => x.id !== id) : r);
  const updateFollowRow = (id, f, val) => setFollowRows((r) => r.map((x) => x.id === id ? { ...x, [f]: val } : x));

  const handleSubmit = () => alert("फारम सफलतापूर्वक बुझाइयो!");

  const iconBtn = (color, onClick, icon) => (
    <button type="button" onClick={onClick}
      style={{ background: "none", border: "none", color, fontSize: "16px", fontWeight: "700", cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>
      {icon}
    </button>
  );

  const CheckRow = ({ checked, onCheck, label, mitiLabel, mitiVal, onMiti, children }) => (
    <div style={S.checkRow}>
      <label style={S.checkLabel}>
        {onCheck && <input type="checkbox" checked={checked} onChange={onCheck} style={{ accentColor: "#0d9488" }} />}
        {label}
      </label>
      <div>{children}</div>
      <span style={S.mitiLbl}>{mitiLabel}</span>
      <input style={S.input} type="text" value={mitiVal} onChange={onMiti} />
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>पञ्चकर्म सेवा दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}पञ्चकर्म सेवा दर्ता
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.mitiLabel}>मिति :</span>
          <input style={{ ...S.inputRO, width: "160px" }} value={today} readOnly />
        </div>

        {/* Top two-column */}
        <div style={S.topGrid}>

          {/* Left: मूल दर्ता नम्बर + स्वास्थ्य अवस्था */}
          <div style={S.topBox}>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={S.moolRow}>
                <span style={S.moolLabel}>मूल दर्ता नम्बर</span>
                <input style={S.input} type="text" placeholder="मूल दर्ता नम्बर *" value={moolDarta} onChange={(e) => setMoolDarta(e.target.value)} />
              </div>
              <div style={{ ...S.subsecTitle, paddingTop: 0 }}>स्वास्थ्य अवस्था</div>
              <div style={S.g2}>
                <div style={S.field}>
                  <span style={S.fieldLabel}>रक्तचाप</span>
                  <input style={S.input} placeholder="mm Hg" value={health.raktachap} onChange={setH("raktachap")} />
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>तौल</span>
                  <input style={S.input} placeholder="के.जी." value={health.taul} onChange={setH("taul")} />
                </div>
              </div>
              <div style={S.g2}>
                <div style={S.field}>
                  <span style={S.fieldLabel}>FBS</span>
                  <input style={S.input} placeholder="mg / dL" value={health.fbs} onChange={setH("fbs")} />
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>रोग</span>
                  <select style={S.select} value={health.rog} onChange={setH("rog")}>
                    <option value="">रोग छनोट गर्नहोस</option>
                    {ROG_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={S.field}>
                <span style={S.fieldLabel}>परीक्षण</span>
                <input style={S.input} value={health.parikshan} onChange={setH("parikshan")} />
              </div>
            </div>
          </div>

          {/* Right: सेवाग्राहीको विवरण */}
          <div style={S.topBox}>
            <div style={S.secTitle}>सेवाग्राहीको विवरण</div>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={S.g2}>
                <input style={S.input} placeholder="नाम" value={patient.naam} onChange={setPt("naam")} />
                <input style={S.input} placeholder="थर" value={patient.thar} onChange={setPt("thar")} />
              </div>
              <div style={S.g2}>
                <input style={S.input} placeholder="उमेर" value={patient.umer} onChange={setPt("umer")} />
                <select style={S.select} value={patient.linga} onChange={setPt("linga")}>
                  <option value="">लिङ्ग छनोट गर्नहोस</option>
                  <option value="male">पुरुष</option>
                  <option value="female">महिला</option>
                  <option value="other">अन्य</option>
                </select>
              </div>
              <div style={S.g2}>
                <input style={S.input} placeholder="सम्पर्क नम्बर" value={patient.samparkNum} onChange={setPt("samparkNum")} />
                <select style={S.select} value={patient.jaati} onChange={setPt("jaati")}>
                  <option value="">जाती छनोट गर्नहोस</option>
                  {JAATI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.g2}>
                <input style={S.input} placeholder="वडा नम्बर" value={patient.wada} onChange={setPt("wada")} />
                <input style={S.input} placeholder="टोल" value={patient.tol} onChange={setPt("tol")} />
              </div>
              <select style={S.select} value={patient.jilla} onChange={setPt("jilla")}>
                <option value="">जिल्ला छनोट गर्नहोस</option>
                {JILLA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <input style={S.input} placeholder="प्रेषण भई आएको संस्था" value={patient.preshanSanstha} onChange={setPt("preshanSanstha")} />
            </div>
          </div>
        </div>

        {/* सेवा विवरण */}
        <div style={S.section}>
          <div style={S.secTitle}>सेवा विवरण</div>
          <div style={S.secBody}>

            {/* पूर्वकर्म */}
            <div style={S.subsecTitle}>पूर्वकर्म</div>

            <CheckRow
              checked={purwa.dipan} onCheck={setPw("dipan")}
              label="दिपन / पाचन"
              mitiLabel="दिपन / पाचन मिति"
              mitiVal={purwa.dipanMiti} onMiti={setPw("dipanMiti")}
            />

            <div style={S.checkRow}>
              <span style={{ ...S.checkLabel }}>स्नेहन</span>
              <select style={S.select} value={purwa.snehan} onChange={setPw("snehan")}>
                <option value="">स्नेहन छनोट गर्नहोस</option>
                {SNEHAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span style={S.mitiLbl}>स्नेहन मिति</span>
              <input style={S.input} value={purwa.snehanMiti} onChange={setPw("snehanMiti")} />
            </div>

            <div style={S.checkRow}>
              <span style={{ ...S.checkLabel }}>स्वेदन</span>
              <select style={S.select} value={purwa.swedan} onChange={setPw("swedan")}>
                <option value="">स्वेदन छनोट गर्नहोस</option>
                {SWEDAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span style={S.mitiLbl}>स्वेदन मिति</span>
              <input style={S.input} value={purwa.swedanMiti} onChange={setPw("swedanMiti")} />
            </div>

            {/* उपक्रम */}
            <div style={S.subsecTitle}>उपक्रम</div>

            <CheckRow checked={upakram.sthanikBasti} onCheck={setUk("sthanikBasti")} label="स्थानिक वस्ती" mitiLabel="स्थानिक वस्ती मिति" mitiVal={upakram.sthanikBastiMiti} onMiti={setUk("sthanikBastiMiti")} />
            <CheckRow checked={upakram.pichu} onCheck={setUk("pichu")} label="पिचु" mitiLabel="पिचु मिति" mitiVal={upakram.pichuMiti} onMiti={setUk("pichuMiti")} />
            <CheckRow checked={upakram.potaliSwed} onCheck={setUk("potaliSwed")} label="पोटली स्वेद" mitiLabel="पोटली स्वेद मिति" mitiVal={upakram.potaliSwedMiti} onMiti={setUk("potaliSwedMiti")} />
            <CheckRow checked={upakram.shiroDhara} onCheck={setUk("shiroDhara")} label="शिरो धारा" mitiLabel="शिरो धारा मिति" mitiVal={upakram.shiroDharaMiti} onMiti={setUk("shiroDharaMiti")} />
            <CheckRow checked={upakram.akshitarpan} onCheck={setUk("akshitarpan")} label="अक्षीतर्पण" mitiLabel="अक्षीतर्पण मिति" mitiVal={upakram.akshitarpanMiti} onMiti={setUk("akshitarpanMiti")} />
            <CheckRow checked={upakram.anya} onCheck={setUk("anya")} label="अन्य" mitiLabel="अन्य मिति" mitiVal={upakram.anyaMiti} onMiti={setUk("anyaMiti")} />

            {/* प्रधानकर्म */}
            <div style={S.subsecTitle}>प्रधानकर्म</div>

            <CheckRow checked={pradhan.baman} onCheck={setPd("baman")} label="वमन" mitiLabel="वमन मिति" mitiVal={pradhan.bamanMiti} onMiti={setPd("bamanMiti")} />
            <CheckRow checked={pradhan.virechan} onCheck={setPd("virechan")} label="विरेचन" mitiLabel="विरेचन मिति" mitiVal={pradhan.virechanMiti} onMiti={setPd("virechanMiti")} />

            <div style={S.checkRow}>
              <span style={S.checkLabel}>वस्ती</span>
              <select style={S.select} value={pradhan.basti} onChange={setPd("basti")}>
                <option value="">वस्ती छनोट गर्नहोस</option>
                {BASTI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span style={S.mitiLbl}>वस्ती मिति</span>
              <input style={S.input} value={pradhan.bastiMiti} onChange={setPd("bastiMiti")} />
            </div>

            <CheckRow checked={pradhan.nasya} onCheck={setPd("nasya")} label="नस्य" mitiLabel="नस्य मिति" mitiVal={pradhan.nasyaMiti} onMiti={setPd("nasyaMiti")} />
            <CheckRow checked={pradhan.raktamokshan} onCheck={setPd("raktamokshan")} label="रक्तमोक्षण" mitiLabel="रक्तमोक्षण मिति" mitiVal={pradhan.raktamokshanMiti} onMiti={setPd("raktamokshanMiti")} />

            {/* सेवा विवरण (फलो-अप) */}
            <div style={S.subsecTitle}>सेवा विवरण (फलो-अप)</div>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={{ ...S.th, width: "48px" }}>क्र.सं.</th>
                  <th style={{ ...S.th, width: "150px" }}>मिति</th>
                  <th style={S.th}>सेवा</th>
                  <th style={S.th}>परीक्षण / सल्लाह</th>
                  <th style={S.th}>कैफियत</th>
                  <th style={{ ...S.th, width: "60px" }}>थप</th>
                </tr>
              </thead>
              <tbody>
                {followRows.map((row, idx) => (
                  <tr key={row.id}>
                    <td style={S.tdc}>{idx + 1}</td>
                    <td style={S.td}><input style={S.input} value={row.miti} onChange={(e) => updateFollowRow(row.id, "miti", e.target.value)} /></td>
                    <td style={S.td}>
                      <select style={S.select} value={row.sewa} onChange={(e) => updateFollowRow(row.id, "sewa", e.target.value)}>
                        <option value="">सेवा छनोट गर्नहोस</option>
                        {SEWA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </td>
                    <td style={S.td}><input style={S.input} value={row.parikshan} onChange={(e) => updateFollowRow(row.id, "parikshan", e.target.value)} /></td>
                    <td style={S.td}><input style={S.input} value={row.kaifiyat} onChange={(e) => updateFollowRow(row.id, "kaifiyat", e.target.value)} /></td>
                    <td style={S.tdc}>
                      {iconBtn("#0d9488", addFollowRow, "+")}
                      {iconBtn("#ef4444", () => removeFollowRow(row.id), "✕")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
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