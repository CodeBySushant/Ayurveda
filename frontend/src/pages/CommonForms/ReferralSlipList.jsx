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
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0f2f5",
    flexWrap: "wrap",
  },
  showLabel: {
    fontSize: 13,
    color: "#444",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  select: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "3px 6px",
    fontSize: 13,
    height: 30,
    background: "white",
    cursor: "pointer",
  },
  spacer: { flex: 1 },
  dateInput: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "4px 10px",
    fontSize: 13,
    height: 32,
    background: "white",
    outline: "none",
    width: 130,
  },
  searchBtn: {
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 3,
    padding: "4px 14px",
    height: 32,
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
    minWidth: 1300,
  },
  th: {
    background: "#eef1f8",
    fontWeight: 600,
    padding: "7px 8px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    lineHeight: 1.5,
  },
  thGroup: {
    background: "#e4e8f5",
    fontWeight: 700,
    padding: "7px 8px",
    border: "1px solid #d5daea",
    textAlign: "center",
    color: "#3a4570",
    verticalAlign: "middle",
  },
  td: (alt) => ({
    border: "1px solid #eee",
    padding: "7px 8px",
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
  paginationRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 4,
    padding: "10px 12px",
    borderTop: "3px solid #8899cc",
  },
  pageBtn: {
    border: "1px solid #ccc",
    background: "white",
    borderRadius: 3,
    padding: "4px 14px",
    fontSize: 13,
    cursor: "pointer",
    color: "#333",
  },
};

