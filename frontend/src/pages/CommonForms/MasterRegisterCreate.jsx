import { useState } from "react";

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
  cb: { accentColor: "#0d9488", width: "13px", height: "13px", cursor: "pointer" },
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
  { value: "samanya",           label: "सामान्य उपचार सेवा" },
  { value: "panchakarma_purva", label: "पञ्चकर्म (पूर्वकर्म / उपकर्म) सेवा" },
  { value: "panchakarma_pradhan", label: "पञ्चकर्म (प्रधानकर्म) सेवा" },
  { value: "ksharsutra",        label: "क्षारसूत्र सेवा" },
  { value: "upcharatmak",       label: "उपचारात्मक योग सेवा" },
  { value: "jestha",            label: "जेष्ठ नागरिक सेवा" },
  { value: "stanpayi",          label: "स्तनपायी आमा तथा शिशु सेवा" },
  { value: "anya",              label: "अन्य सेवा" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function MasterRegisterCreate() {
  const [form, setForm] = useState({
    searchMul: "", searchPura: "", searchSamparka: "",
    isPahiloPatak: false, isPunarabrutt: false,
    mulDartaNumber: "",
    sewagraheeName: "", sewagraheeThar: "",
    kisim: [],
    jati: "", linga: "",
    shulkRu: "10", nisShulk: false, sahuliyat: false,
    umer: "", samparkNumber: "",
    prepsonSanstha: "", pradesh: "",
    kaifiyat: "", wadaNumber: "", tol: "", janmaMiti: "",
  });

  const today = "18/01/2083";
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const tog = (f) => () => setForm((p) => ({ ...p, [f]: !p[f] }));
  const togKisim = (v) =>
    setForm((p) => ({
      ...p,
      kisim: p.kisim.includes(v) ? p.kisim.filter((k) => k !== v) : [...p.kisim, v],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("फारम सफलतापूर्वक बुझाइयो!");
  };

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.pageTitle}>मूल दर्ता</div>
        <div style={S.breadcrumb}>
          <span style={S.link}>गृहपृष्ठ</span>{" / "}मूल दर्ता दर्ता
        </div>

        <form onSubmit={handleSubmit}>

          {/* Search row */}
          <div style={S.searchRow}>
            <input style={S.input} placeholder="मूल दर्ता नम्बर *" value={form.searchMul} onChange={set("searchMul")} />
            <input style={S.input} placeholder="पुरा नाम" value={form.searchPura} onChange={set("searchPura")} />
            <input style={S.input} placeholder="सम्पर्क नम्बर" value={form.searchSamparka} onChange={set("searchSamparka")} />
            <button type="button" style={S.searchBtn}>🔍</button>
          </div>

          {/* Miti */}
          <div style={{ marginBottom: "16px" }}>
            <span style={S.label}>मिति :</span>
            <input style={{ ...S.inputRO, width: "160px" }} value={today} readOnly />
          </div>

          <div style={S.divider} />

          {/* Main 2-col body */}
          <div style={S.twoColMain}>

            {/* ── LEFT ── */}
            <div style={S.col}>

              {/* Mul Darta + checkboxes */}
              <div>
                <div style={S.cbRow}>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>मूल दर्ता नम्बर /</span>
                  <label style={S.cbLabel}>
                    <input type="checkbox" style={S.cb} checked={form.isPahiloPatak} onChange={tog("isPahiloPatak")} />
                    पहिलो पटक
                  </label>
                  <span style={S.sep}>/</span>
                  <label style={S.cbLabel}>
                    <input type="checkbox" style={S.cb} checked={form.isPunarabrutt} onChange={tog("isPunarabrutt")} />
                    पुनरावृत्त
                  </label>
                </div>
                <input style={S.input} placeholder="मूल दर्ता नम्बर *" value={form.mulDartaNumber} onChange={set("mulDartaNumber")} />
              </div>

              {/* Kisim */}
              <div>
                <span style={S.label}>किसिम</span>
                <div style={S.kisimGrid}>
                  {KISIM_OPTIONS.map((opt) => (
                    <label key={opt.value} style={S.cbLabel}>
                      <input type="checkbox" style={S.cb} checked={form.kisim.includes(opt.value)} onChange={() => togKisim(opt.value)} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Shulk */}
              <div>
                <div style={S.cbRow}>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>शुल्क रू. /</span>
                  <label style={S.cbLabel}>
                    <input type="checkbox" style={S.cb} checked={form.nisShulk} onChange={tog("nisShulk")} />
                    नि:शुल्क
                  </label>
                  <span style={S.sep}>/</span>
                  <label style={S.cbLabel}>
                    <input type="checkbox" style={S.cb} checked={form.sahuliyat} onChange={tog("sahuliyat")} />
                    सहुलियत प्राप्त भएको
                  </label>
                </div>
                <input style={S.input} value={form.shulkRu} onChange={set("shulkRu")} />
              </div>

              {/* Prepson Sanstha */}
              <div>
                <label style={S.label}>प्रेषण भई आएको संस्थाको नाम</label>
                <input style={S.input} placeholder="प्रेषण भई आएको संस्थाको नाम" value={form.prepsonSanstha} onChange={set("prepsonSanstha")} />
              </div>

              {/* Kaifiyat */}
              <div>
                <label style={S.label}>कैफियत</label>
                <textarea style={S.textarea} placeholder="कैफियत" value={form.kaifiyat} onChange={set("kaifiyat")} />
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={S.col}>

              {/* Sewagrahi */}
              <div>
                <label style={S.label}>सेवाग्राहीको पुरा नाम</label>
                <div style={S.twoCol}>
                  <input style={S.input} placeholder="नाम *" value={form.sewagraheeName} onChange={set("sewagraheeName")} />
                  <input style={S.input} placeholder="थर *" value={form.sewagraheeThar} onChange={set("sewagraheeThar")} />
                </div>
              </div>

              {/* Jati */}
              <div>
                <label style={S.label}>जाती</label>
                <select style={S.select} value={form.jati} onChange={set("jati")}>
                  <option value="">जाती छनोट गर्नुहोस् *</option>
                  {JATI_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Linga */}
              <div>
                <label style={S.label}>लिङ्ग</label>
                <select style={S.select} value={form.linga} onChange={set("linga")}>
                  <option value="">लिङ्ग छनोट गर्नुहोस् *</option>
                  {LINGA_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Umer + Samparka */}
              <div style={S.twoCol}>
                <div>
                  <label style={S.label}>उमेर</label>
                  <input style={S.input} placeholder="उमेर *" value={form.umer} onChange={set("umer")} />
                </div>
                <div>
                  <label style={S.label}>सम्पर्क नम्बर</label>
                  <input style={S.input} placeholder="सम्पर्क नम्बर *" value={form.samparkNumber} onChange={set("samparkNumber")} />
                </div>
              </div>

              {/* Pradesh */}
              <div>
                <label style={S.label}>प्रदेश</label>
                <select style={S.select} value={form.pradesh} onChange={set("pradesh")}>
                  <option value="">प्रदेश छनोट गर्नुहोस् *</option>
                  {PRADESH_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Wada + Tol */}
              <div style={S.twoCol}>
                <div>
                  <label style={S.label}>वडा नम्बर</label>
                  <input style={S.input} placeholder="वडा नम्बर *" value={form.wadaNumber} onChange={set("wadaNumber")} />
                </div>
                <div>
                  <label style={S.label}>टोल</label>
                  <input style={S.input} placeholder="टोल *" value={form.tol} onChange={set("tol")} />
                </div>
              </div>

              {/* Janma Miti */}
              <div>
                <label style={S.label}>जन्म मिति</label>
                <input style={{ ...S.inputRO, width: "100%" }} placeholder="मिति *" value={form.janmaMiti} readOnly />
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