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

  // Header bar
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
  breadcrumbLink: { color: "#0d9488", cursor: "pointer" },

  // Miti
  mitiRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },

  // Section box
  section: {
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  sectionTitle: {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #d1d5db",
    textAlign: "center",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  sectionBody: {
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  // Inputs
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

  // Label
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    whiteSpace: "nowrap",
  },

  // Label-left row: [label 160px] [input]
  labelRow: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    alignItems: "center",
    gap: "10px",
  },

  // Two label-input pairs side by side
  grid2LabelRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  // Table
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
    fontWeight: "600",
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    verticalAlign: "middle",
  },
  tdCenter: {
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    verticalAlign: "middle",
    textAlign: "center",
  },

  // Submit
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

const JATI_OPTIONS = [
  { value: "brahmin", label: "ब्राह्मण / क्षेत्री" },
  { value: "janajati", label: "जनजाति" },
  { value: "dalit", label: "दलित" },
  { value: "madhesi", label: "मधेसी" },
  { value: "other", label: "अन्य" },
];
const LINGA_OPTIONS = [
  { value: "male", label: "पुरुष" },
  { value: "female", label: "महिला" },
  { value: "other", label: "अन्य" },
];
const PRAKAR_OPTIONS = [
  { value: "opd", label: "OPD" },
  { value: "ipd", label: "IPD" },
  { value: "emergency", label: "आपतकालीन" },
  { value: "lab", label: "प्रयोगशाला" },
  { value: "xray", label: "एक्स-रे" },
  { value: "pharmacy", label: "फार्मेसी" },
];
const SEWA_BY_PRAKAR = {
  opd: [
    { value: "general", label: "सामान्य जाँच" },
    { value: "specialist", label: "विशेषज्ञ जाँच" },
  ],
  ipd: [
    { value: "admission", label: "भर्ना" },
    { value: "operation", label: "शल्यक्रिया" },
  ],
  emergency: [{ value: "first_aid", label: "प्राथमिक उपचार" }],
  lab: [
    { value: "blood", label: "रक्त परीक्षण" },
    { value: "urine", label: "पिसाब परीक्षण" },
  ],
  xray: [
    { value: "chest", label: "छाती" },
    { value: "spine", label: "मेरुदण्ड" },
  ],
  pharmacy: [{ value: "medicine", label: "औषधि" }],
};
const CHHAT_OPTIONS = [
  { value: "none", label: "छुट नभएको" },
  { value: "elderly", label: "जेष्ठ नागरिक" },
  { value: "dalit", label: "दलित" },
  { value: "disabled", label: "अपाङ्ग" },
];
const PRAAPTI_OPTIONS = [
  { value: "nagad", label: "नगद" },
  { value: "cheque", label: "चेक" },
  { value: "online", label: "अनलाइन" },
];

const newRow = () => ({
  id: Date.now() + Math.random(),
  sewaPrakar: "",
  sewa: "",
  shulk: "",
});

