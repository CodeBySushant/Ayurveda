import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const s = {
  root: {
    fontFamily: "'Noto Sans Devanagari', 'Noto Sans', 'Segoe UI', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    fontSize: 13,
    color: "#333",
  },
  nav: {
    background: "#e8eaf0",
    borderBottom: "1px solid #d0d3db",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navTitle: { fontWeight: 700, fontSize: 17, color: "#222" },
  navBreadcrumb: { fontSize: 13, color: "#555" },
  navLink: { color: "#1565c0", textDecoration: "none", fontWeight: 500 },
  filterBar: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0f2f5",
  },
  dateInput: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "5px 10px",
    fontSize: 13,
    height: 34,
    background: "white",
    outline: "none",
    width: 140,
  },
  searchBtn: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "5px 14px",
    height: 34,
    fontSize: 15,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  pageBody: { padding: "0 20px 24px" },
  tableWrapper: {
    background: "white",
    border: "1px solid #dde",
    borderRadius: 3,
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 12,
    minWidth: 1100,
  },
  th: {
    background: "#f5f6fa",
    fontWeight: 600,
    padding: "8px 10px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
    lineHeight: 1.5,
  },
  thGroup: {
    background: "#eaecf5",
    fontWeight: 700,
    padding: "8px 10px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
  },
  td: (alt) => ({
    border: "1px solid #eee",
    padding: "7px 10px",
    textAlign: "center",
    background: alt ? "#f7f8fc" : "white",
    color: "#444",
    fontSize: 12,
    verticalAlign: "middle",
  }),
  noDataTd: {
    border: "1px solid #eee",
    padding: "18px",
    textAlign: "center",
    color: "#aaa",
    fontSize: 13,
    background: "#fafafa",
  },
};

export default function AapatkalinSevaDartaDainikSuchi() {
  const [dateFilter, setDateFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageData = useMemo(() => {
    if (!dateFilter) return data;

    return data.filter(
      (row) => String(row.registration_date || "").trim() === dateFilter,
    );
  }, [data, dateFilter]);
  const fetchEmergency = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/hospital/emergency-service",
      );

      setData(res.data || []);
    } catch (error) {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergency();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this record?");
    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/hospital/emergency-service/${id}`,
      );

      fetchEmergency();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/hospital/emergency-service/${id}/items`,
      );

      setDetails(res.data);
      setShowModal(true);
    } catch (error) {
      alert("Failed to fetch details");
    }
  };

  const handlePrint = (row) => {
    const w = window.open("", "_blank");

    w.document.write(`
    <html>
    <head>
      <title>Emergency Slip</title>
      <style>
        body{font-family:Arial;padding:30px}
        table{width:100%;border-collapse:collapse}
        td,th{border:1px solid #ccc;padding:8px}
        h2{text-align:center}
      </style>
    </head>
    <body>
      <h2>Emergency Service Record</h2>
      <table>
        <tr><th>No</th><td>${row.emergency_number}</td></tr>
        <tr><th>Name</th><td>${row.first_name} ${row.family_name}</td></tr>
        <tr><th>Date</th><td>${row.registration_date}</td></tr>
        <tr><th>District</th><td>${row.district}</td></tr>
      </table>
      <script>
        window.onload=function(){
          window.print();
          window.onafterprint=()=>window.close();
        }
      </script>
    </body>
    </html>
  `);

    w.document.close();
  };

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>आपातकालीन सेवा दर्ता विवरणको दैनिक सूची</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>
            गृहपृष्ठ
          </a>
          {" / "}आपातकालीन सेवा दर्ता विवरणको दैनिक सूची
        </span>
      </div>

      {/* Filter Bar */}
      <div style={s.filterBar}>
        <input
          type="date"
          style={s.dateInput}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button type="button" style={s.searchBtn} onClick={fetchEmergency}>
          🔍
        </button>
      </div>

      {/* Table */}
      <div style={s.pageBody}>
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              {/* Row 1: लिङ्ग (1 col) | ठेगाना (3 cols) */}
              <tr>
                <th rowSpan={3} style={s.th}>
                  क्र.सं.
                </th>
                <th rowSpan={3} style={s.th}>
                  दर्ता नम्बर
                </th>
                <th rowSpan={3} style={s.th}>
                  दर्ता मिति र समय
                </th>
                <th rowSpan={3} style={s.th}>
                  पहिलो, मध्यम, र परिवारको नाम
                </th>
                <th rowSpan={3} style={s.th}>
                  जाति/जातियता कोड
                </th>
                <th colSpan={1} style={s.thGroup}>
                  लिङ्ग
                </th>
                <th colSpan={3} style={s.thGroup}>
                  ठेगाना
                </th>
                <th rowSpan={3} style={s.th}>
                  पालनहरूको नाम र सम्पर्क नम्बर
                </th>
                <th rowSpan={3} style={s.th}>
                  कार्यवाही
                </th>
              </tr>
              {/* Row 2: उमेर समूह | जिल्ला | स्थानीय सरकार | (3rd ठेगाना col spans 2 rows) */}
              <tr>
                <th style={s.th}>उमेर समूह</th>
                <th style={s.th}>जिल्ला</th>
                <th style={s.th}>स्थानीय सरकार</th>
                <th rowSpan={2} style={s.th}></th>
              </tr>
              {/* Row 3: उमेर | वार्ड नम्बर | टोल */}
              <tr>
                <th style={s.th}>उमेर</th>
                <th style={s.th}>वार्ड नम्बर</th>
                <th style={s.th}>टोल</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={13} style={s.noDataTd}>
                    Loading...
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={13} style={s.noDataTd}>
                    No data for this date !
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={row.id || i}>
                    <td style={s.td(i % 2 !== 0)}>
                      {pageData.indexOf(row) + 1}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>{row.emergency_number}</td>
                    <td style={s.td(i % 2 !== 0)}>
                      {row.registration_date} {row.registration_time}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>
                      {row.first_name} {row.family_name}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>{row.caste}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.age_group}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.age}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.district}</td>
                    <td style={s.td(i % 2 !== 0)}>-</td>
                    <td style={s.td(i % 2 !== 0)}>{row.ward_number}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.locality}</td>
                    <td style={s.td(i % 2 !== 0)}>
                      {row.guardian_name} / {row.guardian_contact}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handlePrint(row)}
                          style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "11px",
                          }}
                        >
                          Print
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          style={{
                            background: "#dc2626",
                            color: "#fff",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "11px",
                          }}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          onClick={() => handleView(row.id)}
                          style={{
                            background: "#16a34a",
                            color: "#fff",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "11px",
                          }}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "600px",
              maxHeight: "80vh",
              overflow: "auto",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Emergency Details</h3>

            {[
              ["Symptoms", details?.symptoms],
              ["Complaints", details?.complaints],
              ["Investigations", details?.investigations],
              ["Diagnosis", details?.diagnosis],
              ["Treatments", details?.treatments],
              ["Medicines", details?.medicines],
            ].map(([title, arr], idx) => (
              <div key={idx} style={{ marginTop: "12px" }}>
                <strong>{title}</strong>
                {(arr || []).length === 0 ? (
                  <div>No data</div>
                ) : (
                  (arr || []).map((x, i) => <div key={i}>{x.item_name}</div>)
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "18px",
                padding: "8px 14px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
