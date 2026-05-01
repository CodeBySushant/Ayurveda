import { useState } from "react";
import axios from "axios";

// ── Inline styles — no Tailwind dependency ────────────────────────────────────

const S = {
  page: {
    padding: "24px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px 28px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "2px",
  },
  breadcrumb: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  link: { color: "#0d9488", cursor: "pointer" },

  // Search bar
  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 2fr 40px",
    gap: "10px",
    marginBottom: "16px",
    alignItems: "center",
  },
  searchBtn: {
    backgroundColor: "#0d9488",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    height: "36px",
    width: "40px",
    cursor: "pointer",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // inputs / selects
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
  textarea: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    padding: "7px 11px",
    fontSize: "13px",
    color: "#111827",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
    minHeight: "82px",
  },

  // layout
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "5px",
  },
  field: { marginBottom: "0" },
  divider: { borderTop: "1px solid #e5e7eb", margin: "18px 0" },
  twoColMain: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  col: { display: "flex", flexDirection: "column", gap: "16px" },

  // checkboxes
  cbRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "6px",
  },
  cbLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "13px",
    color: "#374151",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  cb: {
    accentColor: "#0d9488",
    width: "13px",
    height: "13px",
    cursor: "pointer",
  },
  sep: { color: "#9ca3af", fontSize: "13px" },

  kisimGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 18px",
    marginTop: "4px",
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

// ── Static data ───────────────────────────────────────────────────────────────

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

const PRADESH_OPTIONS = [
  { value: "1", label: "कोशी प्रदेश" },
  { value: "2", label: "मधेश प्रदेश" },
  { value: "3", label: "बागमती प्रदेश" },
  { value: "4", label: "गण्डकी प्रदेश" },
  { value: "5", label: "लुम्बिनी प्रदेश" },
  { value: "6", label: "कर्णाली प्रदेश" },
  { value: "7", label: "सुदूरपश्चिम प्रदेश" },
];

