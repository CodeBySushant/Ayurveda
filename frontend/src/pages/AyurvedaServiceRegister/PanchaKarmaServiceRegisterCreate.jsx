import { useState, useEffect } from "react";

const S = {
  page:        { padding: "20px", backgroundColor: "#f0f3f8", minHeight: "100vh", fontFamily: "'Noto Sans Devanagari', 'Segoe UI', sans-serif", boxSizing: "border-box" },
  card:        { backgroundColor: "#fff", borderRadius: "8px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "980px", margin: "0 auto" },
  headerBar:   { display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#dce6f5", border: "1px solid #c6d8f0", borderRadius: "6px", padding: "10px 16px", marginBottom: "16px" },
  headerTitle: { fontSize: "17px", fontWeight: "700", color: "#1f2937" },
  breadcrumb:  { fontSize: "12px", color: "#6b7280" },
  bcLink:      { color: "#2c4a7c", cursor: "pointer", fontWeight: 500 },
  mitiRow:     { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  mitiLabel:   { fontSize: "13px", fontWeight: "600", color: "#374151" },
  input:       { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 10px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  inputRO:     { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", backgroundColor: "#f9fafb", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  select:      { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "6px 10px", fontSize: "13px", color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", cursor: "pointer", fontFamily: "inherit" },
  section:     { border: "1px solid #d1d5db", borderRadius: "6px", marginBottom: "16px", overflow: "hidden" },
  secTitle:    { backgroundColor: "#dce6f5", borderBottom: "1px solid #d1d5db", textAlign: "center", padding: "9px", fontSize: "13px", fontWeight: "600", color: "#1e3a5f" },
  secBody:     { padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" },
  subsecTitle: { textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#2c4a7c", padding: "6px 0 2px", borderBottom: "1px dashed #c6d8f0", marginBottom: "4px" },
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  g3:          { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" },
  topGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  topBox:      { border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  field:       { display: "flex", flexDirection: "column", gap: "3px" },
  fieldLabel:  { fontSize: "12px", color: "#6b7280", fontWeight: 500 },
  checkRow:    { display: "grid", gridTemplateColumns: "180px 1fr 160px 1fr", alignItems: "center", gap: "8px" },
  checkLabel:  { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#374151" },
  mitiLbl:     { fontSize: "12px", color: "#374151", textAlign: "right" },
  table:       { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th:          { backgroundColor: "#dce6f5", color: "#1e3a5f", fontWeight: "600", padding: "8px 10px", border: "1px solid #c6d8f0", textAlign: "center" },
  td:          { padding: "6px 8px", border: "1px solid #d1d5db", verticalAlign: "middle" },
  tdc:         { padding: "6px 8px", border: "1px solid #d1d5db", verticalAlign: "middle", textAlign: "center" },
  submitWrap:  { display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 48px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
  resetBtn:    { backgroundColor: "#6b7280", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 28px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
  moolRow:     { display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "8px" },
  moolLabel:   { fontSize: "13px", fontWeight: "500", color: "#374151" },
  badge:       { display: "inline-block", background: "#dcfce7", color: "#166534", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: 600 },
  errorBadge:  { display: "inline-block", background: "#fee2e2", color: "#991b1b", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: 600 },
  required:    { color: "#dc2626", marginLeft: "2px" },
};

const ROG_OPTIONS    = ["वात रोग", "पित्त रोग", "कफ रोग", "सन्धिवात", "अम्लपित्त", "अन्य"];
const SNEHAN_OPTIONS = ["सर्वाङ्ग अभ्यङ्ग", "एकाङ्ग अभ्यङ्ग", "पाद अभ्यङ्ग", "मुर्धा तैल", "अन्य"];
const SWEDAN_OPTIONS = ["सर्वाङ्ग स्वेद", "एकाङ्ग स्वेद", "बाष्प स्वेद", "अन्य"];
const BASTI_OPTIONS  = ["अनुवासन वस्ती", "निरुह वस्ती", "उत्तर वस्ती", "अन्य"];
const SEWA_OPTIONS   = ["पूर्वकर्म", "उपक्रम", "प्रधानकर्म", "पश्चातकर्म", "अन्य"];
const JAATI_OPTIONS  = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS  = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];
const NAGAR_OPTIONS  = ["महानगरपालिका", "उपमहानगरपालिका", "नगरपालिका", "गाउँपालिका"];

const STORAGE_KEY = "panchkarma_records";
const COUNTER_KEY = "panchkarma_counter";

const TODAY_BS = "18/01/2083";

const blankHealth   = () => ({ raktachap: "", taul: "", fbs: "", rog: "", parikshan: "" });
const blankPatient  = () => ({ naam: "", thar: "", umer: "", linga: "", samparkNum: "", jaati: "", wada: "", tol: "", jilla: "", nagar: "", preshanSanstha: "" });
const blankPurwa    = () => ({ dipan: false, dipanMiti: "", snehan: "", snehanMiti: "", swedan: "", swedanMiti: "" });
const blankUpakram  = () => ({ sthanikBasti: false, sthanikBastiMiti: "", pichu: false, pichuMiti: "", potaliSwed: false, potaliSwedMiti: "", shiroDhara: false, shiroDharaMiti: "", akshitarpan: false, akshitarpanMiti: "", anya: false, anyaMiti: "" });
const blankPradhan  = () => ({ baman: false, bamanMiti: "", virechan: false, virechanMiti: "", basti: "", bastiMiti: "", nasya: false, nasyaMiti: "", raktamokshan: false, raktamokshanMiti: "" });
const newFollowRow  = () => ({ id: Date.now() + Math.random(), miti: "", sewa: "", parikshan: "", kaifiyat: "" });

function getRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecord(record) {
  const records = getRecords();
  records.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function getNextCounter() {
  const current = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10);
  const next = current + 1;
  localStorage.setItem(COUNTER_KEY, String(next));
  return next;
}

function genSewaNo(counter) {
  return `PK-${String(counter).padStart(4, "0")}`;
}

export default function PanchaKarmaServiceRegister() {
  const [moolDarta,  setMoolDarta]  = useState("");
  const [health,     setHealth]     = useState(blankHealth());
  const [patient,    setPatient]    = useState(blankPatient());
  const [purwa,      setPurwa]      = useState(blankPurwa());
  const [upakram,    setUpakram]    = useState(blankUpakram());
  const [pradhan,    setPradhan]    = useState(blankPradhan());
  const [followRows, setFollowRows] = useState([newFollowRow()]);
  const [status,     setStatus]     = useState(null); // {type: "success"|"error", msg}
  const [errors,     setErrors]     = useState({});

  const setH  = (f) => (e) => setHealth((p)  => ({ ...p, [f]: e.target.value }));
  const setPt = (f) => (e) => setPatient((p)  => ({ ...p, [f]: e.target.value }));
  const setPw = (f) => (e) => { const v = e.target.type === "checkbox" ? e.target.checked : e.target.value; setPurwa((p)  => ({ ...p, [f]: v })); };
  const setUk = (f) => (e) => { const v = e.target.type === "checkbox" ? e.target.checked : e.target.value; setUpakram((p) => ({ ...p, [f]: v })); };
  const setPd = (f) => (e) => { const v = e.target.type === "checkbox" ? e.target.checked : e.target.value; setPradhan((p) => ({ ...p, [f]: v })); };

  const addFollowRow    = ()          => setFollowRows((r) => [...r, newFollowRow()]);
  const removeFollowRow = (id)        => setFollowRows((r) => r.length > 1 ? r.filter((x) => x.id !== id) : r);
  const updateFollowRow = (id, f, v)  => setFollowRows((r) => r.map((x) => x.id === id ? { ...x, [f]: v } : x));

  const validate = () => {
    const e = {};
    if (!moolDarta.trim()) e.moolDarta = true;
    if (!patient.naam.trim()) e.naam = true;
    if (!patient.thar.trim()) e.thar = true;
    if (!patient.umer.trim()) e.umer = true;
    if (!patient.linga) e.linga = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setMoolDarta(""); setHealth(blankHealth()); setPatient(blankPatient());
    setPurwa(blankPurwa()); setUpakram(blankUpakram()); setPradhan(blankPradhan());
    setFollowRows([newFollowRow()]); setErrors({}); setStatus(null);
  };

  const handleSubmit = () => {
    if (!validate()) {
      setStatus({ type: "error", msg: "कृपया आवश्यक फिल्डहरू भर्नुहोस् (*)।" });
      return;
    }
    const counter = getNextCounter();
    const sewaNo  = genSewaNo(counter);
    const record  = {
      id:          sewaNo,
      sewaNo,
      sewaDartaMiti: TODAY_BS,
      miti:        TODAY_BS,
      mulDartaNo:  moolDarta,
      name:        patient.naam,
      thar:        patient.thar,
      jati:        patient.jaati,
      umer:        patient.umer,
      gender:      patient.linga === "male" ? "पु" : patient.linga === "female" ? "म" : "अ",
      district:    patient.jilla,
      municipality:patient.nagar,
      ward:        patient.wada,
      tol:         patient.tol,
      contact:     patient.samparkNum,
      preshanSanstha: patient.preshanSanstha,
      bp:          health.raktachap,
      weight:      health.taul,
      fbs:         health.fbs,
      rog:         health.rog,
      parikshan:   health.parikshan,
      purwa,
      upakram,
      pradhan,
      followRows,
      createdAt:   new Date().toISOString(),
    };
    saveRecord(record);
    setStatus({ type: "success", msg: `फारम सफलतापूर्वक बुझाइयो! सेवा दर्ता नम्बर: ${sewaNo}` });
    setTimeout(resetForm, 3000);
  };

  const iconBtn = (color, onClick, icon) => (
    <button type="button" onClick={onClick}
      style={{ background: "none", border: "none", color, fontSize: "18px", fontWeight: "700", cursor: "pointer", padding: "0 3px", lineHeight: 1 }}>
      {icon}
    </button>
  );

  const inputStyle = (field) => ({
    ...S.input,
    borderColor: errors[field] ? "#dc2626" : "#d1d5db",
  });

  const CheckRow = ({ checked, onCheck, label, mitiLabel, mitiVal, onMiti, children }) => (
    <div style={S.checkRow}>
      <label style={S.checkLabel}>
        {onCheck && <input type="checkbox" checked={checked} onChange={onCheck} style={{ accentColor: "#2c4a7c" }} />}
        <span>{label}</span>
      </label>
      <div>{children}</div>
      <span style={S.mitiLbl}>{mitiLabel}</span>
      <input style={S.input} type="text" placeholder="दिन/महिना/वर्ष" value={mitiVal} onChange={onMiti} />
    </div>
  );

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>पञ्चकर्म सेवा दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}पञ्चकर्म सेवा दर्ता
          </span>
        </div>

        {/* Status message */}
        {status && (
          <div style={{ marginBottom: 12, textAlign: "center" }}>
            <span style={status.type === "success" ? S.badge : S.errorBadge}>{status.msg}</span>
          </div>
        )}

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.mitiLabel}>मिति :</span>
          <input style={{ ...S.inputRO, width: "160px" }} value={TODAY_BS} readOnly />
        </div>

        {/* Top two-column */}
        <div style={S.topGrid}>

          {/* Left: मूल दर्ता नम्बर + स्वास्थ्य अवस्था */}
          <div style={S.topBox}>
            <div style={S.secTitle}>मूल दर्ता / स्वास्थ्य अवस्था</div>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={S.moolRow}>
                <span style={S.moolLabel}>मूल दर्ता नम्बर<span style={S.required}>*</span></span>
                <input style={inputStyle("moolDarta")} type="text" placeholder="मूल दर्ता नम्बर" value={moolDarta} onChange={(e) => setMoolDarta(e.target.value)} />
              </div>
              <div style={{ borderTop: "1px dashed #c6d8f0", paddingTop: 10 }}>
                <div style={S.subsecTitle}>स्वास्थ्य अवस्था</div>
              </div>
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
                    <option value="">रोग छनोट गर्नुहोस्</option>
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
                <div style={S.field}>
                  <span style={S.fieldLabel}>नाम<span style={S.required}>*</span></span>
                  <input style={inputStyle("naam")} placeholder="नाम" value={patient.naam} onChange={setPt("naam")} />
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>थर<span style={S.required}>*</span></span>
                  <input style={inputStyle("thar")} placeholder="थर" value={patient.thar} onChange={setPt("thar")} />
                </div>
              </div>
              <div style={S.g2}>
                <div style={S.field}>
                  <span style={S.fieldLabel}>उमेर<span style={S.required}>*</span></span>
                  <input style={inputStyle("umer")} placeholder="उमेर" value={patient.umer} onChange={setPt("umer")} />
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>लिङ्ग<span style={S.required}>*</span></span>
                  <select style={{ ...S.select, borderColor: errors.linga ? "#dc2626" : "#d1d5db" }} value={patient.linga} onChange={setPt("linga")}>
                    <option value="">लिङ्ग छनोट गर्नुहोस्</option>
                    <option value="male">पुरुष</option>
                    <option value="female">महिला</option>
                    <option value="other">अन्य</option>
                  </select>
                </div>
              </div>
              <div style={S.g2}>
                <div style={S.field}>
                  <span style={S.fieldLabel}>सम्पर्क नम्बर</span>
                  <input style={S.input} placeholder="सम्पर्क नम्बर" value={patient.samparkNum} onChange={setPt("samparkNum")} />
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>जाती</span>
                  <select style={S.select} value={patient.jaati} onChange={setPt("jaati")}>
                    <option value="">जाती छनोट गर्नुहोस्</option>
                    {JAATI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={S.g2}>
                <div style={S.field}>
                  <span style={S.fieldLabel}>जिल्ला</span>
                  <select style={S.select} value={patient.jilla} onChange={setPt("jilla")}>
                    <option value="">जिल्ला छनोट गर्नुहोस्</option>
                    {JILLA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>गाउँ/नगरपालिका</span>
                  <select style={S.select} value={patient.nagar} onChange={setPt("nagar")}>
                    <option value="">छनोट गर्नुहोस्</option>
                    {NAGAR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={S.g2}>
                <div style={S.field}>
                  <span style={S.fieldLabel}>वडा नम्बर</span>
                  <input style={S.input} placeholder="वडा नम्बर" value={patient.wada} onChange={setPt("wada")} />
                </div>
                <div style={S.field}>
                  <span style={S.fieldLabel}>टोल</span>
                  <input style={S.input} placeholder="टोल" value={patient.tol} onChange={setPt("tol")} />
                </div>
              </div>
              <div style={S.field}>
                <span style={S.fieldLabel}>प्रेषण भई आएको संस्था</span>
                <input style={S.input} placeholder="संस्थाको नाम" value={patient.preshanSanstha} onChange={setPt("preshanSanstha")} />
              </div>
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
              <span style={S.checkLabel}>स्नेहन</span>
              <select style={S.select} value={purwa.snehan} onChange={setPw("snehan")}>
                <option value="">स्नेहन छनोट गर्नुहोस्</option>
                {SNEHAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span style={S.mitiLbl}>स्नेहन मिति</span>
              <input style={S.input} placeholder="दिन/महिना/वर्ष" value={purwa.snehanMiti} onChange={setPw("snehanMiti")} />
            </div>

            <div style={S.checkRow}>
              <span style={S.checkLabel}>स्वेदन</span>
              <select style={S.select} value={purwa.swedan} onChange={setPw("swedan")}>
                <option value="">स्वेदन छनोट गर्नुहोस्</option>
                {SWEDAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span style={S.mitiLbl}>स्वेदन मिति</span>
              <input style={S.input} placeholder="दिन/महिना/वर्ष" value={purwa.swedanMiti} onChange={setPw("swedanMiti")} />
            </div>

            {/* उपक्रम */}
            <div style={S.subsecTitle}>उपक्रम</div>
            <CheckRow checked={upakram.sthanikBasti}  onCheck={setUk("sthanikBasti")}  label="स्थानिक वस्ती"  mitiLabel="स्थानिक वस्ती मिति"  mitiVal={upakram.sthanikBastiMiti}  onMiti={setUk("sthanikBastiMiti")} />
            <CheckRow checked={upakram.pichu}          onCheck={setUk("pichu")}          label="पिचु"           mitiLabel="पिचु मिति"           mitiVal={upakram.pichuMiti}          onMiti={setUk("pichuMiti")} />
            <CheckRow checked={upakram.potaliSwed}     onCheck={setUk("potaliSwed")}     label="पोटली स्वेद"   mitiLabel="पोटली स्वेद मिति"   mitiVal={upakram.potaliSwedMiti}     onMiti={setUk("potaliSwedMiti")} />
            <CheckRow checked={upakram.shiroDhara}     onCheck={setUk("shiroDhara")}     label="शिरो धारा"     mitiLabel="शिरो धारा मिति"     mitiVal={upakram.shiroDharaMiti}     onMiti={setUk("shiroDharaMiti")} />
            <CheckRow checked={upakram.akshitarpan}    onCheck={setUk("akshitarpan")}    label="अक्षीतर्पण"    mitiLabel="अक्षीतर्पण मिति"    mitiVal={upakram.akshitarpanMiti}    onMiti={setUk("akshitarpanMiti")} />
            <CheckRow checked={upakram.anya}           onCheck={setUk("anya")}           label="अन्य"           mitiLabel="अन्य मिति"           mitiVal={upakram.anyaMiti}           onMiti={setUk("anyaMiti")} />

            {/* प्रधानकर्म */}
            <div style={S.subsecTitle}>प्रधानकर्म</div>
            <CheckRow checked={pradhan.baman}        onCheck={setPd("baman")}        label="वमन"      mitiLabel="वमन मिति"      mitiVal={pradhan.bamanMiti}        onMiti={setPd("bamanMiti")} />
            <CheckRow checked={pradhan.virechan}     onCheck={setPd("virechan")}     label="विरेचन"   mitiLabel="विरेचन मिति"   mitiVal={pradhan.virechanMiti}     onMiti={setPd("virechanMiti")} />

            <div style={S.checkRow}>
              <span style={S.checkLabel}>वस्ती</span>
              <select style={S.select} value={pradhan.basti} onChange={setPd("basti")}>
                <option value="">वस्ती छनोट गर्नुहोस्</option>
                {BASTI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span style={S.mitiLbl}>वस्ती मिति</span>
              <input style={S.input} placeholder="दिन/महिना/वर्ष" value={pradhan.bastiMiti} onChange={setPd("bastiMiti")} />
            </div>

            <CheckRow checked={pradhan.nasya}        onCheck={setPd("nasya")}        label="नस्य"     mitiLabel="नस्य मिति"     mitiVal={pradhan.nasyaMiti}        onMiti={setPd("nasyaMiti")} />
            <CheckRow checked={pradhan.raktamokshan} onCheck={setPd("raktamokshan")} label="रक्तमोक्षण" mitiLabel="रक्तमोक्षण मिति" mitiVal={pradhan.raktamokshanMiti} onMiti={setPd("raktamokshanMiti")} />

            {/* फलो-अप */}
            <div style={S.subsecTitle}>सेवा विवरण (फलो-अप)</div>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={{ ...S.th, width: "48px" }}>क्र.सं.</th>
                  <th style={{ ...S.th, width: "160px" }}>मिति</th>
                  <th style={S.th}>सेवा</th>
                  <th style={S.th}>परीक्षण / सल्लाह</th>
                  <th style={S.th}>कैफियत</th>
                  <th style={{ ...S.th, width: "64px" }}>थप</th>
                </tr>
              </thead>
              <tbody>
                {followRows.map((row, idx) => (
                  <tr key={row.id}>
                    <td style={S.tdc}>{idx + 1}</td>
                    <td style={S.td}><input style={S.input} placeholder="दिन/महिना/वर्ष" value={row.miti} onChange={(e) => updateFollowRow(row.id, "miti", e.target.value)} /></td>
                    <td style={S.td}>
                      <select style={S.select} value={row.sewa} onChange={(e) => updateFollowRow(row.id, "sewa", e.target.value)}>
                        <option value="">सेवा छनोट गर्नुहोस्</option>
                        {SEWA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </td>
                    <td style={S.td}><input style={S.input} value={row.parikshan} onChange={(e) => updateFollowRow(row.id, "parikshan", e.target.value)} /></td>
                    <td style={S.td}><input style={S.input} value={row.kaifiyat} onChange={(e) => updateFollowRow(row.id, "kaifiyat", e.target.value)} /></td>
                    <td style={S.tdc}>
                      {iconBtn("#16a34a", addFollowRow, "+")}
                      {iconBtn("#dc2626", () => removeFollowRow(row.id), "✕")}
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
            style={S.resetBtn}
            onClick={resetForm}
          >
            रिसेट गर्नुहोस्
          </button>
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