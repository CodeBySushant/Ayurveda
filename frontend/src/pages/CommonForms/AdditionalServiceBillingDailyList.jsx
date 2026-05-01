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
  input: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "4px 10px",
    fontSize: 13,
    height: 32,
    background: "white",
    outline: "none",
    minWidth: 150,
  },
  dateInput: {
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "4px 10px",
    fontSize: 13,
    height: 32,
    background: "white",
    outline: "none",
    width: 120,
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
    minWidth: 1000,
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

export default function ThapSevaBilingDainikSuchi() {
  const [entries, setEntries] = useState("10");
  const [moolDarta, setMoolDarta] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewItems, setViewItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBilling = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/common/additional-billing",
      );

      setData(res.data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load billing list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this bill?");
    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/common/additional-billing/${id}`,
      );

      await fetchBilling();
      setPage(1);

      alert("Deleted successfully");
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleViewItems = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/common/additional-billing/${id}/items`,
      );

      setViewItems(res.data || []);
      setShowModal(true);
    } catch (error) {
      alert("Failed to fetch items");
    }
  };

  const handlePrint = (row) => {
    const w = window.open("", "_blank");

    w.document.write(`
    <html>
    <head>
      <title>Bill Print</title>
      <style>
        body{font-family:Arial;padding:30px;}
        h2{text-align:center;}
        table{width:100%;border-collapse:collapse;margin-top:20px;}
        td,th{border:1px solid #ccc;padding:8px;text-align:left;}
      </style>
    </head>
    <body>
      <h2>Additional Service Bill</h2>
      <table>
        <tr><th>Bill ID</th><td>${row.id}</td></tr>
        <tr><th>Name</th><td>${row.patient_name} ${row.patient_surname}</td></tr>
        <tr><th>Master No</th><td>${row.master_number}</td></tr>
        <tr><th>Total</th><td>${row.total_amount}</td></tr>
        <tr><th>Payment</th><td>${row.payment_mode}</td></tr>
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

  const filteredData = data.filter((row) => {
    const byMaster = row.master_number?.toString().includes(moolDarta);

    const byDate = dateFilter
      ? row.created_at?.slice(0, 10) === dateFilter
      : true;

    return byMaster && byDate;
  });

  const pageSize = parseInt(entries) || 10;

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  return (
    <div style={s.root}>
      {/* Nav */}
      <div style={s.nav}>
        <span style={s.navTitle}>थप सेवा बिलिङ दैनिक सूची</span>
        <span style={s.navBreadcrumb}>
          <a href="#" style={s.navLink}>
            गृहपृष्ठ
          </a>
          {" / "}थप सेवा बिलिङ दैनिक सूची
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
          style={s.input}
          placeholder="मूल दर्ता नम्बर"
          value={moolDarta}
          onChange={(e) => {
            setMoolDarta(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="date"
          style={s.dateInput}
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setPage(1);
          }}
        />
        <button type="button" style={s.searchBtn} onClick={fetchBilling}>
          🔍
        </button>
      </div>

      {/* Table */}
      <div style={s.pageBody}>
        <div style={s.tableWrapper}>
          <table style={s.table}>
            <thead>
              {/* Row 1 — group headers with rowspan/colspan */}
              <tr>
                <th rowSpan={2} style={s.th}>
                  थप
                </th>
                <th rowSpan={2} style={s.th}>
                  मिति
                </th>
                <th rowSpan={2} style={s.th}>
                  मूल दर्ता नम्बर
                </th>
                <th colSpan={3} style={s.thGroup}>
                  सेवाग्राहीको
                </th>
                <th colSpan={2} style={s.thGroup}>
                  लिङ्ग
                </th>
                <th rowSpan={2} style={s.th}>
                  सम्पर्क नं.
                </th>
                <th rowSpan={2} style={s.th}>
                  सेवाको प्रकार
                </th>
                <th rowSpan={2} style={s.th}>
                  छुटको प्रकार
                </th>
                <th rowSpan={2} style={s.th}>
                  छुट (%)
                </th>
                <th rowSpan={2} style={s.th}>
                  छुट (रू.)
                </th>
                <th rowSpan={2} style={s.th}>
                  कुल शुल्क रू.
                </th>
                <th rowSpan={2} style={s.th}>
                  प्राप्तीको माध्यम
                </th>
                <th rowSpan={2} style={s.th}>
                  चेक वा अन्य नं.
                </th>
                <th rowSpan={2} style={s.th}>
                  Action
                </th>
              </tr>
              {/* Row 2 — sub-headers */}
              <tr>
                <th style={s.th}>नाम</th>
                <th style={s.th}>जाती</th>
                <th style={s.th}>थर</th>
                <th style={s.th}>लिङ्ग</th>
                <th style={s.th}>उमेर</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={17} style={s.noDataTd}>
                    Loading...
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={17} style={s.noDataTd}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={row.id}>
                    <td style={s.td(i % 2 !== 0)}>{row.id}</td>
                    <td style={s.td(i % 2 !== 0)}>
                      {new Date(row.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td style={s.td(i % 2 !== 0)}>{row.master_number}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.patient_name}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.caste}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.patient_surname}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.gender}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.age}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.contact_number}</td>
                    <td style={s.td(i % 2 !== 0)}>Billing</td>
                    <td style={s.td(i % 2 !== 0)}>{row.discount_type}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.discount_percent}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.discount_amount}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.total_amount}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.payment_mode}</td>
                    <td style={s.td(i % 2 !== 0)}>{row.reference_number}</td>

                    <td style={s.td(i % 2 !== 0)}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handlePrint(row)}
                          style={{
                            padding: "4px 10px",
                            border: "none",
                            background: "#2563eb",
                            color: "#fff",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Print
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          style={{
                            padding: "4px 10px",
                            border: "none",
                            background: "#dc2626",
                            color: "#fff",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          onClick={() => handleViewItems(row.id)}
                          style={{
                            padding: "4px 10px",
                            border: "none",
                            background: "#16a34a",
                            color: "#fff",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
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
              padding: "20px",
              borderRadius: "10px",
              width: "420px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <h3>Service Items</h3>

            {viewItems.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {item.service_name} - Rs. {item.amount}
              </div>
            ))}

            <button
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
