import { useState } from "react";

const S = {
  page:        { padding: "24px", backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif", boxSizing: "border-box" },
  card:        { backgroundColor: "#fff", borderRadius: "8px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "1100px", margin: "0 auto" },
  headerBar:   { display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f1f5f9", border: "1px solid #d1d5db", borderRadius: "6px", padding: "10px 16px", marginBottom: "16px" },
  headerTitle: { fontSize: "17px", fontWeight: "700", color: "#1f2937" },
  breadcrumb:  { fontSize: "12px", color: "#6b7280" },
  bcLink:      { color: "#0d9488", cursor: "pointer" },
  mitiRow:     { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  mitiLabel:   { fontSize: "13px", fontWeight: "600", color: "#374151" },
  inputRO:     { border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#6b7280", backgroundColor: "#f9fafb", outline: "none", fontFamily: "inherit", width: "200px" },
  input:       { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  select:      { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", cursor: "pointer", fontFamily: "inherit" },
  label:       { fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "5px", display: "block" },
  field:       { display: "flex", flexDirection: "column" },
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  // Top two-column
  topGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" },
  topBox:      { border: "1px solid #d1d5db", borderRadius: "6px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "14px" },
  // Yoga section
  yogaSection: { border: "1px solid #d1d5db", borderRadius: "6px", marginBottom: "20px", overflow: "hidden" },
  yogaTitle:   { backgroundColor: "#e5e7eb", textAlign: "center", padding: "10px", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "0" },
  yoga3grid:   { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden", marginBottom: "20px" },
  yogaCard:    { borderRight: "1px solid #d1d5db", display: "flex", flexDirection: "column" },
  yogaCardLast:{ display: "flex", flexDirection: "column" },
  yogaHeader:  { backgroundColor: "#4b5563", color: "#fff", textAlign: "center", padding: "9px 12px", fontSize: "13px", fontWeight: "600" },
  yogaBody:    { padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 },
  dayTitle:    { textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#374151", padding: "6px 0 2px", borderTop: "1px solid #e5e7eb", marginTop: "2px" },
  dayGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" },
  dayInput:    { width: "100%", border: "1px solid #d1d5db", borderRadius: "4px", padding: "5px 8px", fontSize: "12px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  textarea:    { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 10px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: "70px" },
  submitWrap:  { display: "flex", justifyContent: "center", marginTop: "20px" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "11px 52px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
  mainSecTitle:{ backgroundColor: "#e5e7eb", textAlign: "center", padding: "12px", fontSize: "15px", fontWeight: "700", color: "#1f2937", borderRadius: "6px", marginBottom: "16px" },
};

const ROG_OPTIONS      = ["वात रोग", "पित्त रोग", "कफ रोग", "सन्धिवात", "अम्लपित्त", "अन्य"];
const PRAKRITI_OPTIONS = ["वात", "पित्त", "कफ", "वात-पित्त", "पित्त-कफ", "वात-कफ", "त्रिदोष"];
const LINGA_OPTIONS    = [{ v: "male", l: "पुरुष" }, { v: "female", l: "महिला" }, { v: "other", l: "अन्य" }];
const JAATI_OPTIONS    = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS    = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];

const YOGA_CATEGORIES = [
  { key: "sukshma",  label: "सूक्ष्म व्यायाम" },
  { key: "aasan",    label: "आसन" },
  { key: "pranayam", label: "प्राणायाम" },
  { key: "shatkarma",label: "षट्कर्म" },
  { key: "dhyan",    label: "ध्यान" },
  { key: "anya",     label: "अन्य" },
];

const initYoga = () => ({
  suruMiti: "", puraMiti: "",
  din1: "", din2: "", din3: "", din4: "", din5: "", din6: "", din7: "", din8: "", anyaDin: "",
  naam: "",
});

export default function TherapeuticYogaServiceRegister() {
  const today = "18/01/2083";

  const [form, setForm] = useState({
    moolDarta: "",
    raktachap: "", taul: "", fbs: "", prakriti: "", rog: "", parikshan: "",
    naam: "", thar: "", umer: "", linga: "",
    samparkNum: "", jaati: "", wada: "", tol: "", jilla: "",
  });
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  // Yoga state: one object per category
  const [yoga, setYoga] = useState(() =>
    Object.fromEntries(YOGA_CATEGORIES.map((c) => [c.key, initYoga()]))
  );
  const setY = (cat, f) => (e) => setYoga((p) => ({ ...p, [cat]: { ...p[cat], [f]: e.target.value } }));

  const handleSubmit = () => alert("फारम सफलतापूर्वक बुझाइयो!");

  const YogaCard = ({ cat, label, isLast }) => {
    const y = yoga[cat];
    return (
      <div style={isLast ? S.yogaCardLast : S.yogaCard}>
        <div style={S.yogaHeader}>{label}</div>
        <div style={S.yogaBody}>
          <input style={S.input} placeholder="सुरू मिति" value={y.suruMiti} onChange={setY(cat, "suruMiti")} />
          <input style={S.input} placeholder="पूरा गरेको मिति" value={y.puraMiti} onChange={setY(cat, "puraMiti")} />
          <div style={S.dayTitle}>योग गरेको दिन</div>
          <div style={S.dayGrid}>
            {["din1","din2","din3","din4","din5","din6","din7","din8"].map((d, i) => (
              <input key={d} style={S.dayInput} placeholder={`दिन ${["१","२","३","४","५","६","७","८"][i]}`} value={y[d]} onChange={setY(cat, d)} />
            ))}
            <input style={S.dayInput} placeholder="अन्य दिन" value={y.anyaDin} onChange={setY(cat, "anyaDin")} />
          </div>
          <textarea style={S.textarea} placeholder="नाम" value={y.naam} onChange={setY(cat, "naam")} />
        </div>
      </div>
    );
  };

  // Split yoga categories into two rows of 3
  const row1 = YOGA_CATEGORIES.slice(0, 3);
  const row2 = YOGA_CATEGORIES.slice(3, 6);

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>उपचारात्मक योग सेवा दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}उपचारात्मक योग सेवा दर्ता
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.mitiLabel}>मिति :</span>
          <input style={S.inputRO} value={today} readOnly />
        </div>

        {/* Top two-column */}
        <div style={S.topGrid}>

          {/* Left */}
          <div style={S.topBox}>
            <div style={S.field}>
              <label style={S.label}>मूल दर्ता नम्बर</label>
              <input style={S.input} placeholder="मूल दर्ता नम्बर *" value={form.moolDarta} onChange={set("moolDarta")} />
            </div>
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>रक्तचाप</label>
                <input style={S.input} placeholder="mm Hg" value={form.raktachap} onChange={set("raktachap")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>तौल</label>
                <input style={S.input} placeholder="के.जी." value={form.taul} onChange={set("taul")} />
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>FBS</label>
                <input style={S.input} placeholder="mg/dL" value={form.fbs} onChange={set("fbs")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>प्रकृति</label>
                <select style={S.select} value={form.prakriti} onChange={set("prakriti")}>
                  <option value="">प्रकृति छनोट गर्नहोस</option>
                  {PRAKRITI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>रोग</label>
                <select style={S.select} value={form.rog} onChange={set("rog")}>
                  <option value="">रोग छनोट गर्नहोस</option>
                  {ROG_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.field}>
                <label style={S.label}>परीक्षण</label>
                <input style={S.input} value={form.parikshan} onChange={set("parikshan")} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={S.topBox}>
            <div style={S.field}>
              <label style={S.label}>सेवाग्राहीको पूरा नाम</label>
              <div style={S.g2}>
                <input style={S.input} placeholder="नाम *" value={form.naam} onChange={set("naam")} />
                <input style={S.input} placeholder="थर *" value={form.thar} onChange={set("thar")} />
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>उमेर</label>
                <input style={S.input} placeholder="उमेर *" value={form.umer} onChange={set("umer")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>लिङ्ग</label>
                <select style={S.select} value={form.linga} onChange={set("linga")}>
                  <option value="">लिङ्ग छनोट गर्नुहोस्</option>
                  {LINGA_OPTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>सम्पर्क नम्बर</label>
                <input style={S.input} placeholder="सम्पर्क नम्बर *" value={form.samparkNum} onChange={set("samparkNum")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>जाती</label>
                <select style={S.select} value={form.jaati} onChange={set("jaati")}>
                  <option value="">जाती छनोट गर्नुहोस्</option>
                  {JAATI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>वडा नम्बर</label>
                <input style={S.input} placeholder="वडा नम्बर" value={form.wada} onChange={set("wada")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>टोल</label>
                <input style={S.input} placeholder="टोल" value={form.tol} onChange={set("tol")} />
              </div>
            </div>
            <div style={S.field}>
              <label style={S.label}>जिल्ला</label>
              <select style={S.select} value={form.jilla} onChange={set("jilla")}>
                <option value="">जिल्ला छनोट गर्नुहोस्</option>
                {JILLA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* उपचारात्मक योग Section */}
        <div style={S.mainSecTitle}>उपचारात्मक योग</div>

        {/* Row 1: सूक्ष्म व्यायाम | आसन | प्राणायाम */}
        <div style={S.yoga3grid}>
          {row1.map((cat, i) => (
            <YogaCard key={cat.key} cat={cat.key} label={cat.label} isLast={i === 2} />
          ))}
        </div>

        {/* Row 2: षट्कर्म | ध्यान | अन्य */}
        <div style={S.yoga3grid}>
          {row2.map((cat, i) => (
            <YogaCard key={cat.key} cat={cat.key} label={cat.label} isLast={i === 2} />
          ))}
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