const KISIM_OPTIONS = [
  { value: "samanya", label: "सामान्य उपचार सेवा" },
  { value: "panchakarma_purva", label: "पञ्चकर्म (पूर्वकर्म / उपकर्म) सेवा" },
  { value: "panchakarma_pradhan", label: "पञ्चकर्म (प्रधानकर्म) सेवा" },
  { value: "ksharsutra", label: "क्षारसूत्र सेवा" },
  { value: "upcharatmak", label: "उपचारात्मक योग सेवा" },
  { value: "jestha", label: "जेष्ठ नागरिक सेवा" },
  { value: "stanpayi", label: "स्तनपायी आमा तथा शिशु सेवा" },
  { value: "anya", label: "अन्य सेवा" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function MasterRegisterCreate() {
  const [search, setSearch] = useState({
    searchMul: "",
    searchPura: "",
    searchSamparka: "",
  });
  const [form, setForm] = useState({
    visitType: "",
    mulDartaNumber: "",
    sewagraheeName: "",
    sewagraheeThar: "",
    kisim: [],
    jati: "",
    linga: "",
    shulkRu: "10",
    nisShulk: false,
    sahuliyat: false,
    umer: "",
    samparkNumber: "",
    prepsonSanstha: "",
    pradesh: "",
    kaifiyat: "",
    wadaNumber: "",
    tol: "",
    janmaMiti: "",
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toLocaleDateString("en-GB");
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const tog = (f) => () => setForm((p) => ({ ...p, [f]: !p[f] }));
  const togKisim = (v) =>
    setForm((p) => ({
      ...p,
      kisim: p.kisim.includes(v)
        ? p.kisim.filter((k) => k !== v)
        : [...p.kisim, v],
    }));

  const setSearchField = (field) => (e) =>
    setSearch((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  const validateForm = () => {
    const newErrors = {};
    if (!form.mulDartaNumber.trim())
      newErrors.mulDartaNumber = "मूल दर्ता नम्बर आवश्यक छ";
    if (!form.visitType) newErrors.visitType = "छनोट गर्नुहोस्";
    if (!form.sewagraheeName.trim()) newErrors.sewagraheeName = "नाम आवश्यक छ";
    if (!form.sewagraheeThar.trim()) newErrors.sewagraheeThar = "थर आवश्यक छ";
    if (!form.jati) newErrors.jati = "जाती आवश्यक छ";
    if (!form.linga) newErrors.linga = "लिङ्ग आवश्यक छ";
    if (!form.umer.trim()) newErrors.umer = "उमेर आवश्यक छ";
    if (!form.samparkNumber.trim())
      newErrors.samparkNumber = "सम्पर्क नम्बर आवश्यक छ";
    if (!form.pradesh) newErrors.pradesh = "प्रदेश आवश्यक छ";
    if (!form.wadaNumber.trim()) newErrors.wadaNumber = "वडा नम्बर आवश्यक छ";
    if (!form.tol.trim()) newErrors.tol = "टोल आवश्यक छ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        masterNumber: form.mulDartaNumber,
        entryDate: new Date().toISOString().split("T")[0],

        visitType: form.visitType,

        firstName: form.sewagraheeName,
        lastName: form.sewagraheeThar,

        serviceTypes: form.kisim,

        feeAmount: Number(form.shulkRu),
        isFree: form.nisShulk,
        hasConcession: form.sahuliyat,

        referralInstitution: form.prepsonSanstha,
        remarks: form.kaifiyat,

        caste: form.jati,
        gender: form.linga,
        age: Number(form.umer),
        contactNumber: form.samparkNumber,

        province: form.pradesh,
        wardNumber: form.wadaNumber,
        locality: form.tol,

        birthDate: form.janmaMiti || null,

        createdBy: 1,
      };

      const res = await axios.post(
        "http://localhost:5000/api/common/master-register",
        payload,
      );

      alert("डेटा सफलतापूर्वक सेभ भयो!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("डेटा सेभ गर्न मिलेन!");
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Header */}
        <div style={S.pageTitle}>मूल दर्ता</div>
        <div style={S.breadcrumb}>
          <span style={S.link}>गृहपृष्ठ</span>
          {" / "}मूल दर्ता दर्ता
        </div>

        <form onSubmit={handleSubmit}>
          {/* Search row */}
          <div style={S.searchRow}>
            <input
              style={S.input}
              placeholder="मूल दर्ता नम्बर"
              value={search.searchMul}
              onChange={setSearchField("searchMul")}
            />

            <input
              style={S.input}
              placeholder="पुरा नाम"
              value={search.searchPura}
              onChange={setSearchField("searchPura")}
            />
            <input
              style={S.input}
              placeholder="सम्पर्क नम्बर"
              value={search.searchSamparka}
              onChange={setSearchField("searchSamparka")}
            />
            <button type="button" style={S.searchBtn}>
              🔍
            </button>
          </div>

          {/* Miti */}
          <div style={{ marginBottom: "16px" }}>
            <span style={S.label}>मिति :</span>
            <input
              style={{ ...S.inputRO, width: "160px" }}
              value={today}
              readOnly
            />
          </div>

          <div style={S.divider} />

          {/* Main 2-col body */}
          <div style={S.twoColMain}>
            {/* ── LEFT ── */}
            <div style={S.col}>
              {/* Mul Darta + checkboxes */}
              <div>
                <div style={S.cbRow}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    मूल दर्ता नम्बर /
                  </span>

                  <label style={S.cbLabel}>
                    <input
                      type="radio"
                      name="visitType"
                      style={S.cb}
                      checked={form.visitType === "first"}
                      onChange={() =>
                        setForm((p) => ({ ...p, visitType: "first" }))
                      }
                    />
                    पहिलो पटक
                  </label>

                  <span style={S.sep}>/</span>

                  <label style={S.cbLabel}>
                    <input
                      type="radio"
                      name="visitType"
                      style={S.cb}
                      checked={form.visitType === "repeat"}
                      onChange={() =>
                        setForm((p) => ({ ...p, visitType: "repeat" }))
                      }
                    />
                    पुनरावृत्त
                  </label>
                </div>

                {errors.visitType && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.visitType}
                  </div>
                )}
                <input
                  style={{
                    ...S.input,
                    borderColor: errors.mulDartaNumber ? "#dc2626" : "#d1d5db",
                  }}
                  placeholder="मूल दर्ता नम्बर *"
                  value={form.mulDartaNumber}
                  onChange={set("mulDartaNumber")}
                />

                {errors.mulDartaNumber && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.mulDartaNumber}
                  </div>
                )}
              </div>

              {/* Kisim */}
              <div>
                <span style={S.label}>किसिम</span>
                <div style={S.kisimGrid}>
                  {KISIM_OPTIONS.map((opt) => (
                    <label key={opt.value} style={S.cbLabel}>
                      <input
                        type="checkbox"
                        style={S.cb}
                        checked={form.kisim.includes(opt.value)}
                        onChange={() => togKisim(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Shulk */}
              <div>
                <div style={S.cbRow}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    शुल्क रू. /
                  </span>
                  <label style={S.cbLabel}>
                    <input
                      type="checkbox"
                      style={S.cb}
                      checked={form.nisShulk}
                      onChange={() =>
                        setForm((p) => ({
                          ...p,
                          nisShulk: !p.nisShulk,
                          shulkRu: p.nisShulk ? "10" : "0",
                        }))
                      }
                    />
                    नि:शुल्क
                  </label>
                  <span style={S.sep}>/</span>
                  <label style={S.cbLabel}>
                    <input
                      type="checkbox"
                      style={S.cb}
                      checked={form.sahuliyat}
                      onChange={tog("sahuliyat")}
                    />
                    सहुलियत प्राप्त भएको
                  </label>
                </div>
                <input
                  style={{
                    ...S.input,
                    backgroundColor: form.nisShulk ? "#f3f4f6" : "#fff",
                  }}
                  value={form.shulkRu}
                  onChange={set("shulkRu")}
                  disabled={form.nisShulk}
                />
              </div>

              {/* Prepson Sanstha */}
              <div>
                <label style={S.label}>प्रेषण भई आएको संस्थाको नाम</label>
                <input
                  style={S.input}
                  placeholder="प्रेषण भई आएको संस्थाको नाम"
                  value={form.prepsonSanstha}
                  onChange={set("prepsonSanstha")}
                />
              </div>

              {/* Kaifiyat */}
              <div>
                <label style={S.label}>कैफियत</label>
                <textarea
                  style={S.textarea}
                  placeholder="कैफियत"
                  value={form.kaifiyat}
                  onChange={set("kaifiyat")}
                />
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={S.col}>
              {/* Sewagrahi */}
              <div>
                <label style={S.label}>सेवाग्राहीको पुरा नाम</label>
                <div style={S.twoCol}>
                  <div>
                    <input
                      style={{
                        ...S.input,
                        borderColor: errors.sewagraheeName
                          ? "#dc2626"
                          : "#d1d5db",
                      }}
                      placeholder="नाम *"
                      value={form.sewagraheeName}
                      onChange={set("sewagraheeName")}
                    />
                    {errors.sewagraheeName && (
                      <div
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.sewagraheeName}
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      style={{
                        ...S.input,
                        borderColor: errors.sewagraheeThar
                          ? "#dc2626"
                          : "#d1d5db",
                      }}
                      placeholder="थर *"
                      value={form.sewagraheeThar}
                      onChange={set("sewagraheeThar")}
                    />
                    {errors.sewagraheeThar && (
                      <div
                        style={{
                          color: "#dc2626",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.sewagraheeThar}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Jati */}
              <div>
                <label style={S.label}>जाती</label>
                <select
                  style={{
                    ...S.select,
                    borderColor: errors.jati ? "#dc2626" : "#d1d5db",
                  }}
                  value={form.jati}
                  onChange={set("jati")}
                >
                  <option value="">जाती छनोट गर्नुहोस् *</option>
                  {JATI_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.jati && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.jati}
                  </div>
                )}
              </div>

              {/* Linga */}
              <div>
                <label style={S.label}>लिङ्ग</label>
                <select
                  style={{
                    ...S.select,
                    borderColor: errors.linga ? "#dc2626" : "#d1d5db",
                  }}
                  value={form.linga}
                  onChange={set("linga")}
                >
                  <option value="">लिङ्ग छनोट गर्नुहोस् *</option>
                  {LINGA_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.linga && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.linga}
                  </div>
                )}
              </div>

              {/* Umer + Samparka */}
              <div style={S.twoCol}>
                <div>
                  <label style={S.label}>उमेर</label>
                  <input
                    style={{
                      ...S.input,
                      borderColor: errors.umer ? "#dc2626" : "#d1d5db",
                    }}
                    placeholder="उमेर *"
                    value={form.umer}
                    onChange={set("umer")}
                  />
                  {errors.umer && (
                    <div
                      style={{
                        color: "#dc2626",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.umer}
                    </div>
                  )}
                </div>
                <div>
                  <label style={S.label}>सम्पर्क नम्बर</label>
                  <input
                    style={{
                      ...S.input,
                      borderColor: errors.samparkNumber ? "#dc2626" : "#d1d5db",
                    }}
                    placeholder="सम्पर्क नम्बर *"
                    value={form.samparkNumber}
                    onChange={set("samparkNumber")}
                  />
                  {errors.samparkNumber && (
                    <div
                      style={{
                        color: "#dc2626",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.samparkNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Pradesh */}
              <div>
                <label style={S.label}>प्रदेश</label>
                <select
                  style={{
                    ...S.select,
                    borderColor: errors.pradesh ? "#dc2626" : "#d1d5db",
                  }}
                  value={form.pradesh}
                  onChange={set("pradesh")}
                >
                  <option value="">प्रदेश छनोट गर्नुहोस् *</option>
                  {PRADESH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.pradesh && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.pradesh}
                  </div>
                )}
              </div>

              {/* Wada + Tol */}
              <div style={S.twoCol}>
                <div>
                  <label style={S.label}>वडा नम्बर</label>
                  <input
                    style={{
                      ...S.input,
                      borderColor: errors.wadaNumber ? "#dc2626" : "#d1d5db",
                    }}
                    placeholder="वडा नम्बर *"
                    value={form.wadaNumber}
                    onChange={set("wadaNumber")}
                  />
                  {errors.wadaNumber && (
                    <div
                      style={{
                        color: "#dc2626",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.wadaNumber}
                    </div>
                  )}
                </div>
                <div>
                  <label style={S.label}>टोल</label>
                  <input
                    style={{
                      ...S.input,
                      borderColor: errors.tol ? "#dc2626" : "#d1d5db",
                    }}
                    placeholder="टोल *"
                    value={form.tol}
                    onChange={set("tol")}
                  />
                  {errors.tol && (
                    <div
                      style={{
                        color: "#dc2626",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.tol}
                    </div>
                  )}
                </div>
              </div>

              {/* Janma Miti */}
              <div>
                <label style={S.label}>जन्म मिति</label>
                <input
                  type="date"
                  style={{ ...S.input, width: "100%" }}
                  value={form.janmaMiti}
                  onChange={set("janmaMiti")}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={S.submitWrap}>
            <button
              type="submit"
              style={S.submitBtn}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#15803d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#16a34a")
              }
            >
              बुझाउनुहोस्
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
