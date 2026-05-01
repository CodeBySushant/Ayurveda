import { useState } from "react";

const S = {
  page:        { padding: "24px", backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif", boxSizing: "border-box" },
  card:        { backgroundColor: "#fff", borderRadius: "8px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "1200px", margin: "0 auto" },
  headerBar:   { display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f1f5f9", border: "1px solid #d1d5db", borderRadius: "6px", padding: "10px 16px", marginBottom: "20px" },
  headerTitle: { fontSize: "17px", fontWeight: "700", color: "#1f2937" },
  breadcrumb:  { fontSize: "12px", color: "#6b7280" },
  bcLink:      { color: "#0d9488", cursor: "pointer" },
  mitiRow:     { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
  mitiLabel:   { fontSize: "13px", fontWeight: "600", color: "#374151" },
  inputRO:     { border: "1px solid #d1d5db", borderRadius: "5px", padding: "8px 12px", fontSize: "13px", color: "#6b7280", backgroundColor: "#f9fafb", boxSizing: "border-box", outline: "none", fontFamily: "inherit", width: "220px" },
  input:       { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "8px 12px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  select:      { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "8px 12px", fontSize: "13px", color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", cursor: "pointer", fontFamily: "inherit" },
  label:       { fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" },
  field:       { display: "flex", flexDirection: "column" },
  topGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "20px", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  leftCol:     { padding: "20px 24px", borderRight: "1px solid #d1d5db", display: "flex", flexDirection: "column", gap: "18px" },
  rightCol:    { padding: "20px 24px", display: "flex", flexDirection: "column", gap: "18px" },
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  submitWrap:  { display: "flex", justifyContent: "center", marginTop: "8px", paddingTop: "20px", borderTop: "1px solid #d1d5db" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "11px 48px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
};

const ROG_OPTIONS      = ["वात रोग", "पित्त रोग", "कफ रोग", "सन्धिवात", "भगन्दर", "अर्श", "अन्य"];
const PRAKRITI_OPTIONS = ["वात", "पित्त", "कफ", "वात-पित्त", "पित्त-कफ", "वात-कफ", "त्रिदोष"];
const LINGA_OPTIONS    = [{ v: "male", l: "पुरुष" }, { v: "female", l: "महिला" }, { v: "other", l: "अन्य" }];
const JAATI_OPTIONS    = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS    = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];

export default function KsharsutraServiceRegister() {
  const today = "18/01/2083";

  const [form, setForm] = useState({
    moolDarta: "",
    raktachap: "", taul: "", fbs: "", prakriti: "", rog: "", parikshan: "",
    naam: "", thar: "", umer: "", linga: "",
    samparkNum: "", jaati: "", wada: "", tol: "", jilla: "",
  });

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = () => alert("फारम सफलतापूर्वक बुझाइयो!");

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>क्षारसूत्र सेवा दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}क्षारसूत्र सेवा दर्ता
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.mitiLabel}>मिति :</span>
          <input style={S.inputRO} value={today} readOnly />
        </div>

        {/* Main two-column panel */}
        <div style={S.topGrid}>

          {/* LEFT: मूल दर्ता नम्बर + स्वास्थ्य fields */}
          <div style={S.leftCol}>

            {/* मूल दर्ता नम्बर */}
            <div style={S.field}>
              <label style={S.label}>मूल दर्ता नम्बर</label>
              <input style={S.input} placeholder="मूल दर्ता नम्बर *" value={form.moolDarta} onChange={set("moolDarta")} />
            </div>

            {/* रक्तचाप + तौल */}
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

            {/* FBS + प्रकृति */}
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

            {/* रोग + परीक्षण */}
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

          {/* RIGHT: सेवाग्राहीको विवरण */}
          <div style={S.rightCol}>

            {/* सेवाग्राहीको पूरा नाम */}
            <div style={S.field}>
              <label style={S.label}>सेवाग्राहीको पूरा नाम</label>
              <div style={S.g2}>
                <input style={S.input} placeholder="नाम *" value={form.naam} onChange={set("naam")} />
                <input style={S.input} placeholder="थर *" value={form.thar} onChange={set("thar")} />
              </div>
            </div>

            {/* उमेर + लिङ्ग */}
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>उमेर</label>
                <input style={S.input} value={form.umer} onChange={set("umer")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>लिङ्ग</label>
                <select style={S.select} value={form.linga} onChange={set("linga")}>
                  <option value="">लिङ्ग छनोट गर्नहोस</option>
                  {LINGA_OPTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            </div>

            {/* सम्पर्क नम्बर + जाती */}
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>सम्पर्क नम्बर</label>
                <input style={S.input} placeholder="सम्पर्क नम्बर *" value={form.samparkNum} onChange={set("samparkNum")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>जाती</label>
                <select style={S.select} value={form.jaati} onChange={set("jaati")}>
                  <option value="">जाती छनोट गर्नहोस</option>
                  {JAATI_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* वडा नम्बर + टोल */}
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>वडा नम्बर</label>
                <input style={S.input} value={form.wada} onChange={set("wada")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>टोल</label>
                <input style={S.input} value={form.tol} onChange={set("tol")} />
              </div>
            </div>

            {/* जिल्ला */}
            <div style={S.field}>
              <label style={S.label}>जिल्ला</label>
              <select style={{ ...S.select, maxWidth: "320px" }} value={form.jilla} onChange={set("jilla")}>
                <option value="">जिल्ला छनोट गर्नहोस</option>
                {JILLA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

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