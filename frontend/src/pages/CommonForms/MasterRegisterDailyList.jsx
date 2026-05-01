import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/common/master-register";

/* ───────────────────────── Styles ───────────────────────── */

const s = {
  root: {
    fontFamily: "'Noto Sans Devanagari','Segoe UI',sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    color: "#333",
    fontSize: 13,
  },

  nav: {
    padding: "14px 22px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
  },

  breadcrumb: {
    color: "#6b7280",
    fontSize: 13,
  },

  toolbar: {
    padding: "14px 22px",
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },

  select: {
    height: 36,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "0 10px",
    background: "#fff",
  },

  input: {
    height: 36,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "0 12px",
    background: "#fff",
    minWidth: 170,
    outline: "none",
  },

  btn: {
    height: 36,
    border: "none",
    borderRadius: 6,
    padding: "0 14px",
    cursor: "pointer",
    background: "#0d9488",
    color: "#fff",
    fontWeight: 600,
  },

  btnBlue: {
    height: 32,
    border: "none",
    borderRadius: 6,
    padding: "0 10px",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
    fontSize: 12,
  },

  btnRed: {
    height: 32,
    border: "none",
    borderRadius: 6,
    padding: "0 10px",
    cursor: "pointer",
    background: "#dc2626",
    color: "#fff",
    fontSize: 12,
  },

  body: {
    padding: "0 22px 24px",
  },

  card: {
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 1100,
  },

  th: {
    background: "#eef2ff",
    padding: "10px 8px",
    borderBottom: "1px solid #dbeafe",
    fontWeight: 700,
    textAlign: "center",
    whiteSpace: "nowrap",
    color: "#1e3a8a",
    fontSize: 12,
  },

  td: (alt) => ({
    padding: "10px 8px",
    borderBottom: "1px solid #f1f5f9",
    textAlign: "center",
    background: alt ? "#fafafa" : "#fff",
    fontSize: 12,
    whiteSpace: "nowrap",
  }),

  noData: {
    padding: 30,
    textAlign: "center",
    color: "#9ca3af",
  },

  footer: {
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  pageBtn: {
    height: 34,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "0 14px",
    background: "#fff",
    cursor: "pointer",
  },

  loading: {
    padding: 30,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: 600,
  },
};

/* ───────────────────── Component ───────────────────── */

export default function MasterRegisterDailyList() {
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState("10");
  const [searchNo, setSearchNo] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* Fetch Data */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setData(res.data || []);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* Delete */
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this record?");
    if (!ok) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  /* Search Filter */
  const filtered = useMemo(() => {
    return data.filter((row) => {
      const fullName =
        `${row.first_name || ""} ${row.last_name || ""}`.toLowerCase();

      const byNo = row.master_number?.toString().includes(searchNo.trim());

      const byName = fullName.includes(searchName.trim().toLowerCase());

      const byDate = searchDate
        ? row.entry_date?.slice(0, 10) === searchDate
        : true;

      return byNo && byName && byDate;
    });
  }, [data, searchNo, searchName, searchDate]);

  /* Pagination */
  const pageSize = parseInt(entries);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [entries, searchNo, searchName, searchDate]);

  /* Helpers */
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const feeText = (row) =>
    row.is_free ? "नि:शुल्क" : `रू ${row.fee_amount || 0}`;

  const handlePrint = (row) => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=700,left=100,top=50",
    );

    if (!printWindow) {
      alert("Please allow popups for printing.");
      return;
    }

    const html = `
  <html>
    <head>
      <title>Print Slip</title>
      <style>
        body{
          font-family: Arial, sans-serif;
          padding:40px;
          color:#111;
        }

        .header{
          text-align:center;
          margin-bottom:30px;
        }

        .header h1{
          margin:0;
          font-size:26px;
        }

        .header p{
          margin:6px 0;
          color:#555;
        }

        .title{
          text-align:center;
          font-size:20px;
          font-weight:bold;
          margin-bottom:25px;
          border-bottom:2px solid #000;
          padding-bottom:8px;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:14px;
        }

        .field{
          padding:10px;
          border:1px solid #ddd;
          border-radius:6px;
        }

        .label{
          font-size:12px;
          color:#666;
          margin-bottom:4px;
        }

        .value{
          font-size:16px;
          font-weight:600;
        }

        .full{
          grid-column:1 / -1;
        }

        .footer{
          margin-top:50px;
          display:flex;
          justify-content:space-between;
        }

        .sign{
          margin-top:50px;
          width:220px;
          text-align:center;
          border-top:1px solid #000;
          padding-top:8px;
        }

        @media print{
          button{display:none;}
        }
      </style>
    </head>

    <body>
      <div class="header">
        <h1>Ayurveda Service Center</h1>
        <p>Master Register Print Slip</p>
      </div>

      <div class="title">Patient Registration Slip</div>

      <div class="grid">

        <div class="field">
          <div class="label">Master Number</div>
          <div class="value">${row.master_number || ""}</div>
        </div>

        <div class="field">
          <div class="label">Date</div>
          <div class="value">${row.entry_date ? new Date(row.entry_date).toLocaleDateString("en-GB") : ""}</div>
        </div>

        <div class="field">
          <div class="label">Full Name</div>
          <div class="value">${row.first_name || ""} ${row.last_name || ""}</div>
        </div>

        <div class="field">
          <div class="label">Gender</div>
          <div class="value">${row.gender || ""}</div>
        </div>

        <div class="field">
          <div class="label">Age</div>
          <div class="value">${row.age || ""}</div>
        </div>

        <div class="field">
          <div class="label">Contact</div>
          <div class="value">${row.contact_number || ""}</div>
        </div>

        <div class="field">
          <div class="label">Province</div>
          <div class="value">${row.province || ""}</div>
        </div>

        <div class="field">
          <div class="label">Ward</div>
          <div class="value">${row.ward_number || ""}</div>
        </div>

        <div class="field full">
          <div class="label">Locality</div>
          <div class="value">${row.locality || ""}</div>
        </div>

        <div class="field">
          <div class="label">Visit Type</div>
          <div class="value">${row.visit_type || ""}</div>
        </div>

        <div class="field">
          <div class="label">Fee</div>
          <div class="value">
            ${row.is_free ? "Free" : "Rs. " + (row.fee_amount || 0)}
          </div>
        </div>

      </div>

      <div class="footer">
        <div class="sign">Authorized Signature</div>
        <div class="sign">Patient Signature</div>
      </div>

      <script>
        window.onload = function () {
          setTimeout(() => {
          window.print();

        setTimeout(() => {
        window.close();
          }, 300);
        }, 200);
    };
      </script>
    </body>
  </html>
  `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  /* UI */

  return (
    <div style={s.root}>
      {/* Header */}
      <div style={s.nav}>
        <div style={s.title}>मूल दर्ता दैनिक सूची</div>
        <div style={s.breadcrumb}>गृहपृष्ठ / मूल दर्ता दैनिक सूची</div>
      </div>

      {/* Toolbar */}
      <div style={s.toolbar}>
        <select
          style={s.select}
          value={entries}
          onChange={(e) => setEntries(e.target.value)}
        >
          {["10", "25", "50", "100"].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <input
          style={s.input}
          placeholder="मूल दर्ता नम्बर"
          value={searchNo}
          onChange={(e) => setSearchNo(e.target.value)}
        />

        <input
          style={s.input}
          placeholder="पुरा नाम"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="date"
          style={s.input}
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />

        <button style={s.btn} onClick={fetchData}>
          Refresh
        </button>
      </div>

      {/* Body */}
      <div style={s.body}>
        <div style={s.card}>
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>ID</th>
                  <th style={s.th}>मिति</th>
                  <th style={s.th}>दर्ता नं.</th>
                  <th style={s.th}>Visit</th>
                  <th style={s.th}>नाम</th>
                  <th style={s.th}>लिङ्ग</th>
                  <th style={s.th}>उमेर</th>
                  <th style={s.th}>सम्पर्क</th>
                  <th style={s.th}>प्रदेश</th>
                  <th style={s.th}>वडा</th>
                  <th style={s.th}>टोल</th>
                  <th style={s.th}>शुल्क</th>
                  <th style={s.th}>कार्य</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="13" style={s.loading}>
                      Loading...
                    </td>
                  </tr>
                ) : pageData.length === 0 ? (
                  <tr>
                    <td colSpan="13" style={s.noData}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  pageData.map((row, i) => (
                    <tr key={row.id}>
                      <td style={s.td(i % 2)}>{row.id}</td>

                      <td style={s.td(i % 2)}>{formatDate(row.entry_date)}</td>

                      <td style={s.td(i % 2)}>{row.master_number}</td>

                      <td style={s.td(i % 2)}>{row.visit_type}</td>

                      <td style={s.td(i % 2)}>
                        {row.first_name} {row.last_name}
                      </td>

                      <td style={s.td(i % 2)}>{row.gender}</td>

                      <td style={s.td(i % 2)}>{row.age}</td>

                      <td style={s.td(i % 2)}>{row.contact_number}</td>

                      <td style={s.td(i % 2)}>{row.province}</td>

                      <td style={s.td(i % 2)}>{row.ward_number}</td>

                      <td style={s.td(i % 2)}>{row.locality}</td>

                      <td style={s.td(i % 2)}>{feeText(row)}</td>

                      <td style={s.td(i % 2)}>
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={s.btnBlue}
                            onClick={() => handlePrint(row)}
                          >
                            Print
                          </button>

                          <button
                            style={s.btnRed}
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={s.footer}>
            <div>Total Records: {filtered.length}</div>

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <button
                style={s.pageBtn}
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>

              <span>
                Page {page} / {totalPages}
              </span>

              <button
                style={s.pageBtn}
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