export default function AdditionalServiceBillingCreate() {
  const [patient, setPatient] = useState({
    mulDarta: "",
    naam: "",
    thar: "",
    jati: "",
    linga: "",
    umer: "",
    samparka: "",
  });
  const [rows, setRows] = useState([newRow()]);
  const [billing, setBilling] = useState({
    chhatKoPrakar: "",
    chhatPct: "",
    chhatRu: "",
    praaptiMadhyam: "nagad",
    chekNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const today = new Date().toLocaleDateString("en-GB");

  const setP = (f) => (e) => setPatient((p) => ({ ...p, [f]: e.target.value }));
  const setB = (f) => (e) => setBilling((b) => ({ ...b, [f]: e.target.value }));

  const updateRow = (id, field, value) =>
    setRows((rs) =>
      rs.map((r) => {
        if (r.id !== id) return r;
        const u = { ...r, [field]: value };
        if (field === "sewaPrakar") u.sewa = "";
        return u;
      }),
    );

  const addRow = () => setRows((rs) => [...rs, newRow()]);
  const removeRow = (id) =>
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));

  const subtotal = rows.reduce((s, r) => s + (parseFloat(r.shulk) || 0), 0);

  const handleChhatPct = (e) => {
    const pct = parseFloat(e.target.value) || 0;
    setBilling((b) => ({
      ...b,
      chhatPct: e.target.value,
      chhatRu: ((subtotal * pct) / 100).toFixed(2),
    }));
  };

  const total = Math.max(0, subtotal - (parseFloat(billing.chhatRu) || 0));
  const handleSearchPatient = async () => {
    if (!patient.mulDarta.trim()) {
      alert("मूल दर्ता नम्बर लेख्नुहोस्");
      return;
    }

    try {
      setSearching(true);

      const res = await axios.get(
        `http://localhost:5000/api/common/master-register/search?term=${patient.mulDarta}`,
      );

      if (!res.data || res.data.length === 0) {
        alert("सेवाग्राही फेला परेन");
        return;
      }

      const p = res.data[0];

      setPatient((prev) => ({
        ...prev,
        mulDarta: p.master_number || "",
        naam: p.first_name || "",
        thar: p.last_name || "",
        jati: p.caste || "",
        linga: p.gender || "",
        umer: p.age || "",
        samparka: p.contact_number || "",
      }));
    } catch (error) {
      alert("Search failed");
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patient.mulDarta.trim()) {
      alert("मूल दर्ता नम्बर आवश्यक छ");
      return;
    }

    if (rows.length === 0) {
      alert("कम्तीमा एउटा सेवा थप्नुहोस्");
      return;
    }

    const validRows = rows.filter(
      (r) => r.sewaPrakar && r.sewa && Number(r.shulk) > 0,
    );

    if (validRows.length === 0) {
      alert("सेवा विवरण सही भर्नुहोस्");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        masterNumber: patient.mulDarta,
        patientName: patient.naam,
        patientSurname: patient.thar,
        caste: patient.jati,
        gender: patient.linga,
        age: patient.umer,
        contactNumber: patient.samparka,

        discountType: billing.chhatKoPrakar,
        discountPercent: Number(billing.chhatPct || 0),
        discountAmount: Number(billing.chhatRu || 0),

        paymentMode: billing.praaptiMadhyam,
        referenceNumber: billing.chekNumber,

        subtotal: subtotal,
        totalAmount: total,

        items: validRows.map((r) => ({
          serviceType: r.sewaPrakar,
          serviceName: r.sewa,
          quantity: 1,
          rate: Number(r.shulk || 0),
          amount: Number(r.shulk || 0),
        })),
      };

      const res = await axios.post(
        "http://localhost:5000/api/common/additional-billing",
        payload,
      );

      alert(`बिल सफलतापूर्वक सुरक्षित भयो\n${res.data.billNumber}`);

      /* Reset Form */
      setPatient({
        mulDarta: "",
        naam: "",
        thar: "",
        jati: "",
        linga: "",
        umer: "",
        samparka: "",
      });

      setRows([newRow()]);

      setBilling({
        chhatKoPrakar: "",
        chhatPct: "",
        chhatRu: "",
        praaptiMadhyam: "nagad",
        chekNumber: "",
      });
    } catch (error) {
      console.log(error);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Header */}
        <div style={S.headerBar}>
          <span style={S.headerTitle}>थप सेवा बिलिङ दर्ता</span>
          <span style={S.breadcrumb}>
            <span style={S.breadcrumbLink}>गृहपृष्ठ</span>
            {" / "}थप सेवा बिलिङ दर्ता
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
          {/* ══ सेवाग्राहीको विवरण ══ */}
          <div style={S.section}>
            <div style={S.sectionTitle}>सेवाग्राहीको विवरण</div>
            <div style={S.sectionBody}>
              {/* Mul Darta */}
              <div style={S.labelRow}>
                <span style={S.label}>मूल दर्ता नम्बर :</span>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    maxWidth: "500px",
                    width: "100%",
                  }}
                >
                  <input
                    style={S.input}
                    value={patient.mulDarta}
                    onChange={setP("mulDarta")}
                    placeholder="दर्ता नम्बर"
                  />

                  <button
                    type="button"
                    onClick={handleSearchPatient}
                    style={{
                      background: "#0d9488",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      minWidth: "90px",
                    }}
                  >
                    {searching ? "..." : "Search"}
                  </button>
                </div>
              </div>

              {/* Naam + Thar */}
              <div style={S.grid2LabelRow}>
                <div style={S.labelRow}>
                  <span style={S.label}>नाम :</span>
                  <input
                    style={S.inputRO}
                    readOnly
                    value={patient.naam}
                    onChange={setP("naam")}
                  />
                </div>
                <div style={S.labelRow}>
                  <span style={S.label}>थर :</span>
                  <input
                    style={S.inputRO}
                    readOnly
                    value={patient.thar}
                    onChange={setP("thar")}
                  />
                </div>
              </div>

              {/* Jati + Linga */}
              <div style={S.grid2LabelRow}>
                <div style={S.labelRow}>
                  <span style={S.label}>जाती :</span>
                  <select
                    style={S.inputRO}
                    value={patient.jati}
                    onChange={setP("jati")}
                  >
                    <option value="">जाती छनोट गर्नहोस</option>
                    {JATI_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={S.labelRow}>
                  <span style={S.label}>लिङ्ग :</span>
                  <select
                    style={S.inputRO}
                    value={patient.linga}
                    onChange={setP("linga")}
                  >
                    <option value="">लिङ्ग छनोट गर्नहोस</option>
                    {LINGA_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Umer + Samparka */}
              <div style={S.grid2LabelRow}>
                <div style={S.labelRow}>
                  <span style={S.label}>उमेर :</span>
                  <input
                    style={S.inputRO}
                    readOnly
                    value={patient.umer}
                    onChange={setP("umer")}
                  />
                </div>
                <div style={S.labelRow}>
                  <span style={S.label}>सम्पर्क नं. :</span>
                  <input
                    style={S.inputRO}
                    readOnly
                    value={patient.samparka}
                    onChange={setP("samparka")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ══ सेवाको प्रकार ══ */}
          <div style={S.section}>
            <div style={S.sectionTitle}>सेवाको प्रकार</div>
            <div style={S.sectionBody}>
              {/* Table */}
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, width: "56px" }}>क्र.सं.</th>
                    <th style={S.th}>सेवाको प्रकार</th>
                    <th style={S.th}>सेवा</th>
                    <th style={{ ...S.th, width: "160px" }}>शुल्क रू.</th>
                    <th style={{ ...S.th, width: "72px" }}>थप</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={S.tdCenter}>{idx + 1}</td>
                      <td style={S.td}>
                        <select
                          style={S.select}
                          value={row.sewaPrakar}
                          onChange={(e) =>
                            updateRow(row.id, "sewaPrakar", e.target.value)
                          }
                        >
                          <option value="">सेवाको प्रकार छनोट गर्नहोस</option>
                          {PRAKAR_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={S.td}>
                        <select
                          style={S.select}
                          value={row.sewa}
                          onChange={(e) =>
                            updateRow(row.id, "sewa", e.target.value)
                          }
                        >
                          <option value="">सेवा छनोट गर्नहोस</option>
                          {(SEWA_BY_PRAKAR[row.sewaPrakar] || []).map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={S.td}>
                        <input
                          style={S.input}
                          value={row.shulk}
                          onChange={(e) =>
                            updateRow(row.id, "shulk", e.target.value)
                          }
                          placeholder="0"
                        />
                      </td>
                      <td style={S.tdCenter}>
                        <button
                          type="button"
                          onClick={addRow}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#0d9488",
                            fontSize: "18px",
                            fontWeight: "700",
                            cursor: "pointer",
                            padding: "0 3px",
                          }}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            fontSize: "16px",
                            cursor: "pointer",
                            padding: "0 3px",
                          }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Chhat row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 160px 1fr 160px 1fr",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <select
                  style={S.select}
                  value={billing.chhatKoPrakar}
                  onChange={setB("chhatKoPrakar")}
                >
                  <option value="">छटको प्रकार छनोट गर्नहोस</option>
                  {CHHAT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span style={S.label}>छुट (%) :</span>
                <input
                  style={S.input}
                  value={billing.chhatPct}
                  onChange={handleChhatPct}
                  placeholder="0"
                />
                <span style={S.label}>छुट (रू.) :</span>
                <input
                  style={S.input}
                  value={billing.chhatRu}
                  onChange={setB("chhatRu")}
                  placeholder="0"
                />
              </div>

              {/* Praapti Madhyam row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 220px 160px 1fr",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={S.label}>प्राप्तीको माध्यम :</span>
                <select
                  style={S.select}
                  value={billing.praaptiMadhyam}
                  onChange={setB("praaptiMadhyam")}
                >
                  {PRAAPTI_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span style={S.label}>चेक वा अन्य नं. :</span>
                <input
                  style={S.input}
                  value={billing.chekNumber}
                  onChange={setB("chekNumber")}
                />
              </div>

              {/* Kul Shulk */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ ...S.label, fontSize: "14px" }}>
                  कुल शुल्क रू. :
                </span>
                <input
                  style={{ ...S.inputRO, width: "160px", fontWeight: "600" }}
                  value={total.toFixed(0)}
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
