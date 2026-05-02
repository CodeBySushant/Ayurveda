import { useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .root {
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

  .fc { max-width: 1120px; margin: 20px auto; padding: 0 16px 48px; }

  /* date row at top */
  .top-date { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .top-date span { font-size: 13px; font-weight: 500; }

  /* two-panel layout */
  .two-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }

  .panel {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    padding: 18px 20px;
  }
  .panel-title {
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: #1e3a5f;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
  }

  .full-card {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    padding: 18px 20px;
    margin-bottom: 16px;
  }

  /* fields */
  .field { display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 11.5px; color: #6b7280; font-weight: 500; }

  .inp, .sel, .ta {
    width: 100%;
    padding: 6px 9px;
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
  .inp:focus, .sel:focus, .ta:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.12);
  }
  .inp::placeholder, .ta::placeholder { color: #9ca3af; }
  .sel {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    padding-right: 26px;
    cursor: pointer;
  }
  .ta { resize: vertical; min-height: 60px; line-height: 1.4; }

  /* grid helpers */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .mb10 { margin-bottom: 10px; }
  .mb12 { margin-bottom: 12px; }
  .mb14 { margin-bottom: 14px; }

  /* checkbox */
  .cb-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 10px; }
  .cb-item { display: flex; align-items: center; gap: 5px; font-size: 12.5px; cursor: pointer; user-select: none; }
  .cb-item input[type="checkbox"] { width: 13px; height: 13px; accent-color: #2563eb; cursor: pointer; margin: 0; }

  /* sub-table (lakshan, complaint, etc.) */
  .sub-label { font-size: 12.5px; font-weight: 600; color: #374151; margin-bottom: 6px; display: block; margin-top: 14px; }
  .sub-label:first-child { margin-top: 0; }

  .stbl { width: 100%; border-collapse: collapse; font-size: 12px; }
  .stbl thead th {
    background: #f8fafc;
    color: #4b5563;
    font-weight: 600;
    padding: 6px 8px;
    border: 1px solid #d1d5db;
    text-align: center;
    font-size: 11.5px;
  }
  .stbl tbody td {
    padding: 4px 6px;
    border: 1px solid #d1d5db;
    vertical-align: middle;
  }
  .stbl td.sn { text-align: center; width: 36px; font-weight: 600; color: #6b7280; font-size: 12px; }
  .stbl td.act { text-align: center; width: 54px; white-space: nowrap; }

  .btn-a, .btn-r {
    border: none; cursor: pointer; border-radius: 50%;
    width: 20px; height: 20px; font-size: 15px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; line-height: 1;
  }
  .btn-a { background: #22c55e; color: white; margin-right: 3px; }
  .btn-a:hover { background: #16a34a; transform: scale(1.1); }
  .btn-r { background: #ef4444; color: white; }
  .btn-r:hover { background: #dc2626; transform: scale(1.1); }
  .btn-r:disabled { background: #fca5a5; cursor: not-allowed; transform: none; }

  /* discharge section */
  .dis-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; align-items: end; }
  .dis-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center; margin-top: 12px; }

  .submit-wrap { text-align: center; margin-top: 20px; }
  .btn-sub {
    background: #16a34a; color: white; border: none;
    padding: 10px 64px; font-size: 14px;
    font-family: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
    font-weight: 600; border-radius: 4px; cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-sub:hover { background: #15803d; transform: translateY(-1px); }

  @media (max-width: 760px) {
    .two-panel { grid-template-columns: 1fr; }
    .g2 { grid-template-columns: 1fr; }
    .g3 { grid-template-columns: 1fr 1fr; }
    .dis-grid { grid-template-columns: 1fr 1fr; }
  }
`;

const CASTE_OPT = [
  "ब्राह्मण/क्षेत्री",
  "जनजाति",
  "दलित",
  "मधेसी",
  "मुस्लिम",
  "अन्य",
];
const GENDER_OPT = ["पुरुष", "महिला", "अन्य"];
const AGE_GROUP_OPT = [
  "शिशु (0-1)",
  "बालबालिका (1-9)",
  "किशोर (10-19)",
  "युवा (20-39)",
  "मध्यम (40-59)",
  "वृद्ध (60+)",
];
const DISTRICT_OPT = [
  "काठमाडौं",
  "ललितपुर",
  "भक्तपुर",
  "पोखरा",
  "चितवन",
  "धनुषा",
  "मोरङ",
  "सुनसरी",
  "रुपन्देही",
  "बाँके",
];
const DISEASE_OPT = [
  "मधुमेह",
  "उच्च रक्तचाप",
  "श्वासप्रश्वास",
  "हृदय रोग",
  "मिर्गी",
  "आघात",
  "अन्य",
];
const OUTCOME_OPT = ["Discharged", "Referred", "DAMA", "Expired", "Absconded"];
const COST_EXEMPT_OPT = ["Full Exemption", "Partial Exemption", "No Exemption"];
const COST_GROUP_OPT = [
  "Janajati",
  "Dalit",
  "Senior Citizen",
  "Disabled",
  "Poor",
];

const mkRow = (fields) => ({ id: Date.now() + Math.random(), ...fields });

export default function EmergencyServiceRegister() {
  const [f, setF] = useState({
    miti: new Date().toLocaleDateString("en-GB"),
    panjMiti: new Date().toLocaleDateString("en-GB"),
    panjSamay: new Date().toTimeString().slice(0, 5),
    firstName: "",
    familyName: "",
    jaati: "",
    linga: "",
    umerSamuh: "",
    umer: "",
    jilla: "",
    wada: "",
    tol: "",
    palakNaam: "",
    palakSamparka: "",
    selfAdmission: false,
    broughtDead: false,
    referringOrg: "",
    avalokan: false,
    disMiti: "",
    disSamay: "",
    parinam: "",
    rogiMrityu: false,
    lagatMukti: "",
    kulLagatMukti: "",
    lagatMuktiSamuh: "",
    laiangikHinsa: false,
    pulisKes: false,
  });

  const [lakshan, setLakshan] = useState([mkRow({ value: "" })]);
  const [complaints, setComplaints] = useState([mkRow({ value: "" })]);
  const [anweshan, setAnweshan] = useState([mkRow({ value: "" })]);
  const [nidaan, setNidaan] = useState([mkRow({ value: "" })]);
  const [upachar, setUpachar] = useState([mkRow({ value: "" })]);
  const [aushadhi, setAushadhi] = useState([mkRow({ value: "" })]);
  const [loading, setLoading] = useState(false);

  const hc = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setF((p) => ({ ...p, [k]: v }));
  };

  // generic dynamic-table helpers
  const rowChange = (setter) => (id) => (e) =>
    setter((p) =>
      p.map((r) => (r.id === id ? { ...r, value: e.target.value } : r)),
    );
  const rowAdd = (setter) => () => setter((p) => [...p, mkRow({ value: "" })]);
  const rowRemove = (setter, rows) => (id) => {
    if (rows.length === 1) return;
    setter((p) => p.filter((r) => r.id !== id));
  };

  const DynTable = ({ label, rows, setter, colLabel }) => (
    <>
      <span className="sub-label">{label}</span>
      <table className="stbl" style={{ marginBottom: 4 }}>
        <thead>
          <tr>
            <th style={{ width: 36 }}>क्र.सं.</th>
            <th>{colLabel}</th>
            <th style={{ width: 54 }}>थप</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}>
              <td className="sn">{i + 1}</td>
              <td>
                <input
                  className="inp"
                  value={row.value}
                  onChange={rowChange(setter)(row.id)}
                />
              </td>
              <td className="act">
                <button
                  type="button"
                  className="btn-a"
                  onClick={rowAdd(setter)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn-r"
                  onClick={() => rowRemove(setter, rows)(row.id)}
                  disabled={rows.length === 1}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!f.firstName.trim()) {
      return alert("नाम आवश्यक छ");
    }

    if (!f.familyName.trim()) {
      return alert("थर आवश्यक छ");
    }

    if (!f.linga) {
      return alert("लिङ्ग छान्नुहोस्");
    }

    try {
      setLoading(true);

      const payload = {
        formDate: f.miti,
        registrationDate: f.panjMiti,
        registrationTime: f.panjSamay,

        firstName: f.firstName,
        familyName: f.familyName,

        caste: f.jaati,
        gender: f.linga,

        ageGroup: f.umerSamuh,
        age: f.umer,

        district: f.jilla,
        wardNumber: f.wada,
        locality: f.tol,

        guardianName: f.palakNaam,
        guardianContact: f.palakSamparka,

        selfAdmission: f.selfAdmission,
        broughtDead: f.broughtDead,

        referringOrg: f.referringOrg,

        disease: f.rog,

        underObservation: f.avalokan,

        dischargeDate: f.disMiti,
        dischargeTime: f.disSamay,

        outcomeStatus: f.parinam,
        patientDeath: f.rogiMrityu,

        costExemption: f.lagatMukti,
        totalCostExemption: f.kulLagatMukti,
        exemptionGroup: f.lagatMuktiSamuh,

        genderViolence: f.laiangikHinsa,
        policeCase: f.pulisKes,

        symptoms: lakshan
          .filter((x) => x.value.trim())
          .map((x) => ({ itemName: x.value })),

        complaints: complaints
          .filter((x) => x.value.trim())
          .map((x) => ({ itemName: x.value })),

        investigations: anweshan
          .filter((x) => x.value.trim())
          .map((x) => ({ itemName: x.value })),

        diagnosis: nidaan
          .filter((x) => x.value.trim())
          .map((x) => ({ itemName: x.value })),

        treatments: upachar
          .filter((x) => x.value.trim())
          .map((x) => ({ itemName: x.value })),

        medicines: aushadhi
          .filter((x) => x.value.trim())
          .map((x) => ({ itemName: x.value })),
      };

      const res = await axios.post(
        "http://localhost:5000/api/hospital/emergency-service",
        payload,
      );

      alert(`Saved Successfully\n${res.data.emergencyNumber}`);

      setF({
        miti: new Date().toLocaleDateString("en-GB"),
        panjMiti: new Date().toLocaleDateString("en-GB"),
        panjSamay: new Date().toTimeString().slice(0, 5),

        firstName: "",
        familyName: "",
        jaati: "",
        linga: "",
        umerSamuh: "",
        umer: "",
        jilla: "",
        wada: "",
        tol: "",
        palakNaam: "",
        palakSamparka: "",

        selfAdmission: false,
        broughtDead: false,

        referringOrg: "",

        rog: "",
        avalokan: false,

        disMiti: "",
        disSamay: "",
        parinam: "",
        rogiMrityu: false,

        lagatMukti: "",
        kulLagatMukti: "",
        lagatMuktiSamuh: "",

        laiangikHinsa: false,
        pulisKes: false,
      });

      setLakshan([mkRow({ value: "" })]);
      setComplaints([mkRow({ value: "" })]);
      setAnweshan([mkRow({ value: "" })]);
      setNidaan([mkRow({ value: "" })]);
      setUpachar([mkRow({ value: "" })]);
      setAushadhi([mkRow({ value: "" })]);
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
      <div className="root">
        <div className="page-header">
          <h1>आपातकालीन सेवा दर्ता</h1>
          <div className="breadcrumb">
            गृहपृष्ठ / <span>आपातकालीन सेवा दर्ता</span>
          </div>
        </div>

        <form className="fc" onSubmit={handleSubmit}>
          {/* Top date */}
          <div className="top-date">
            <span>मिति :</span>
            <input
              className="inp"
              style={{ maxWidth: 160 }}
              value={f.miti}
              onChange={hc("miti")}
            />
          </div>

          {/* Main two panels */}
          <div className="two-panel">
            {/* ── LEFT: पेसेन्टको जानकारी ── */}
            <div className="panel">
              <div className="panel-title">पेसेन्टको जानकारी</div>

              {/* Panj Miti + Samay */}
              <div className="g2 mb12">
                <div className="field">
                  <label>पंजीकरण मिति</label>
                  <input
                    className="inp"
                    value={f.panjMiti}
                    onChange={hc("panjMiti")}
                  />
                </div>
                <div className="field">
                  <label>पंजीकरण समय</label>
                  <input
                    className="inp"
                    type="time"
                    value={f.panjSamay}
                    onChange={hc("panjSamay")}
                  />
                </div>
              </div>

              {/* Full name */}
              <div className="field mb12">
                <label>पुरा नाम</label>
                <div className="g2">
                  <input
                    className="inp"
                    placeholder="First & Middle Name"
                    value={f.firstName}
                    onChange={hc("firstName")}
                  />
                  <input
                    className="inp"
                    placeholder="Family Name"
                    value={f.familyName}
                    onChange={hc("familyName")}
                  />
                </div>
              </div>

              {/* Jaati + Linga */}
              <div className="g2 mb12">
                <div className="field">
                  <label>जाती</label>
                  <select
                    className="sel"
                    value={f.jaati}
                    onChange={hc("jaati")}
                  >
                    <option value="">Select Caste</option>
                    {CASTE_OPT.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>लिङ्ग</label>
                  <select
                    className="sel"
                    value={f.linga}
                    onChange={hc("linga")}
                  >
                    <option value="">Select Gender</option>
                    {GENDER_OPT.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Umer Samuh + Umer */}
              <div className="g2 mb12">
                <div className="field">
                  <label>उमेर समूह</label>
                  <select
                    className="sel"
                    value={f.umerSamuh}
                    onChange={hc("umerSamuh")}
                  >
                    <option value="">Select Age Group</option>
                    {AGE_GROUP_OPT.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>उमेर</label>
                  <input className="inp" value={f.umer} onChange={hc("umer")} />
                </div>
              </div>

              {/* Jilla */}
              <div className="field mb12">
                <label>जिल्ला</label>
                <select
                  className="sel"
                  value={f.jilla}
                  onChange={hc("jilla")}
                  style={{ maxWidth: 220 }}
                >
                  <option value="">Select District</option>
                  {DISTRICT_OPT.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Wada + Tol */}
              <div className="g2 mb12">
                <div className="field">
                  <label>वडा नम्बर</label>
                  <input className="inp" value={f.wada} onChange={hc("wada")} />
                </div>
                <div className="field">
                  <label>टोल</label>
                  <input className="inp" value={f.tol} onChange={hc("tol")} />
                </div>
              </div>

              {/* Palak */}
              <div className="g2">
                <div className="field">
                  <label>पालनहरूको नाम</label>
                  <input
                    className="inp"
                    value={f.palakNaam}
                    onChange={hc("palakNaam")}
                  />
                </div>
                <div className="field">
                  <label>पालनहरूको सम्पर्क नम्बर</label>
                  <input
                    className="inp"
                    value={f.palakSamparka}
                    onChange={hc("palakSamparka")}
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT: प्रवेश सूचना ── */}
            <div className="panel">
              <div className="panel-title">प्रवेश सूचना</div>

              {/* Self Admission + Brought Dead */}
              <div className="cb-row mb12">
                <label className="cb-item">
                  <input
                    type="checkbox"
                    checked={f.selfAdmission}
                    onChange={hc("selfAdmission")}
                  />
                  Self Admission
                </label>
                <label className="cb-item">
                  <input
                    type="checkbox"
                    checked={f.broughtDead}
                    onChange={hc("broughtDead")}
                  />
                  Brought Dead
                </label>
              </div>

              {/* Referring Org */}
              <div className="field mb14">
                <input
                  className="inp"
                  placeholder="Referring Organization"
                  value={f.referringOrg}
                  onChange={hc("referringOrg")}
                />
              </div>

              {/* Dynamic tables */}
              <DynTable
                label="लक्षण र लक्षणहरू"
                rows={lakshan}
                setter={setLakshan}
                colLabel="संकेत र लक्षण"
              />
              <DynTable
                label="प्रवेशमा मुख्य शिकायतहरू"
                rows={complaints}
                setter={setComplaints}
                colLabel="मुख्य शिकायत"
              />
              <DynTable
                label="अन्वेषणहरू"
                rows={anweshan}
                setter={setAnweshan}
                colLabel="अन्वेषण"
              />
              <DynTable
                label="निदान"
                rows={nidaan}
                setter={setNidaan}
                colLabel="निदान"
              />

              {/* Rog */}
              <div className="field mb10" style={{ marginTop: 14 }}>
                <label>रोग</label>
                <select className="sel" value={f.rog} onChange={hc("rog")}>
                  <option value="">Select Disease</option>
                  {DISEASE_OPT.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <DynTable
                label="उपचार"
                rows={upachar}
                setter={setUpachar}
                colLabel="उपचार"
              />
              <DynTable
                label="औषधि सिफारिस गारिएको"
                rows={aushadhi}
                setter={setAushadhi}
                colLabel="औषधि सिफारिस गारिएको"
              />

              {/* Avalokan */}
              <div className="cb-row" style={{ marginTop: 12 }}>
                <label className="cb-item">
                  <input
                    type="checkbox"
                    checked={f.avalokan}
                    onChange={hc("avalokan")}
                  />
                  अवलोकनमा राखिएको
                </label>
              </div>
            </div>
          </div>

          {/* ── DISCHARGE SECTION ── */}
          <div className="full-card">
            <div className="panel-title" style={{ marginBottom: 16 }}>
              डिस्चार्ज सूचना
            </div>

            <div className="dis-grid mb12">
              <div className="field">
                <label>डिस्चार्ज मिति</label>
                <input
                  className="inp"
                  value={f.disMiti}
                  onChange={hc("disMiti")}
                />
              </div>
              <div className="field">
                <label>डिस्चार्ज समय</label>
                <input
                  className="inp"
                  type="time"
                  value={f.disSamay}
                  onChange={hc("disSamay")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  paddingBottom: 2,
                }}
              >
                <label className="cb-item">
                  <input
                    type="checkbox"
                    checked={f.rogiMrityu}
                    onChange={hc("rogiMrityu")}
                  />
                  रोगी मृत्यु भएको छ
                </label>
              </div>
            </div>

            <div className="g3 mb12">
              <div className="field">
                <label>परिणाम</label>
                <select
                  className="sel"
                  value={f.parinam}
                  onChange={hc("parinam")}
                >
                  <option value="">Select Outcome</option>
                  {OUTCOME_OPT.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>लागत मुक्ति</label>
                <select
                  className="sel"
                  value={f.lagatMukti}
                  onChange={hc("lagatMukti")}
                >
                  <option value="">Select Cost Exemption</option>
                  {COST_EXEMPT_OPT.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>कुल लागत मुक्ति</label>
                <input
                  className="inp"
                  value={f.kulLagatMukti}
                  onChange={hc("kulLagatMukti")}
                />
              </div>
            </div>

            <div className="g2 mb12" style={{ maxWidth: 500 }}>
              <div className="field">
                <label>लागत मुक्ति समूह</label>
                <select
                  className="sel"
                  value={f.lagatMuktiSamuh}
                  onChange={hc("lagatMuktiSamuh")}
                >
                  <option value="">Select Cost Exemption Group</option>
                  {COST_GROUP_OPT.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cb-row">
              <label className="cb-item">
                <input
                  type="checkbox"
                  checked={f.laiangikHinsa}
                  onChange={hc("laiangikHinsa")}
                />
                लैंगिक हिंसा
              </label>
              <label className="cb-item">
                <input
                  type="checkbox"
                  checked={f.pulisKes}
                  onChange={hc("pulisKes")}
                />
                पुलिसको केस
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="submit-wrap">
            <button
              type="submit"
              className="btn-sub"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "बुझाउनुहोस्"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
