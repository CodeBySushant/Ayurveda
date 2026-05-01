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
  label:       { fontSize: "12px", fontWeight: "500", color: "#374151", marginBottom: "4px", display: "block" },
  field:       { display: "flex", flexDirection: "column" },
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  g3:          { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
  topGrid:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" },
  topBox:      { border: "1px solid #d1d5db", borderRadius: "6px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" },
  mainSecTitle:{ backgroundColor: "#e5e7eb", textAlign: "center", padding: "11px", fontSize: "14px", fontWeight: "700", color: "#1f2937", borderRadius: "6px", marginBottom: "16px" },
  panelGrid:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  panel:       { border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  panelHeader: { backgroundColor: "#4b5563", color: "#fff", textAlign: "center", padding: "9px 12px", fontSize: "13px", fontWeight: "600" },
  panelSub:    { textAlign: "center", fontSize: "12px", color: "#374151", padding: "6px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb" },
  panelBody:   { padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" },
  subSecBar:   { backgroundColor: "#e5e7eb", textAlign: "center", padding: "6px", fontSize: "12px", fontWeight: "600", color: "#374151", borderRadius: "4px" },
  healthRow:   { display: "grid", gridTemplateColumns: "80px 1fr 60px 60px 60px", alignItems: "center", gap: "8px" },
  healthLabel: { fontSize: "12px", fontWeight: "500", color: "#374151" },
  smallLabel:  { fontSize: "11px", color: "#6b7280", textAlign: "center" },
  smallInput:  { width: "100%", border: "1px solid #d1d5db", borderRadius: "4px", padding: "5px 7px", fontSize: "12px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  heightRow:   { display: "grid", gridTemplateColumns: "1fr 80px", gap: "6px", alignItems: "center" },
  submitWrap:  { display: "flex", justifyContent: "center", marginTop: "24px" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "11px 52px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" },
};

const ROG_OPTIONS      = ["वात रोग", "पित्त रोग", "कफ रोग", "सन्धिवात", "अम्लपित्त", "अन्य"];
const PRAKRITI_OPTIONS = ["वात", "पित्त", "कफ", "वात-पित्त", "पित्त-कफ", "वात-कफ", "त्रिदोष"];
const LINGA_OPTIONS    = [{ v: "male", l: "पुरुष" }, { v: "female", l: "महिला" }, { v: "other", l: "अन्य" }];
const JAATI_OPTIONS    = ["ब्राह्मण", "क्षेत्री", "जनजाति", "दलित", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS    = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "बुटवल", "धरान", "विराटनगर", "अन्य"];
const HEIGHT_UNITS     = ["ft.", "cm", "inch"];

const initPanel = () => ({
  miti: "",
  ashwagandha: "", amalaki: "", mahanarayan: "",
  taul: "", ubchadVal: "", ubchadUnit: "ft.",
  bmi: "", hb: "", esr: "", nindra: "",
  // followup only
  bmiSudhar: "", bmiSthir: "", bmiHras: "",
  hbSudhar: "", hbSthir: "", hbHras: "",
  esrSudhar: "", esrSthir: "", esrHras: "",
  nindraSudhar: "", nindraSthir: "", nindraHras: "",
  parikshan: "", kaifiyat: "",
});

export default function JesthaNagarikServiceRegister() {
  const today = "18/01/2083";

  const [form, setForm] = useState({
    moolDarta: "",
    raktachap: "", taul: "", fbs: "", prakriti: "", rog: "", parikshan: "",
    naam: "", thar: "", umer: "", linga: "",
    samparkNum: "", jaati: "", wada: "", tol: "", jilla: "",
  });
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  // pahilo jaanch (initial), falloap1, falloap2, falloap3
  const [panels, setPanels] = useState({
    pahilo: initPanel(),
    f1: initPanel(),
    f2: initPanel(),
    f3: initPanel(),
  });
  const setP = (panel, f) => (e) => setPanels((p) => ({ ...p, [panel]: { ...p[panel], [f]: e.target.value } }));

  const handleSubmit = () => alert("फारम सफलतापूर्वक बुझाइयो!");

  // Initial check panel (no sudhar/sthir/hras columns)
  const PahiloPanel = () => {
    const p = panels.pahilo;
    return (
      <div style={S.panel}>
        <div style={S.panelHeader}>स्वास्थ्य अवस्था र जाँच</div>
        <div style={S.panelSub}>पहिलो जाँच</div>
        <div style={S.panelBody}>
          <div style={S.field}><label style={S.label}>मिति</label><input style={S.input} value={p.miti} onChange={setP("pahilo","miti")} /></div>
          <div>
            <div style={S.g3}>
              <div style={{ fontSize: "12px", color: "#374151", textAlign: "center", fontWeight: "500" }}>अश्वगन्धा चूर्ण</div>
              <div style={{ fontSize: "12px", color: "#374151", textAlign: "center", fontWeight: "500" }}>आमलकी चूर्ण</div>
              <div style={{ fontSize: "12px", color: "#374151", textAlign: "center", fontWeight: "500" }}>महानारायण तेल</div>
            </div>
            <div style={{ ...S.g3, marginTop: "5px" }}>
              <input style={S.input} placeholder="मात्रा" value={p.ashwagandha} onChange={setP("pahilo","ashwagandha")} />
              <input style={S.input} placeholder="मात्रा" value={p.amalaki} onChange={setP("pahilo","amalaki")} />
              <input style={S.input} placeholder="मात्रा" value={p.mahanarayan} onChange={setP("pahilo","mahanarayan")} />
            </div>
          </div>
          <div style={S.g2}>
            <div style={S.field}><label style={S.label}>उचाइ</label>
              <div style={S.heightRow}>
                <input style={S.input} value={p.ubchadVal} onChange={setP("pahilo","ubchadVal")} />
                <select style={S.select} value={p.ubchadUnit} onChange={setP("pahilo","ubchadUnit")}>
                  {HEIGHT_UNITS.map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div style={S.field}><label style={S.label}>तौल</label><input style={S.input} placeholder="के.जी." value={p.taul} onChange={setP("pahilo","taul")} /></div>
          </div>
          <div style={S.subSecBar}>स्वास्थ्य अवस्था</div>
          {[
            { key: "bmi", label: "BMI" },
            { key: "hb", label: "Hb %" },
            { key: "esr", label: "ESR" },
            { key: "nindra", label: "निन्द्रा" },
          ].map(({ key, label }) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "60px 1fr", alignItems: "center", gap: "8px" }}>
              <span style={S.healthLabel}>{label}</span>
              <input style={S.input} placeholder={label} value={p[key]} onChange={setP("pahilo", key)} />
            </div>
          ))}
          <div style={S.field}><label style={S.label}>परीक्षण / सल्लाह</label><input style={S.input} value={p.parikshan} onChange={setP("pahilo","parikshan")} /></div>
          <div style={S.field}><label style={S.label}>कैफियत</label><input style={S.input} value={p.kaifiyat} onChange={setP("pahilo","kaifiyat")} /></div>
        </div>
      </div>
    );
  };

  // Followup panel (with sudhar/sthir/hras)
  const FollowupPanel = ({ panelKey, title, sub }) => {
    const p = panels[panelKey];
    return (
      <div style={S.panel}>
        <div style={S.panelHeader}>{title}</div>
        <div style={S.panelSub}>{sub}</div>
        <div style={S.panelBody}>
          <div style={S.field}><label style={S.label}>मिति</label><input style={S.input} value={p.miti} onChange={setP(panelKey,"miti")} /></div>
          <div>
            <div style={S.g3}>
              <div style={{ fontSize: "12px", color: "#374151", textAlign: "center", fontWeight: "500" }}>अश्वगन्धा चूर्ण</div>
              <div style={{ fontSize: "12px", color: "#374151", textAlign: "center", fontWeight: "500" }}>आमलकी चूर्ण</div>
              <div style={{ fontSize: "12px", color: "#374151", textAlign: "center", fontWeight: "500" }}>महानारायण तेल</div>
            </div>
            <div style={{ ...S.g3, marginTop: "5px" }}>
              <input style={S.input} placeholder="मात्रा" value={p.ashwagandha} onChange={setP(panelKey,"ashwagandha")} />
              <input style={S.input} placeholder="मात्रा" value={p.amalaki} onChange={setP(panelKey,"amalaki")} />
              <input style={S.input} placeholder="मात्रा" value={p.mahanarayan} onChange={setP(panelKey,"mahanarayan")} />
            </div>
          </div>
          <div style={S.g2}>
            <div style={S.field}><label style={S.label}>तौल</label><input style={S.input} placeholder="के.जी." value={p.taul} onChange={setP(panelKey,"taul")} /></div>
            <div style={S.field}><label style={S.label}>उचाइ</label>
              <div style={S.heightRow}>
                <input style={S.input} value={p.ubchadVal} onChange={setP(panelKey,"ubchadVal")} />
                <select style={S.select} value={p.ubchadUnit} onChange={setP(panelKey,"ubchadUnit")}>
                  {HEIGHT_UNITS.map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div style={S.subSecBar}>स्वास्थ्य अवस्था</div>
          {[
            { key: "bmi",    sudhar: "bmiSudhar",    sthir: "bmiSthir",    hras: "bmiHras",    label: "BMI" },
            { key: "hb",     sudhar: "hbSudhar",     sthir: "hbSthir",     hras: "hbHras",     label: "Hb %" },
            { key: "esr",    sudhar: "esrSudhar",    sthir: "esrSthir",    hras: "esrHras",    label: "ESR" },
            { key: "nindra", sudhar: "nindraSudhar", sthir: "nindraSthir", hras: "nindraHras", label: "निन्द्रा" },
          ].map(({ key, sudhar, sthir, hras, label }) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "50px 1fr 50px 50px 50px", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: "500", color: "#374151" }}>{label}</span>
              <input style={S.smallInput} placeholder={label} value={p[key]} onChange={setP(panelKey, key)} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <span style={S.smallLabel}>सुधार</span>
                <input style={S.smallInput} value={p[sudhar]} onChange={setP(panelKey, sudhar)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <span style={S.smallLabel}>स्थिर</span>
                <input style={S.smallInput} value={p[sthir]} onChange={setP(panelKey, sthir)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <span style={S.smallLabel}>ह्रास</span>
                <input style={S.smallInput} value={p[hras]} onChange={setP(panelKey, hras)} />
              </div>
            </div>
          ))}
          <div style={S.field}><label style={S.label}>परीक्षण / सल्लाह</label><input style={S.input} value={p.parikshan} onChange={setP(panelKey,"parikshan")} /></div>
          <div style={S.field}><label style={S.label}>कैफियत</label><input style={S.input} value={p.kaifiyat} onChange={setP(panelKey,"kaifiyat")} /></div>
        </div>
      </div>
    );
  };

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>जेष्ठ नागरिक सेवा दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}जेष्ठ नागरिक सेवा दर्ता
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
              <div style={S.field}><label style={S.label}>रक्तचाप</label><input style={S.input} placeholder="mm Hg" value={form.raktachap} onChange={set("raktachap")} /></div>
              <div style={S.field}><label style={S.label}>तौल</label><input style={S.input} placeholder="के.जी." value={form.taul} onChange={set("taul")} /></div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>FBS</label><input style={S.input} placeholder="mg/dL" value={form.fbs} onChange={set("fbs")} /></div>
              <div style={S.field}><label style={S.label}>प्रकृति</label>
                <select style={S.select} value={form.prakriti} onChange={set("prakriti")}>
                  <option value="">प्रकृति छनोट गर्नहोस</option>
                  {PRAKRITI_OPTIONS.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>रोग</label>
                <select style={S.select} value={form.rog} onChange={set("rog")}>
                  <option value="">रोग छनोट गर्नहोस</option>
                  {ROG_OPTIONS.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.field}><label style={S.label}>परीक्षण</label><input style={S.input} value={form.parikshan} onChange={set("parikshan")} /></div>
            </div>
          </div>

          {/* Right */}
          <div style={S.topBox}>
            <div style={S.field}>
              <label style={S.label}>सेवाग्राहीको विवरण</label>
              <div style={S.g2}>
                <input style={S.input} placeholder="नाम *" value={form.naam} onChange={set("naam")} />
                <input style={S.input} placeholder="थर *" value={form.thar} onChange={set("thar")} />
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>उमेर</label><input style={S.input} placeholder="उमेर *" value={form.umer} onChange={set("umer")} /></div>
              <div style={S.field}><label style={S.label}>लिङ्ग</label>
                <select style={S.select} value={form.linga} onChange={set("linga")}>
                  <option value="">लिङ्ग छनोट गर्नुहोस्</option>
                  {LINGA_OPTIONS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>सम्पर्क नम्बर</label><input style={S.input} placeholder="सम्पर्क नम्बर *" value={form.samparkNum} onChange={set("samparkNum")} /></div>
              <div style={S.field}><label style={S.label}>जाती</label>
                <select style={S.select} value={form.jaati} onChange={set("jaati")}>
                  <option value="">जाती छनोट गर्नुहोस्</option>
                  {JAATI_OPTIONS.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.g2}>
              <div style={S.field}><label style={S.label}>वडा नम्बर</label><input style={S.input} placeholder="वडा नम्बर" value={form.wada} onChange={set("wada")} /></div>
              <div style={S.field}><label style={S.label}>टोल</label><input style={S.input} placeholder="टोल" value={form.tol} onChange={set("tol")} /></div>
            </div>
            <div style={S.field}><label style={S.label}>जिल्ला</label>
              <select style={S.select} value={form.jilla} onChange={set("jilla")}>
                <option value="">जिल्ला छनोट गर्नुहोस्</option>
                {JILLA_OPTIONS.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* जेष्ठ नागरिकको स्वास्थ्य जाँच */}
        <div style={S.mainSecTitle}>जेष्ठ नागरिकको स्वास्थ्य जाँच</div>

        {/* Row 1: पहिलो जाँच + फलोअप 1 */}
        <div style={S.panelGrid}>
          <PahiloPanel />
          <FollowupPanel panelKey="f1" title="फलोअप 1" sub="1 महिना" />
        </div>

        {/* Row 2: फलोअप 2 + फलोअप 3 */}
        <div style={S.panelGrid}>
          <FollowupPanel panelKey="f2" title="फलोअप 2" sub="2 महिना" />
          <FollowupPanel panelKey="f3" title="फलोअप 3" sub="3 महिना" />
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