export default function PreshonDainikSuchi() {
  const [entries, setEntries] = useState("10");
  const [dateFilter, setDateFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = data.filter((row) => {
    if (!dateFilter) return true;

    const d = row.created_at?.slice(0, 10);
    return d === dateFilter;
  });

  const pageSize = parseInt(entries) || 10;

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/common/referral-slip",
      );

      setData(res.data || []);
    } catch (error) {
      alert("Failed to load referrals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this referral slip?");
    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/common/referral-slip/${id}`,
      );

      await fetchReferrals();
      setPage(1);
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/common/referral-slip/${id}/items`,
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
      <title>Referral Slip</title>
      <style>
        body{font-family:Arial;padding:30px}
        h2{text-align:center}
        table{width:100%;border-collapse:collapse;margin-top:20px}
        td,th{border:1px solid #ccc;padding:8px}
      </style>
    </head>
    <body>
      <h2>Referral Slip</h2>
      <table>
        <tr><th>Slip No</th><td>${row.slip_number}</td></tr>
        <tr><th>Name</th><td>${row.first_name} ${row.last_name}</td></tr>
        <tr><th>Master No</th><td>${row.master_number}</td></tr>
        <tr><th>From</th><td>${row.from_institution_name}</td></tr>
        <tr><th>To</th><td>${row.to_institution_name}</td></tr>
        <tr><th>Reason</th><td>${row.referral_reason}</td></tr>
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
        <span style={s.navTitle}>प्रेषण / स्थानान्तरण पुर्जा दैनिक सूची</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>
            गृहपृष्ठ
          </a>
          {" / "}प्रेषण / स्थानान्तरण पुर्जा दैनिक सूची
        </span>
      </div>

      {/* Filter Bar */}
      <div style={s.filterBar}>
        <span style={s.showLabel}>
          Show
          <select
            style={s.select}
            value={entries}
            onChange={(e) => {
              setEntries(e.target.value);
              setPage(1);
            }}
          >
            {["10", "25", "50", "100"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          entries
        </span>
        <div style={s.spacer} />
        <input
          type="date"
          style={s.dateInput}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button type="button" style={s.searchBtn} onClick={fetchReferrals}>
          🔍
        </button>
      </div>

      {/* Table */}
      <div style={s.pageBody}>
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              {/* Row 1 */}
              <tr>
                <th rowSpan={3} style={s.th}>
                  कार्य
                </th>
                <th colSpan={3} style={s.thGroup}>
                  संस्थाको ठेगाना
                </th>
                <th rowSpan={3} style={s.th}>
                  स्वास्थ्य संस्था
                </th>
                <th rowSpan={3} style={s.th}>
                  मिति
                </th>
                <th rowSpan={3} style={s.th}>
                  सम्पर्क नं.
                </th>
                <th rowSpan={3} style={s.th}>
                  सेवाग्राहीको नाम, थर
                </th>
                <th colSpan={2} style={s.thGroup}>
                  लिङ्ग
                </th>
                <th colSpan={3} style={s.thGroup}>
                  सेवाग्राहीको ठेगाना
                </th>
                <th rowSpan={3} style={s.th}>
                  लिइरहेको सेवा
                </th>
                <th rowSpan={3} style={s.th}>
                  सम्पर्क गर्नुपर्ने मिति
                </th>
                <th rowSpan={3} style={s.th}>
                  BP
                </th>
                <th rowSpan={3} style={s.th}>
                  Respiration
                </th>
                <th rowSpan={3} style={s.th}>
                  Pulse
                </th>
                <th rowSpan={3} style={s.th}>
                  Temp
                </th>
                <th rowSpan={3} style={s.th}>
                  Weight (kg)
                </th>
                <th rowSpan={3} style={s.th}>
                  Pub
                </th>
              </tr>
              {/* Row 2 */}
              <tr>
                <th rowSpan={2} style={s.th}>
                  जिल्ला
                </th>
                <th rowSpan={2} style={s.th}>
                  गाउँ/ नगरपालिका
                </th>
                <th rowSpan={2} style={s.th}>
                  ठेगाना
                </th>
                <th rowSpan={2} style={s.th}>
                  लिङ्ग
                </th>
                <th rowSpan={2} style={s.th}>
                  उमेर
                </th>
                <th rowSpan={2} style={s.th}>
                  जिल्ला
                </th>
                <th rowSpan={2} style={s.th}>
                  गाउँ/ नगरपालिका
                </th>
                <th rowSpan={2} style={s.th}>
                  वडा नं.
                </th>
              </tr>
              {/* Row 3 — empty because all rowspans covered */}
              <tr />
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={21} style={s.noDataTd}>
                    Loading...
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={21} style={s.noDataTd}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={row.id || i}>
                    <td style={s.td(i % 2 !== 0)}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        <button type="button" onClick={() => handlePrint(row)}>
                          Print
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => handleView(row.id)}
                        >
                          View
                        </button>
                      </div>
                    </td>

                    <td style={s.td(i % 2 !== 0)}>{row.from_province}</td>
                    <td style={s.td(i % 2 !== 0)}>-</td>
                    <td style={s.td(i % 2 !== 0)}>{row.from_address}</td>
                    <td style={s.td(i % 2 !== 0)}>
                      {row.from_institution_name}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>{row.form_date}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.from_contact}</td>
                    <td style={s.td(i % 2 !== 0)}>
                      {row.first_name} {row.last_name}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>{row.gender}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.age}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.district}</td>
                    <td style={s.td(i % 2 !== 0)}>-</td>
                    <td style={s.td(i % 2 !== 0)}>{row.ward_number}</td>
                    <td style={s.td(i % 2 !== 0)}>View</td>
                    <td style={s.td(i % 2 !== 0)}>{row.contact_date}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.blood_pressure}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.respiration}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.pulse}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.temperature}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.weight}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.body_type}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={s.paginationRow}>
            <button
              style={s.pageBtn}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button
              style={s.pageBtn}
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "500px",
              maxHeight: "80vh",
              overflow: "auto",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Referral Details</h3>

            <h4>Services</h4>
            {details?.services?.map((x, i) => (
              <div key={i}>{x}</div>
            ))}

            <h4 style={{ marginTop: "15px" }}>Medicines</h4>
            {details?.medicines?.map((x, i) => (
              <div key={i}>
                {x.medicine_name} - {x.dosage}
              </div>
            ))}

            <button
              type="button"
              style={{ marginTop: "15px" }}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
