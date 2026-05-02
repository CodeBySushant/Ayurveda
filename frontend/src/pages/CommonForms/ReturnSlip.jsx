import { useState } from "react";
import axios from "axios";

const S = {
  page: {
    padding: "24px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "24px 28px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f5f9",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "10px 16px",
    marginBottom: "20px",
  },
  headerTitle: { fontSize: "18px", fontWeight: "700", color: "#1f2937" },
  breadcrumb: { fontSize: "13px", color: "#6b7280" },
  bcLink: { color: "#0d9488", cursor: "pointer" },
  mitiRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    whiteSpace: "nowrap",
  },
  section: {
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  secTitle: {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #d1d5db",
    textAlign: "center",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  secBody: {
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    padding: "7px 11px",
    fontSize: "13px",
    color: "#111827",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    outline: "none",
  },
  inputRO: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    padding: "7px 11px",
    fontSize: "13px",
    color: "#6b7280",
    backgroundColor: "#f9fafb",
    boxSizing: "border-box",
    outline: "none",
  },
  select: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    padding: "7px 11px",
    fontSize: "13px",
    color: "#374151",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    outline: "none",
    cursor: "pointer",
  },
  lr: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    alignItems: "center",
    gap: "10px",
  },
  g2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
    fontWeight: "600",
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    textAlign: "center",
  },
  td: {
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    verticalAlign: "middle",
  },
  tdc: {
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    verticalAlign: "middle",
    textAlign: "center",
  },
  submitWrap: { display: "flex", justifyContent: "center", marginTop: "24px" },
  submitBtn: {
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 40px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

const PRADESH = [
  { value: "1", label: "कोशी प्रदेश" },
  { value: "2", label: "मधेश प्रदेश" },
  { value: "3", label: "बागमती प्रदेश" },
  { value: "4", label: "गण्डकी प्रदेश" },
  { value: "5", label: "लुम्बिनी प्रदेश" },
  { value: "6", label: "कर्णाली प्रदेश" },
  { value: "7", label: "सुदूरपश्चिम प्रदेश" },
];
const LINGA = [
  { value: "male", label: "पुरुष" },
  { value: "female", label: "महिला" },
  { value: "other", label: "अन्य" },
];

const newRow = () => ({ id: Date.now() + Math.random(), sewa: "" });

export default function ReturnSlip() {
  const today = new Date().toLocaleDateString("en-GB");

  // Section 1 – फिर्ती जानकारी दिने स्वास्थ्य संस्था
  const [sanstha1, setSanstha1] = useState({ naam: "", pradesh: "", wada: "" });

  // Section 2 – फिर्ती जानकारी पठाइएको स्वास्थ्य संस्था
  const [sanstha2, setSanstha2] = useState({ naam: "", thegana: "" });

  // Section 3 – सेवाग्राहीको विवरण
  const [patient, setPatient] = useState({
    naam: "",
    thar: "",
    linga: "",
    umer: "",
    pradesh: "",
    wada: "",
    samparkMiti: today,
  });

  // दिइएको सेवा rows
  const [sewaRows, setSewaRows] = useState([newRow()]);

  // Section 4 – फिर्ती जानकारी दिनेको विवरण
  const [info, setInfo] = useState({ naam: "", pad: "", miti: today });

  const [loading, setLoading] = useState(false);

  const setS1 = (f) => (e) =>
    setSanstha1((p) => ({ ...p, [f]: e.target.value }));
  const setS2 = (f) => (e) =>
    setSanstha2((p) => ({ ...p, [f]: e.target.value }));
  const setPt = (f) => (e) =>
    setPatient((p) => ({ ...p, [f]: e.target.value }));
  const setIn = (f) => (e) => setInfo((p) => ({ ...p, [f]: e.target.value }));

  const addRow = () => setSewaRows((r) => [...r, newRow()]);
  const removeRow = (id) =>
    setSewaRows((r) => (r.length > 1 ? r.filter((x) => x.id !== id) : r));
  const updateRow = (id, val) =>
    setSewaRows((r) => r.map((x) => (x.id === id ? { ...x, sewa: val } : x)));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        formDate: today,

        fromInstitutionName: sanstha1.naam,
        fromProvince: sanstha1.pradesh,
        fromWard: sanstha1.wada,

        toInstitutionName: sanstha2.naam,
        toAddress: sanstha2.thegana,

        firstName: patient.naam,
        lastName: patient.thar,
        gender: patient.linga,
        age: patient.umer,
        patientProvince: patient.pradesh,
        patientWard: patient.wada,
        contactVisitDate: patient.samparkMiti,

        providerName: info.naam,
        providerDesignation: info.pad,
        providerDate: info.miti,

        services: sewaRows
          .filter((x) => x.sewa.trim())
          .map((x) => ({
            serviceName: x.sewa,
          })),
      };

      const res = await axios.post(
        "http://localhost:5000/api/common/return-slip",
        payload,
      );

      alert(`Return Slip Saved\n${res.data.slipNumber}`);

      /* Reset */
      setSanstha1({
        naam: "",
        pradesh: "",
        wada: "",
      });

      setSanstha2({
        naam: "",
        thegana: "",
      });

      setPatient({
        naam: "",
        thar: "",
        linga: "",
        umer: "",
        pradesh: "",
        wada: "",
        samparkMiti: today,
      });

      setSewaRows([newRow()]);

      setInfo({
        naam: "",
        pad: "",
        miti: today,
      });
    } catch (error) {
      console.log(error);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const iconBtn = (color, onClick, icon) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color,
        fontSize: "17px",
        fontWeight: "700",
        cursor: "pointer",
        padding: "0 3px",
        lineHeight: 1,
      }}
    >
      {icon}
    </button>
  );

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>फिर्ती पुर्जि दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.bcLink}>गृहपृष्ठ</span>
            {" / "}फिर्ती पुर्जि दर्ता
          </span>
        </div>

        {/* Miti */}
        <div style={S.mitiRow}>
          <span style={S.label}>मिति :</span>
          <input
            style={{ ...S.inputRO, width: "160px" }}
            value={today}
            readOnly
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* ══ 1. फिर्ती जानकारी दिने स्वास्थ्य संस्थाको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>
              फिर्ती जानकारी दिने स्वास्थ्य संस्थाको विवरण
            </div>
            <div style={S.secBody}>
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>स्वास्थ्य संस्थाको नाम :</span>
                  <input
                    style={S.input}
                    value={sanstha1.naam}
                    onChange={setS1("naam")}
                  />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>प्रदेश :</span>
                  <select
                    style={S.select}
                    value={sanstha1.pradesh}
                    onChange={setS1("pradesh")}
                  >
                    <option value="">प्रदेश छनोट गर्नहोस</option>
                    {PRADESH.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={S.lr}>
                <span style={S.label}>वडा नम्बर :</span>
                <input
                  style={{ ...S.input, maxWidth: "320px" }}
                  value={sanstha1.wada}
                  onChange={setS1("wada")}
                />
              </div>
            </div>
          </div>

          {/* ══ 2. फिर्ती जानकारी पठाइएको स्वास्थ्य संस्थाको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>
              फिर्ती जानकारी पठाइएको स्वास्थ्य संस्थाको विवरण
            </div>
            <div style={S.secBody}>
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>स्वास्थ्य संस्थाको नाम :</span>
                  <input
                    style={S.input}
                    value={sanstha2.naam}
                    onChange={setS2("naam")}
                  />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>ठेगाना :</span>
                  <input
                    style={S.input}
                    value={sanstha2.thegana}
                    onChange={setS2("thegana")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ══ 3. सेवाग्राहीको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>सेवाग्राहीको विवरण</div>
            <div style={S.secBody}>
              {/* Naam + Thar */}
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>नाम :</span>
                  <input
                    style={S.input}
                    value={patient.naam}
                    onChange={setPt("naam")}
                  />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>थर :</span>
                  <input
                    style={S.input}
                    value={patient.thar}
                    onChange={setPt("thar")}
                  />
                </div>
              </div>

              {/* Linga + Umer */}
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>लिङ्ग :</span>
                  <select
                    style={S.select}
                    value={patient.linga}
                    onChange={setPt("linga")}
                  >
                    <option value="">लिङ्ग छनोट गर्नहोस</option>
                    {LINGA.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={S.lr}>
                  <span style={S.label}>उमेर :</span>
                  <input
                    style={S.input}
                    value={patient.umer}
                    onChange={setPt("umer")}
                  />
                </div>
              </div>

              {/* Pradesh – full width left side */}
              <div style={S.lr}>
                <span style={S.label}>प्रदेश :</span>
                <select
                  style={{ ...S.select, maxWidth: "320px" }}
                  value={patient.pradesh}
                  onChange={setPt("pradesh")}
                >
                  <option value="">प्रदेश छनोट गर्नहोस</option>
                  {PRADESH.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Wada + Samparka Miti */}
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>वडा नम्बर :</span>
                  <input
                    style={S.input}
                    value={patient.wada}
                    onChange={setPt("wada")}
                  />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>सम्पर्क गर्न आएको मिति :</span>
                  <input
                    style={S.inputRO}
                    value={patient.samparkMiti}
                    readOnly
                  />
                </div>
              </div>

              {/* दिइएको सेवा table */}
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, width: "56px" }}>क्र.सं.</th>
                    <th style={S.th}>दिइएको सेवा</th>
                    <th style={{ ...S.th, width: "72px" }}>थप</th>
                  </tr>
                </thead>
                <tbody>
                  {sewaRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={S.tdc}>{idx + 1}</td>
                      <td style={S.td}>
                        <input
                          style={S.input}
                          value={row.sewa}
                          onChange={(e) => updateRow(row.id, e.target.value)}
                        />
                      </td>
                      <td style={S.tdc}>
                        {iconBtn("#0d9488", addRow, "+")}
                        {iconBtn("#ef4444", () => removeRow(row.id), "✕")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ══ 4. फिर्ती जानकारी दिनेको विवरण ══ */}
          <div style={S.section}>
            <div style={S.secTitle}>फिर्ती जानकारी दिनेको विवरण</div>
            <div style={S.secBody}>
              {/* Naam + Pad */}
              <div style={S.g2}>
                <div style={S.lr}>
                  <span style={S.label}>फिर्ती जानकारी दिनेको नाम :</span>
                  <input
                    style={S.input}
                    value={info.naam}
                    onChange={setIn("naam")}
                  />
                </div>
                <div style={S.lr}>
                  <span style={S.label}>पद :</span>
                  <input
                    style={S.input}
                    value={info.pad}
                    onChange={setIn("pad")}
                  />
                </div>
              </div>

              {/* Miti */}
              <div style={S.lr}>
                <span style={S.label}>मिति :</span>
                <input
                  style={{ ...S.inputRO, maxWidth: "320px" }}
                  value={info.miti}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={S.submitWrap}>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...S.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#15803d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#16a34a")
              }
            >
              {loading ? "Saving..." : "बुझाउनुहोस्"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
