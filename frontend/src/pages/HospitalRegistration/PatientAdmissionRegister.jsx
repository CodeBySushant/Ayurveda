import { useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app-root {
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    background: #f0f2f5;
    min-height: 100vh;
    font-size: 13px;
    color: #374151;
  }

  .page-header {
    background: #1e3a5f;
    color: white;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .page-header h1 { font-size: 15px; font-weight: 600; }
  .breadcrumb { font-size: 12px; color: #93c5fd; }
  .breadcrumb span { color: #bfdbfe; }

  .form-container {
    max-width: 1120px;
    margin: 20px auto;
    padding: 0 16px 48px;
  }

  /* Date */
  .date-section { margin-bottom: 18px; }
  .date-label { font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px; display: block; }

  /* Two column layout */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }

  .card {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    padding: 20px;
    margin-bottom: 16px;
  }

  .section-label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 10px;
    display: block;
  }

  .field { display: flex; flex-direction: column; gap: 3px; margin-bottom: 12px; }
  .field:last-child { margin-bottom: 0; }
  .field label { font-size: 11.5px; color: #6b7280; font-weight: 500; }

  .input, .select, .textarea {
    width: 100%;
    padding: 7px 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 12.5px;
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    background: #fff;
    color: #374151;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    appearance: none;
    -webkit-appearance: none;
  }
  .input:focus, .select:focus, .textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.12);
  }
  .input::placeholder, .textarea::placeholder { color: #9ca3af; }
  .select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 28px;
    cursor: pointer;
  }
  .textarea { resize: vertical; min-height: 72px; line-height: 1.5; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .two-col .field { margin-bottom: 0; }

  /* Checkbox row */
  .checkbox-row {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: #374151;
    cursor: pointer;
    user-select: none;
  }
  .checkbox-item input[type="checkbox"] {
    width: 14px;
    height: 14px;
    accent-color: #2563eb;
    cursor: pointer;
    margin: 0;
  }

  /* Medicine table */
  .medicine-section { margin-top: 16px; }
  .medicine-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; display: block; }
  .medicine-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .medicine-table thead th {
    background: #f8fafc;
    color: #4b5563;
    font-weight: 600;
    padding: 7px 10px;
    text-align: center;
    border: 1px solid #d1d5db;
    font-size: 12px;
  }
  .medicine-table tbody td {
    padding: 5px 7px;
    border: 1px solid #d1d5db;
    vertical-align: middle;
  }
  .medicine-table tbody td.action-cell {
    text-align: center;
    width: 64px;
    white-space: nowrap;
  }

  /* Ayurvedic therapy checkboxes */
  .therapy-section { margin-top: 16px; }
  .therapy-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; display: block; }
  .therapy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 24px;
    margin-bottom: 10px;
  }
  .other-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }
  .other-row label { font-size: 12.5px; color: #374151; white-space: nowrap; }
  .other-row .input { max-width: 200px; }

  /* Investigation table */
  .inv-table-wrap { overflow-x: auto; margin-top: 16px; }
  .inv-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .inv-table thead th {
    background: #f8fafc;
    color: #4b5563;
    font-weight: 600;
    padding: 7px 10px;
    text-align: center;
    border: 1px solid #d1d5db;
    font-size: 12px;
  }
  .inv-table tbody td {
    padding: 5px 7px;
    border: 1px solid #d1d5db;
    vertical-align: middle;
  }
  .inv-table tbody td.sn-cell { text-align: center; width: 48px; font-weight: 600; color: #6b7280; }
  .inv-table tbody td.action-cell { text-align: center; width: 64px; white-space: nowrap; }

  .btn-add, .btn-remove {
    border: none;
    cursor: pointer;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 16px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, transform 0.1s;
    line-height: 1;
  }
  .btn-add { background: #22c55e; color: white; margin-right: 4px; }
  .btn-add:hover { background: #16a34a; transform: scale(1.1); }
  .btn-remove { background: #ef4444; color: white; }
  .btn-remove:hover { background: #dc2626; transform: scale(1.1); }
  .btn-remove:disabled { background: #fca5a5; cursor: not-allowed; transform: none; }

  .submit-wrap { text-align: center; margin-top: 24px; }
  .btn-submit {
    background: #16a34a;
    color: white;
    border: none;
    padding: 10px 80px;
    font-size: 14px;
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-submit:hover { background: #15803d; transform: translateY(-1px); }
  .btn-submit:active { transform: translateY(0); }

  @media (max-width: 760px) {
    .main-grid { grid-template-columns: 1fr; }
    .two-col { grid-template-columns: 1fr; }
    .therapy-grid { grid-template-columns: 1fr; }
  }
`;

const JAATI_OPTIONS = [
  "ब्राह्मण/क्षेत्री",
  "जनजाति",
  "दलित",
  "मधेसी",
  "मुस्लिम",
  "अन्य",
];
const LINGA_OPTIONS = ["पुरुष", "महिला", "अन्य"];
const PRADESH_OPTIONS = [
  "कोशी प्रदेश",
  "मधेश प्रदेश",
  "बागमती प्रदेश",
  "गण्डकी प्रदेश",
  "लुम्बिनी प्रदेश",
  "कर्णाली प्रदेश",
  "सुदूरपश्चिम प्रदेश",
];
const SOURCE_OPTIONS = ["OPD", "Emergency", "Referral", "Self", "Other"];
const INPATIENT_OPTIONS = [
  "Ward A",
  "Ward B",
  "Ward C",
  "ICU",
  "Maternity",
  "Pediatric",
];

const emptyMedRow = () => ({
  id: Date.now() + Math.random(),
  aushadhi: "",
  matra: "",
});
const emptyInvRow = () => ({
  id: Date.now() + Math.random(),
  prakar: "",
  vivaran: "",
});

export default function PatientAdmissionRegister() {
  const [formData, setFormData] = useState({
    miti: new Date().toLocaleDateString("en-GB"),
    mulDarta: "",
    isFirstTime: false,
    policeCase: false,
    inpatientNo: "",
    guardianName: "",
    guardianContact: "",
    praveshKoSrot: "",
    wadaNumber: "",
    asthaayiNidaan: "",
    // Ayurvedic therapy
    purbaKarmaUpakarma: false,
    pradhanKarma: false,
    ksharsutra: false,
    therapeutic: false,
    therapyOther: "",
    remarks: "",
    // Recipient
    naam: "",
    thar: "",
    jaati: "",
    linga: "",
    umer: "",
    samparkNumber: "",
    pradesh: "",
    recipientWada: "",
    tol: "",
  });

  const [medRows, setMedRows] = useState([emptyMedRow()]);
  const [invRows, setInvRows] = useState([emptyInvRow()]);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Medicine rows
  const handleMedChange = (id, field) => (e) =>
    setMedRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: e.target.value } : r)),
    );
  const addMedRow = () => setMedRows((prev) => [...prev, emptyMedRow()]);
  const removeMedRow = (id) => {
    if (medRows.length === 1) return;
    setMedRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Investigation rows
  const handleInvChange = (id, field) => (e) =>
    setInvRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: e.target.value } : r)),
    );
  const addInvRow = () => setInvRows((prev) => [...prev, emptyInvRow()]);
  const removeInvRow = (id) => {
    if (invRows.length === 1) return;
    setInvRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        formDate: formData.miti,

        masterNumber: formData.mulDarta,
        isFirstTime: formData.isFirstTime,
        policeCase: formData.policeCase,

        inpatientNo: formData.inpatientNo,

        guardianName: formData.guardianName,
        guardianContact: formData.guardianContact,

        admissionSource: formData.praveshKoSrot,
        wardNumber: formData.wadaNumber,

        provisionalDiagnosis: formData.asthaayiNidaan,

        purbaKarma: formData.purbaKarmaUpakarma,
        pradhanKarma: formData.pradhanKarma,
        ksharsutra: formData.ksharsutra,
        therapeutic: formData.therapeutic,
        therapyOther: formData.therapyOther,

        remarks: formData.remarks,

        firstName: formData.naam,
        lastName: formData.thar,
        caste: formData.jaati,
        gender: formData.linga,
        age: formData.umer,
        contactNumber: formData.samparkNumber,
        province: formData.pradesh,
        patientWard: formData.recipientWada,
        locality: formData.tol,

        medicines: medRows
          .filter((x) => x.aushadhi.trim())
          .map((x) => ({
            medicineName: x.aushadhi,
            dosage: x.matra,
          })),

        investigations: invRows
          .filter((x) => x.prakar.trim())
          .map((x) => ({
            investigationType: x.prakar,
            details: x.vivaran,
          })),
      };

      const res = await axios.post(
        "http://localhost:5000/api/hospital/patient-admission",
        payload,
      );

      alert(`Saved Successfully\n${res.data.admissionNumber}`);
    } catch (error) {
      console.log(error);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">
        {/* Header */}
        <div className="page-header">
          <h1>रोगी प्रवेश दर्ता</h1>
          <div className="breadcrumb">
            गृहपृष्ठ / <span>रोगी प्रवेश दर्ता</span>
          </div>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          {/* Date */}
          <div className="date-section">
            <span className="date-label">मिति :</span>
            <input
              className="input"
              style={{ maxWidth: 160 }}
              value={formData.miti}
              onChange={handleChange("miti")}
            />
          </div>

          {/* Main Two-Column Grid */}
          <div className="main-grid">
            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Mul Darta */}
              <div className="card">
                <span className="section-label">मुल दर्ता नम्बर</span>
                <input
                  className="input"
                  placeholder="मुल दर्ता नम्बर *"
                  value={formData.mulDarta}
                  onChange={handleChange("mulDarta")}
                  style={{ marginBottom: 14 }}
                />

                {/* Checkboxes */}
                <div className="checkbox-row">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.isFirstTime}
                      onChange={handleChange("isFirstTime")}
                    />
                    IsFirstTime
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.policeCase}
                      onChange={handleChange("policeCase")}
                    />
                    Police Case
                  </label>
                </div>

                {/* InpatientNo */}
                <div className="field">
                  <label>InpatientNo</label>
                  <select
                    className="select"
                    value={formData.inpatientNo}
                    onChange={handleChange("inpatientNo")}
                  >
                    <option value="">Inpatient नम्बर छनोट गर्नुहोस् *</option>
                    {INPATIENT_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guardian */}
                <div className="two-col" style={{ marginTop: 12 }}>
                  <div className="field">
                    <label>अभिभावकको नाम</label>
                    <input
                      className="input"
                      placeholder="Guardian's Name"
                      value={formData.guardianName}
                      onChange={handleChange("guardianName")}
                    />
                  </div>
                  <div className="field">
                    <label>अभिभावकको सम्पर्क</label>
                    <input
                      className="input"
                      placeholder="Guardian's Contact #"
                      value={formData.guardianContact}
                      onChange={handleChange("guardianContact")}
                    />
                  </div>
                </div>

                {/* Pravesh Ko Srot + Wada */}
                <div className="two-col" style={{ marginTop: 12 }}>
                  <div className="field">
                    <label>प्रवेशको स्रोत</label>
                    <select
                      className="select"
                      value={formData.praveshKoSrot}
                      onChange={handleChange("praveshKoSrot")}
                    >
                      <option value="">Select Source</option>
                      {SOURCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>वडा नम्बर</label>
                    <input
                      className="input"
                      placeholder="Ward"
                      value={formData.wadaNumber}
                      onChange={handleChange("wadaNumber")}
                    />
                  </div>
                </div>

                {/* Provisional Diagnosis */}
                <div className="field" style={{ marginTop: 12 }}>
                  <label>अस्थायी निदान</label>
                  <textarea
                    className="textarea"
                    placeholder="Provisional Diagnosis"
                    rows={3}
                    value={formData.asthaayiNidaan}
                    onChange={handleChange("asthaayiNidaan")}
                  />
                </div>
              </div>

              {/* Medicine Table */}
              <div className="card">
                <span className="medicine-label">उपचार/औषधिहरू निर्धारित</span>
                <table className="medicine-table">
                  <thead>
                    <tr>
                      <th>औषधि</th>
                      <th>मात्रा</th>
                      <th style={{ width: 64 }}>कार्य</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            className="input"
                            value={row.aushadhi}
                            onChange={handleMedChange(row.id, "aushadhi")}
                          />
                        </td>
                        <td>
                          <input
                            className="input"
                            value={row.matra}
                            onChange={handleMedChange(row.id, "matra")}
                          />
                        </td>
                        <td className="action-cell">
                          <button
                            type="button"
                            className="btn-add"
                            onClick={addMedRow}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeMedRow(row.id)}
                            disabled={medRows.length === 1}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Ayurvedic Therapy */}
              <div className="card">
                <span className="therapy-label">आयुर्वेदिक थेरापी</span>
                <div className="therapy-grid">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.purbaKarmaUpakarma}
                      onChange={handleChange("purbaKarmaUpakarma")}
                    />
                    PurbaKarmaUpakarma
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.pradhanKarma}
                      onChange={handleChange("pradhanKarma")}
                    />
                    PradhanKarma
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.ksharsutra}
                      onChange={handleChange("ksharsutra")}
                    />
                    Ksharsutra
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.therapeutic}
                      onChange={handleChange("therapeutic")}
                    />
                    Therapeutic
                  </label>
                </div>
                <div className="other-row">
                  <label>Other</label>
                  <input
                    className="input"
                    value={formData.therapyOther}
                    onChange={handleChange("therapyOther")}
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="card">
                <span className="section-label">टिप्पणीहरू</span>
                <textarea
                  className="textarea"
                  placeholder="Remarks"
                  rows={3}
                  value={formData.remarks}
                  onChange={handleChange("remarks")}
                />
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div>
              <div className="card">
                <span className="section-label">सेवाग्राहीको पुरा नाम</span>

                {/* Name + Surname */}
                <div className="two-col" style={{ marginBottom: 12 }}>
                  <div className="field">
                    <input
                      className="input"
                      placeholder="नाम *"
                      value={formData.naam}
                      onChange={handleChange("naam")}
                    />
                  </div>
                  <div className="field">
                    <input
                      className="input"
                      placeholder="थर *"
                      value={formData.thar}
                      onChange={handleChange("thar")}
                    />
                  </div>
                </div>

                {/* Jaati + Linga */}
                <div className="two-col" style={{ marginBottom: 12 }}>
                  <div className="field">
                    <label>जाती</label>
                    <select
                      className="select"
                      value={formData.jaati}
                      onChange={handleChange("jaati")}
                    >
                      <option value="">जाती छनोट गर्नुहोस् *</option>
                      {JAATI_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>लिङ्ग</label>
                    <select
                      className="select"
                      value={formData.linga}
                      onChange={handleChange("linga")}
                    >
                      <option value="">लिङ्ग छनोट गर्नुहोस् *</option>
                      {LINGA_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Umer + Samparka */}
                <div className="two-col" style={{ marginBottom: 12 }}>
                  <div className="field">
                    <label>उमेर</label>
                    <input
                      className="input"
                      placeholder="उमेर *"
                      value={formData.umer}
                      onChange={handleChange("umer")}
                    />
                  </div>
                  <div className="field">
                    <label>सम्पर्क नम्बर</label>
                    <input
                      className="input"
                      placeholder="सम्पर्क नम्बर *"
                      value={formData.samparkNumber}
                      onChange={handleChange("samparkNumber")}
                    />
                  </div>
                </div>

                {/* Pradesh */}
                <div className="field" style={{ marginBottom: 12 }}>
                  <label>प्रदेश</label>
                  <select
                    className="select"
                    value={formData.pradesh}
                    onChange={handleChange("pradesh")}
                  >
                    <option value="">प्रदेश छनोट गर्नुहोस् *</option>
                    {PRADESH_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Wada + Tol */}
                <div className="two-col">
                  <div className="field">
                    <label>वडा नम्बर</label>
                    <input
                      className="input"
                      placeholder="वडा नम्बर *"
                      value={formData.recipientWada}
                      onChange={handleChange("recipientWada")}
                    />
                  </div>
                  <div className="field">
                    <label>टोल</label>
                    <input
                      className="input"
                      placeholder="टोल *"
                      value={formData.tol}
                      onChange={handleChange("tol")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Table - full width */}
          <div className="card">
            <div className="inv-table-wrap">
              <table className="inv-table">
                <thead>
                  <tr>
                    <th className="sn-cell">क्र.सं.</th>
                    <th style={{ width: "30%" }}>अन्वेषणको प्रकार</th>
                    <th>विवरण</th>
                    <th className="action-cell">थप</th>
                  </tr>
                </thead>
                <tbody>
                  {invRows.map((row, index) => (
                    <tr key={row.id}>
                      <td className="sn-cell">{index + 1}</td>
                      <td>
                        <input
                          className="input"
                          placeholder="अन्वेषणको प्रकार"
                          value={row.prakar}
                          onChange={handleInvChange(row.id, "prakar")}
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          placeholder="विवरण"
                          value={row.vivaran}
                          onChange={handleInvChange(row.id, "vivaran")}
                        />
                      </td>
                      <td className="action-cell">
                        <button
                          type="button"
                          className="btn-add"
                          onClick={addInvRow}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => removeInvRow(row.id)}
                          disabled={invRows.length === 1}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit */}
          <div className="submit-wrap">
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
