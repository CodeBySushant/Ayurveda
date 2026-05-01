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
  textarea:    { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: "90px" },
  label:       { fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "5px", display: "block" },
  field:       { display: "flex", flexDirection: "column" },
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  g3:          { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" },
  topGrid:     { display: "grid", gridTemplateColumns: "1fr 0.75fr", gap: "16px", marginBottom: "20px" },
  topBox:      { border: "1px solid #d1d5db", borderRadius: "6px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "16px" },
  // Toggle button groups
  toggleGroup: { border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  toggleTitle: { backgroundColor: "#f8fafc", borderBottom: "1px solid #d1d5db", textAlign: "center", padding: "8px", fontSize: "13px", fontWeight: "600", color: "#374151" },
  toggleBtns:  { display: "flex" },
  toggleBtn:   { flex: 1, padding: "8px 4px", fontSize: "13px", border: "none", borderRight: "1px solid #d1d5db", cursor: "pointer", backgroundColor: "#fff", color: "#374151", fontFamily: "inherit", transition: "background 0.15s" },
  toggleBtnLast: { flex: 1, padding: "8px 4px", fontSize: "13px", border: "none", cursor: "pointer", backgroundColor: "#fff", color: "#374151", fontFamily: "inherit", transition: "background 0.15s" },
  toggleBtnActive: { backgroundColor: "#0d9488", color: "#fff" },
  // स्वास्थ्य परीक्षण button
  healthBtn:   { display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#6b7280", color: "#fff", border: "none", borderRadius: "5px", padding: "9px 18px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" },
  submitWrap:  { display: "flex", justifyContent: "center", marginTop: "20px" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "11px 52px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
};

const PRAKRITI_OPTIONS = ["वात", "पित्त", "कफ", "वात-पित्त", "पित्त-कफ", "वात-कफ", "त्रिदोष"];
const ROG_OPTIONS      = ["गर्भावस्था", "प्रसवोत्तर", "स्तनपान समस्या", "अन्य"];
const LINGA_OPTIONS    = [{ v: "female", l: "महिला" }, { v: "other", l: "अन्य" }];
const JAATI_OPTIONS    = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS    = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];

const DELIVERY_TYPES  = ["Normal", "C/S", "अन्य"];
const DELIVERY_PLACES = ["स्वास्थ्य संस्था", "घर", "अन्यत्र"];

export default function StanpayeeServiceRegister() {
  const today = "18/01/2083";

  const [form, setForm] = useState({
    moolDarta: "", deliveryDate: "",
    deliveryType: "",
    deliveryPlace: "",
    raktachap: "", taul: "", bs: "",
    prakriti: "", rog: "",
    aamaUmer: "", shishuUmer: "", aushadhiMiti: "",
    parikshan: "",
    // patient info
    naam: "", thar: "", umer: "", linga: "",
    samparkNum: "", jaati: "", wada: "", tol: "", jilla: "",
  });
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const setVal = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = () => alert("फारम सफलतापूर्वक बुझाइयो!");

  const ToggleGroup = ({ title, options, field }) => (
    <div style={S.toggleGroup}>
      <div style={S.toggleTitle}>{title}</div>
      <div style={S.toggleBtns}>
        {options.map((opt, i) => {
          const isLast = i === options.length - 1;
          const isActive = form[field] === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setVal(field, isActive ? "" : opt)}
              style={{
                ...(isLast ? S.toggleBtnLast : S.toggleBtn),
                ...(isActive ? S.toggleBtnActive : {}),
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>स्तनपायी आमा तथा शिशु सेवा दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}स्तनपायी आमा तथा शिशु सेवा दर्ता
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.mitiLabel}>मिति :</span>
          <input style={S.inputRO} value={today} readOnly />
        </div>

        {/* Main two-column */}
        <div style={S.topGrid}>

          {/* LEFT column */}
          <div style={S.topBox}>

            {/* मूल दर्ता नम्बर + Date Of Delivery */}
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>मूल दर्ता नम्बर</label>
                <input style={S.input} placeholder="मूल दर्ता नम्बर *" value={form.moolDarta} onChange={set("moolDarta")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>Date Of Delivery</label>
                <input style={S.input} placeholder="मिति" value={form.deliveryDate} onChange={set("deliveryDate")} />
              </div>
            </div>

            {/* Type Of Delivery + Place of Delivery */}
            <div style={S.g2}>
              <ToggleGroup title="Type Of Delivery" options={DELIVERY_TYPES} field="deliveryType" />
              <ToggleGroup title="Place of Delivery" options={DELIVERY_PLACES} field="deliveryPlace" />
            </div>

            {/* रक्तचाप + तौल + BS */}
            <div style={S.g3}>
              <div style={S.field}>
                <label style={S.label}>रक्तचाप</label>
                <input style={S.input} placeholder="mm Hg" value={form.raktachap} onChange={set("raktachap")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>तौल</label>
                <input style={S.input} placeholder="के.जी." value={form.taul} onChange={set("taul")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>BS</label>
                <input style={S.input} placeholder="mg / dL" value={form.bs} onChange={set("bs")} />
              </div>
            </div>

            {/* प्रकृति + रोग / निदान */}
            <div style={S.g2}>
              <div style={S.field}>
                <label style={S.label}>प्रकृति</label>
                <select style={S.select} value={form.prakriti} onChange={set("prakriti")}>
                  <option value="">प्रकृति छनोट गर्नहोस</option>
                  {PRAKRITI_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.field}>
                <label style={S.label}>रोग / निदान</label>
                <select style={S.select} value={form.rog} onChange={set("rog")}>
                  <option value="">रोग छनोट गर्नहोस</option>
                  {ROG_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* आमाको उमेर + शिशुको उमेर + औषधी वितरण मिति */}
            <div style={S.g3}>
              <div style={S.field}>
                <label style={S.label}>आमाको उमेर</label>
                <input style={S.input} placeholder="आमाको उमेर" value={form.aamaUmer} onChange={set("aamaUmer")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>शिशुको उमेर</label>
                <input style={S.input} placeholder="शिशुको उमेर" value={form.shishuUmer} onChange={set("shishuUmer")} />
              </div>
              <div style={S.field}>
                <label style={S.label}>औषधी वितरण गरिने अन्तिम मिति</label>
                <input style={S.input} placeholder="मिति" value={form.aushadhiMiti} onChange={set("aushadhiMiti")} />
              </div>
            </div>

            {/* परीक्षण तथा सल्लाह */}
            <div style={S.field}>
              <label style={S.label}>परीक्षण तथा सल्लाह</label>
              <textarea style={S.textarea} placeholder="परीक्षण तथा सल्लाह" value={form.parikshan} onChange={set("parikshan")} />
            </div>

            {/* स्वास्थ्य परीक्षण फाराम button */}
            <div>
              <button type="button" style={S.healthBtn}>
                स्वास्थ्य परीक्षण फाराम ▾
              </button>
            </div>

          </div>

          {/* RIGHT column: सेवाग्राहीको विवरण */}
          <div style={S.topBox}>
            <div style={S.field}>
              <label style={S.label}>सेवाग्राहीको विवरण</label>
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
                  {LINGA_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
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
                  {JAATI_OPTIONS.map(o => <option key={o}>{o}</option>)}
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
                {JILLA_OPTIONS.map(o => <option key={o}>{o}</option>)}
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