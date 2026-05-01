import { useState } from "react";

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
  .page-header h1 { font-size: 15px; font-weight: 600; letter-spacing: 0.3px; }
  .breadcrumb { font-size: 12px; color: #93c5fd; }
  .breadcrumb span { color: #bfdbfe; }

  .form-container {
    max-width: 1120px;
    margin: 20px auto;
    padding: 0 16px 48px;
  }

  .card {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    margin-bottom: 16px;
    overflow: hidden;
  }
  .card-body { padding: 20px 24px; }

  .section-title {
    background: #e8edf5;
    color: #1e3a5f;
    font-weight: 600;
    font-size: 13px;
    padding: 8px 16px;
    border-bottom: 1px solid #d1d5db;
    text-align: center;
  }

  .panel-title {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    text-align: center;
    margin-bottom: 14px;
    padding-bottom: 6px;
    border-bottom: 1px solid #d1d5db;
  }

  .field { display: flex; flex-direction: column; gap: 4px; }
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
  .textarea { resize: vertical; min-height: 56px; line-height: 1.4; }

  .date-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .date-label { font-size: 13px; font-weight: 600; white-space: nowrap; color: #374151; }
  .date-input { max-width: 160px; }

  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .mul-darta-label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    display: block;
    margin-bottom: 6px;
  }
  .mul-darta-wrap { margin-bottom: 18px; }

  .health-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 4px;
  }

  .recipient-grid { display: grid; gap: 12px; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* Table */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  thead th {
    background: #f8fafc;
    color: #4b5563;
    font-weight: 600;
    padding: 8px 10px;
    text-align: center;
    border: 1px solid #d1d5db;
    font-size: 12px;
    white-space: nowrap;
  }
  tbody td {
    padding: 6px 8px;
    border: 1px solid #d1d5db;
    vertical-align: middle;
    text-align: center;
  }
  .sn-cell { width: 40px; font-weight: 600; color: #6b7280; }
  .action-cell { width: 64px; white-space: nowrap; }

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

  .submit-wrap { text-align: center; margin-top: 20px; }
  .btn-submit {
    background: #16a34a;
    color: white;
    border: none;
    padding: 10px 48px;
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

  @media (max-width: 720px) {
    .main-grid { grid-template-columns: 1fr; }
    .health-grid { grid-template-columns: 1fr; }
    .two-col { grid-template-columns: 1fr; }
  }
`;

const PRAKRITI_OPTIONS = ["वात", "पित्त", "कफ", "वात-पित्त", "पित्त-कफ", "वात-कफ", "त्रिदोष"];
const ROG_OPTIONS = ["मधुमेह", "उच्च रक्तचाप", "गठिया", "पीठ दुखाई", "सिरदर्द", "अन्य"];
const LINGA_OPTIONS = ["पुरुष", "महिला", "अन्य"];
const JAATI_OPTIONS = ["ब्राह्मण/क्षेत्री", "जनजाति", "दलित", "मधेसी", "मुस्लिम", "अन्य"];
const JILLA_OPTIONS = ["काठमाडौं", "ललितपुर", "भक्तपुर", "पोखरा", "चितवन", "धनुषा", "मोरङ", "सुनसरी"];
const SEWA_OPTIONS = ["अकुपुञ्चर", "मर्दन", "पञ्चकर्म", "शिरोधारा", "नस्य", "बस्ती"];

const emptyServiceRow = () => ({
  id: Date.now() + Math.random(),
  miti: "",
  sewa: "",
  jatilata: "",
  parikshan: "",
  kaifiyat: "",
});

export default function AkupancharServiceRegister() {
  const [formData, setFormData] = useState({
    miti: "18/01/2083",
    mulDarta: "",
    raktachap: "",
    taul: "",
    fbs: "",
    prakriti: "",
    rog: "",
    parikshan: "",
    naam: "",
    thar: "",
    umer: "",
    linga: "",
    samparkNumber: "",
    jaati: "",
    wadaNumber: "",
    tol: "",
    jilla: "",
  });

  const [serviceRows, setServiceRows] = useState([emptyServiceRow()]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleServiceChange = (id, field) => (e) => {
    setServiceRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: e.target.value } : row))
    );
  };

  const addRow = () => setServiceRows((prev) => [...prev, emptyServiceRow()]);

  const removeRow = (id) => {
    if (serviceRows.length === 1) return;
    setServiceRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", { ...formData, serviceRows });
    alert("फारम सफलतापूर्वक बुझाइयो!");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">
        {/* Header */}
        <div className="page-header">
          <h1>अकुपुञ्चर सेवा सृजना</h1>
          <div className="breadcrumb">
            गृहपृष्ठ / <span>अकुपुञ्चर सेवा सृजना</span>
          </div>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          {/* Main Card */}
          <div className="card">
            <div className="card-body">
              {/* Date */}
              <div className="date-row">
                <span className="date-label">मिति :</span>
                <input
                  className="input date-input"
                  value={formData.miti}
                  onChange={handleChange("miti")}
                />
              </div>

              <div className="main-grid">
                {/* LEFT: Registration + Health */}
                <div>
                  {/* Mul Darta */}
                  <div className="mul-darta-wrap">
                    <span className="mul-darta-label">मुल दर्ता नम्बर</span>
                    <input
                      className="input"
                      placeholder="मूल दर्ता नम्बर *"
                      value={formData.mulDarta}
                      onChange={handleChange("mulDarta")}
                    />
                  </div>

                  {/* Health Status */}
                  <div className="panel-title">स्वास्थ्य अवस्था</div>
                  <div className="health-grid">
                    <div className="field">
                      <label>रक्तचाप</label>
                      <input
                        className="input"
                        placeholder="mm Hg"
                        value={formData.raktachap}
                        onChange={handleChange("raktachap")}
                      />
                    </div>
                    <div className="field">
                      <label>तौल</label>
                      <input
                        className="input"
                        placeholder="के.जी."
                        value={formData.taul}
                        onChange={handleChange("taul")}
                      />
                    </div>
                    <div className="field">
                      <label>FBS</label>
                      <input
                        className="input"
                        placeholder="mg / dL"
                        value={formData.fbs}
                        onChange={handleChange("fbs")}
                      />
                    </div>
                    <div className="field">
                      <label>प्रकृति</label>
                      <select
                        className="select"
                        value={formData.prakriti}
                        onChange={handleChange("prakriti")}
                      >
                        <option value="">प्रकृति छनोट गर्नहोस</option>
                        {PRAKRITI_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>रोग</label>
                      <select
                        className="select"
                        value={formData.rog}
                        onChange={handleChange("rog")}
                      >
                        <option value="">रोग छनोट गर्नहोस</option>
                        {ROG_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>परीक्षण</label>
                      <input
                        className="input"
                        value={formData.parikshan}
                        onChange={handleChange("parikshan")}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: Recipient Details */}
                <div>
                  <div className="panel-title">सेवाग्राहीको विवरण</div>
                  <div className="recipient-grid">
                    <div className="two-col">
                      <div className="field">
                        <label>नाम</label>
                        <input
                          className="input"
                          placeholder="नाम"
                          value={formData.naam}
                          onChange={handleChange("naam")}
                        />
                      </div>
                      <div className="field">
                        <label>थर</label>
                        <input
                          className="input"
                          placeholder="थर"
                          value={formData.thar}
                          onChange={handleChange("thar")}
                        />
                      </div>
                    </div>
                    <div className="two-col">
                      <div className="field">
                        <label>उमेर</label>
                        <input
                          className="input"
                          value={formData.umer}
                          onChange={handleChange("umer")}
                        />
                      </div>
                      <div className="field">
                        <label>लिङ्ग</label>
                        <select
                          className="select"
                          value={formData.linga}
                          onChange={handleChange("linga")}
                        >
                          <option value="">लिङ्ग छनोट गर्नहोस</option>
                          {LINGA_OPTIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="two-col">
                      <div className="field">
                        <label>सम्पर्क नम्बर</label>
                        <input
                          className="input"
                          value={formData.samparkNumber}
                          onChange={handleChange("samparkNumber")}
                        />
                      </div>
                      <div className="field">
                        <label>जाती</label>
                        <select
                          className="select"
                          value={formData.jaati}
                          onChange={handleChange("jaati")}
                        >
                          <option value="">जाती छनोट गर्नहोस</option>
                          {JAATI_OPTIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="two-col">
                      <div className="field">
                        <label>वडा नम्बर</label>
                        <input
                          className="input"
                          value={formData.wadaNumber}
                          onChange={handleChange("wadaNumber")}
                        />
                      </div>
                      <div className="field">
                        <label>टोल</label>
                        <input
                          className="input"
                          value={formData.tol}
                          onChange={handleChange("tol")}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label>जिल्ला</label>
                      <select
                        className="select"
                        value={formData.jilla}
                        onChange={handleChange("jilla")}
                      >
                        <option value="">जिल्ला छनोट गर्नहोस</option>
                        {JILLA_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Table */}
          <div className="card">
            <div className="section-title">सेवा विवरण</div>
            <div className="card-body">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>क्र.सं.</th>
                      <th>मिति</th>
                      <th>सेवा</th>
                      <th>जटिलता</th>
                      <th>परीक्षण / सल्लाह</th>
                      <th>कैफियत</th>
                      <th>थप</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceRows.map((row, index) => (
                      <tr key={row.id}>
                        <td className="sn-cell">{index + 1}</td>
                        <td>
                          <input
                            className="input"
                            value={row.miti}
                            onChange={handleServiceChange(row.id, "miti")}
                          />
                        </td>
                        <td>
                          <select
                            className="select"
                            value={row.sewa}
                            onChange={handleServiceChange(row.id, "sewa")}
                          >
                            <option value="">सेवा छनोट गर्नहोस</option>
                            {SEWA_OPTIONS.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <textarea
                            className="textarea"
                            rows={2}
                            value={row.jatilata}
                            onChange={handleServiceChange(row.id, "jatilata")}
                          />
                        </td>
                        <td>
                          <textarea
                            className="textarea"
                            rows={2}
                            value={row.parikshan}
                            onChange={handleServiceChange(row.id, "parikshan")}
                          />
                        </td>
                        <td>
                          <textarea
                            className="textarea"
                            rows={2}
                            value={row.kaifiyat}
                            onChange={handleServiceChange(row.id, "kaifiyat")}
                          />
                        </td>
                        <td className="action-cell">
                          <button
                            type="button"
                            className="btn-add"
                            onClick={addRow}
                            title="थप्नुहोस्"
                          >+</button>
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeRow(row.id)}
                            title="हटाउनुहोस्"
                            disabled={serviceRows.length === 1}
                          >×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="submit-wrap">
            <button type="submit" className="btn-submit">
              बुझाउनुहोस्
            </button>
          </div>
        </form>
      </div>
    </>
  );
}