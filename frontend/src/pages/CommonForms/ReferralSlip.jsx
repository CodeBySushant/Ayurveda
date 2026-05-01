import { useState } from "react";

const S = {
  page:        { padding: "24px", backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif", boxSizing: "border-box" },
  card:        { backgroundColor: "#fff", borderRadius: "8px", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  headerBar:   { display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f1f5f9", border: "1px solid #d1d5db", borderRadius: "6px", padding: "10px 16px", marginBottom: "20px" },
  headerTitle: { fontSize: "18px", fontWeight: "700", color: "#1f2937" },
  breadcrumb:  { fontSize: "13px", color: "#6b7280" },
  bcLink:      { color: "#0d9488", cursor: "pointer" },
  mitiRow:     { display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" },
  label:       { fontSize: "13px", fontWeight: "500", color: "#374151", whiteSpace: "nowrap" },
  // section
  section:     { border: "1px solid #d1d5db", borderRadius: "6px", marginBottom: "20px", overflow: "hidden" },
  secTitle:    { backgroundColor: "#f8fafc", borderBottom: "1px solid #d1d5db", textAlign: "center", padding: "10px", fontSize: "14px", fontWeight: "600", color: "#374151" },
  secBody:     { padding: "18px 20px", display: "flex", flexDirection: "column", gap: "16px" },
  // inputs
  input:       { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#111827", backgroundColor: "#fff", boxSizing: "border-box", outline: "none" },
  inputRO:     { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#6b7280", backgroundColor: "#f9fafb", boxSizing: "border-box", outline: "none" },
  select:      { width: "100%", border: "1px solid #d1d5db", borderRadius: "5px", padding: "7px 11px", fontSize: "13px", color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", outline: "none", cursor: "pointer" },
  // layout helpers
  lr:          { display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: "10px" },          // label-row
  g2:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },                                   // 2 col
  // table
  table:       { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th:          { backgroundColor: "#e5e7eb", color: "#374151", fontWeight: "600", padding: "9px 12px", border: "1px solid #d1d5db", textAlign: "center" },
  td:          { padding: "8px 10px", border: "1px solid #d1d5db", verticalAlign: "middle" },
  tdc:         { padding: "8px 10px", border: "1px solid #d1d5db", verticalAlign: "middle", textAlign: "center" },
  // submit
  submitWrap:  { display: "flex", justifyContent: "center", marginTop: "24px" },
  submitBtn:   { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 40px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
};

const PRADESH = [{ value: "1", label: "कोशी प्रदेश" }, { value: "2", label: "मधेश प्रदेश" }, { value: "3", label: "बागमती प्रदेश" }, { value: "4", label: "गण्डकी प्रदेश" }, { value: "5", label: "लुम्बिनी प्रदेश" }, { value: "6", label: "कर्णाली प्रदेश" }, { value: "7", label: "सुदूरपश्चिम प्रदेश" }];
const LINGA   = [{ value: "male", label: "पुरुष" }, { value: "female", label: "महिला" }, { value: "other", label: "अन्य" }];
const JILLA   = [{ value: "ktm", label: "काठमाडौं" }, { value: "bkt", label: "भक्तपुर" }, { value: "llt", label: "ललितपुर" }, { value: "pokhara", label: "पोखरा" }, { value: "chitwan", label: "चितवन" }];
const HEIGHT_UNIT = [{ value: "ft", label: "ft." }, { value: "cm", label: "cm" }];

const newSewaRow   = () => ({ id: Date.now() + Math.random(), sewa: "" });
const newAusadhiRow = () => ({ id: Date.now() + Math.random(), ausadhi: "", matra: "" });

export default function ReferralSlip() {
  const today = "18/01/2083";

  // Section 1 – Swastha Sanstha
  const [sanstha1, setSanstha1] = useState({ naam: "", thegana: "", samparka: "", pradesh: "" });

  // Section 2 – Sewagrahi
  const [patient, setPatient] = useState({ mulDarta: "", naam: "", thar: "", linga: "", umer: "", jilla: "", wadaNumber: "" });

  // Liera heko sewa table
  const [sewaRows, setSewaRows] = useState([newSewaRow()]);

  // Vitals
  const [vitals, setVitals] = useState({ bp: "", pulse: "", temp: "", resp: "", weight: "", height: "", heightUnit: "ft", prakriti: "", therapy: "" });

  // Ausadhi table
  const [ausadhiRows, setAusadhiRows] = useState([newAusadhiRow()]);

  // Other
  const [anyaUllekh, setAnyaUllekh] = useState("");

  // Section 3 – Referred To
  const [sanstha2, setSanstha2] = useState({ naam: "", thegana: "", samparkMiti: today, anyaParikshan: "", kaaran: "" });

  // Section 4 – Official
  const [official, setOfficial] = useState({ naam: "", pad: "" });

  const setS1 = (f) => (e) => setSanstha1((p) => ({ ...p, [f]: e.target.value }));
  const setPt = (f) => (e) => setPatient((p) => ({ ...p, [f]: e.target.value }));
  const setV  = (f) => (e) => setVitals((p) => ({ ...p, [f]: e.target.value }));
  const setS2 = (f) => (e) => setSanstha2((p) => ({ ...p, [f]: e.target.value }));
  const setOf = (f) => (e) => setOfficial((p) => ({ ...p, [f]: e.target.value }));

  const addSewa    = () => setSewaRows((r) => [...r, newSewaRow()]);
  const removeSewa = (id) => setSewaRows((r) => r.length > 1 ? r.filter((x) => x.id !== id) : r);
  const updateSewa = (id, val) => setSewaRows((r) => r.map((x) => x.id === id ? { ...x, sewa: val } : x));

  const addAusadhi    = () => setAusadhiRows((r) => [...r, newAusadhiRow()]);
  const removeAusadhi = (id) => setAusadhiRows((r) => r.length > 1 ? r.filter((x) => x.id !== id) : r);
  const updateAusadhi = (id, f, val) => setAusadhiRows((r) => r.map((x) => x.id === id ? { ...x, [f]: val } : x));

  const handleSubmit = (e) => { e.preventDefault(); alert("फारम सफलतापूर्वक बुझाइयो!"); };

  const iconBtn = (color, onClick, icon) => (
    <button type="button" onClick={onClick}
      style={{ background: "none", border: "none", color, fontSize: "17px", fontWeight: "700", cursor: "pointer", padding: "0 3px", lineHeight: 1 }}>
      {icon}
    </button>
  );

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>प्रेषण / स्थानान्तरण पुर्जि दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>{" / "}प्रेषण / स्थानान्तरण पुर्जि दर्ता
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.label}>मिति :</span>
          <input style={{ ...S.inputRO, width: "160px" }} value={today} readOnly />
        </div>

        <form onSubmit={handleSubmit}>

          {/* ══ 1. स्वास्थ्य संस्थाको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>स्वास्थ्य संस्थाको विवरण</div>
            <div style={S.secBody}>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>स्वास्थ्य संस्थाको नाम :</span>
                  <input style={S.input} value={sanstha1.naam} onChange={setS1("naam")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>ठेगाना :</span>
                  <input style={S.input} value={sanstha1.thegana} onChange={setS1("thegana")} />
                </div>
              </div>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>सम्पर्क नम्बर :</span>
                  <input style={S.input} value={sanstha1.samparka} onChange={setS1("samparka")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>प्रदेश :</span>
                  <select style={S.select} value={sanstha1.pradesh} onChange={setS1("pradesh")}>
                    <option value="">प्रदेश छनोट गर्नहोस</option>
                    {PRADESH.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* ══ 2. सेवाग्राहीको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>सेवाग्राहीको विवरण</div>
            <div style={S.secBody}>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>मूल दर्ता नम्बर :</span>
                  <input style={S.input} value={patient.mulDarta} onChange={setPt("mulDarta")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>नाम :</span>
                  <input style={S.input} value={patient.naam} onChange={setPt("naam")} />
                </div>
              </div>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>थर :</span>
                  <input style={S.input} value={patient.thar} onChange={setPt("thar")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>लिङ्ग :</span>
                  <select style={S.select} value={patient.linga} onChange={setPt("linga")}>
                    <option value="">लिङ्ग छनोट गर्नहोस</option>
                    {LINGA.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>उमेर :</span>
                  <input style={S.input} value={patient.umer} onChange={setPt("umer")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>जिल्ला :</span>
                  <select style={S.select} value={patient.jilla} onChange={setPt("jilla")}>
                    <option value="">जिल्ला छनोट गर्नहोस</option>
                    {JILLA.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div style={S.lr}>
                <span style={S.label}>वडा नम्बर :</span>
                <input style={{ ...S.input, maxWidth: "320px" }} value={patient.wadaNumber} onChange={setPt("wadaNumber")} />
              </div>

              {/* लिइरहेको सेवा table */}
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, width: "56px" }}>क्र.सं.</th>
                    <th style={S.th}>लिइरहेको सेवा</th>
                    <th style={{ ...S.th, width: "72px" }}>थप</th>
                  </tr>
                </thead>
                <tbody>
                  {sewaRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={S.tdc}>{idx + 1}</td>
                      <td style={S.td}>
                        <input style={S.input} value={row.sewa} onChange={(e) => updateSewa(row.id, e.target.value)} />
                      </td>
                      <td style={S.tdc}>
                        {iconBtn("#0d9488", addSewa, "+")}
                        {iconBtn("#ef4444", () => removeSewa(row.id), "✕")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Vitals */}
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>Blood Pressure :</span>
                  <input style={S.input} value={vitals.bp} onChange={setV("bp")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>Pulse :</span>
                  <input style={S.input} value={vitals.pulse} onChange={setV("pulse")} />
                </div>
              </div>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>Temperature :</span>
                  <input style={S.input} value={vitals.temp} onChange={setV("temp")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>Respiration :</span>
                  <input style={S.input} value={vitals.resp} onChange={setV("resp")} />
                </div>
              </div>

              {/* Weight + Height with unit selector */}
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>Weight (kg) :</span>
                  <input style={S.input} value={vitals.weight} onChange={setV("weight")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>Height :</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input style={{ ...S.input, flex: 1 }} value={vitals.height} onChange={setV("height")} />
                    <select style={{ ...S.select, width: "72px" }} value={vitals.heightUnit} onChange={setV("heightUnit")}>
                      {HEIGHT_UNIT.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>प्रकृति :</span>
                  <input style={S.input} value={vitals.prakriti} onChange={setV("prakriti")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>आयुर्वेद थेरापी :</span>
                  <input style={S.input} value={vitals.therapy} onChange={setV("therapy")} />
                </div>
              </div>

              {/* प्रयोग भएको औषधि table */}
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, width: "56px" }}>क्र.सं.</th>
                    <th style={S.th}>प्रयोग भएको औषधि</th>
                    <th style={S.th}>मात्रा</th>
                    <th style={{ ...S.th, width: "72px" }}>थप</th>
                  </tr>
                </thead>
                <tbody>
                  {ausadhiRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={S.tdc}>{idx + 1}</td>
                      <td style={S.td}>
                        <input style={S.input} value={row.ausadhi} onChange={(e) => updateAusadhi(row.id, "ausadhi", e.target.value)} />
                      </td>
                      <td style={S.td}>
                        <input style={S.input} value={row.matra} onChange={(e) => updateAusadhi(row.id, "matra", e.target.value)} />
                      </td>
                      <td style={S.tdc}>
                        {iconBtn("#0d9488", addAusadhi, "+")}
                        {iconBtn("#ef4444", () => removeAusadhi(row.id), "✕")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Anya ullekh */}
              <div style={S.lr}>
                <span style={S.label}>अन्य केही भए उल्लेख गर्ने :</span>
                <input style={S.input} value={anyaUllekh} onChange={(e) => setAnyaUllekh(e.target.value)} />
              </div>

            </div>
          </div>

          {/* ══ 3. प्रेषण / स्थानान्तरण गरिएको स्वास्थ्य संस्थाको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>प्रेषण / स्थानान्तरण गरिएको स्वास्थ्य संस्थाको विवरण</div>
            <div style={S.secBody}>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>स्वास्थ्य संस्थाको नाम :</span>
                  <input style={S.input} value={sanstha2.naam} onChange={setS2("naam")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>ठेगाना :</span>
                  <input style={S.input} value={sanstha2.thegana} onChange={setS2("thegana")} />
                </div>
              </div>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>सम्पर्क गर्नुपर्ने मिति :</span>
                  <input style={S.inputRO} value={sanstha2.samparkMiti} readOnly />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>अन्य परिक्षण गर्नुपर्ने भए उल्लेख गर्ने :</span>
                  <input style={S.input} value={sanstha2.anyaParikshan} onChange={setS2("anyaParikshan")} />
                </div>
              </div>

              <div style={S.lr}>
                <span style={S.label}>स्थानान्तरण / प्रेषण गरिनुको कारण :</span>
                <input style={S.input} value={sanstha2.kaaran} onChange={setS2("kaaran")} />
              </div>

            </div>
          </div>

          {/* ══ 4. आधिकारिक व्यक्तिको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>आधिकारिक व्यक्तिको विवरण</div>
            <div style={S.secBody}>

              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>प्रेषण / स्थानान्तरण गर्नेको नाम :</span>
                  <input style={S.input} value={official.naam} onChange={setOf("naam")} />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>पद :</span>
                  <input style={S.input} value={official.pad} onChange={setOf("pad")} />
                </div>
              </div>

            </div>
          </div>

          {/* Submit */}
          <div style={S.submitWrap}>
            <button
              type="submit"
              style={S.submitBtn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
            >
              बुझाउनुहोस्
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}