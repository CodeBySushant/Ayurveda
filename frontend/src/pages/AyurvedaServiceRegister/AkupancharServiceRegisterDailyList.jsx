// src/pages/AyurvedaServiceRegister/AkupancharServiceRegisterDailyList.jsx

import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef0f6",
    padding: "22px",
    fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
    color: "#495057",
  },

  /* Top title bar */
  topBar: {
    background: "#dfe2ee",
    padding: "12px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
    fontSize: "15px",
    fontWeight: 500,
  },

  heading: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#5c6270",
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },

  home: {
    color: "#3b5bdb",
    cursor: "pointer",
  },

  /* Card */
  card: {
    background: "#fff",
    border: "1px solid #e0e3ea",
  },

  controls: {
    padding: "18px 14px 6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },

  leftControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },

  select: {
    border: "1px solid #cfd4df",
    padding: "6px 8px",
    fontSize: "14px",
    background: "#fff",
    outline: "none",
  },

  searchWrap: {
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "135px",
    padding: "8px 10px",
    border: "1px solid #cfd4df",
    borderRight: "none",
    outline: "none",
    fontSize: "14px",
  },

  dateInput: {
    width: "130px",
    padding: "8px 10px",
    border: "1px solid #cfd4df",
    borderRight: "none",
    outline: "none",
    fontSize: "14px",
  },

  searchBtn: {
    width: "42px",
    height: "38px",
    border: "none",
    background: "#2f80ed",
    color: "#fff",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
  },

  tableWrap: {
    overflowX: "auto",
    padding: "0 12px 0",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    marginTop: "4px",
  },

  th: {
    background: "#dfe2ee",
    border: "1px solid #d7dbe6",
    padding: "12px 8px",
    textAlign: "center",
    fontWeight: 600,
    color: "#5c6270",
  },

  td: {
    border: "1px solid #e0e3ea",
    padding: "12px 8px",
    textAlign: "center",
    color: "#7a808d",
  },

  noData: {
    padding: "16px",
    textAlign: "center",
    color: "#7a808d",
  },

  bottomBar: {
    padding: "12px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0",
    borderTop: "1px solid #e0e3ea",
  },

  pageBtn: {
    padding: "10px 16px",
    border: "1px solid #cfd4df",
    background: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    color: "#5c6270",
  },

  disabledBtn: {
    padding: "10px 16px",
    border: "1px solid #cfd4df",
    background: "#fff",
    cursor: "not-allowed",
    opacity: 0.6,
    fontSize: "14px",
  },
};

/* Future DB rows can come from API */
const initialRows = [];

export default function AkupancharServiceRegisterDailyList() {
  const [rows, setRows] = useState(initialRows);

  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [registerNo, setRegisterNo] = useState("");
  const [date, setDate] = useState("");

  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this record?");
    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/ayurveda/akupanchar-service/${id}`,
      );

      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ayurveda/akupanchar-service/${id}/items`,
      );

      setDetails(res.data || []);
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
        <title>Print</title>
        <style>
          body{font-family:Arial;padding:30px}
          table{width:100%;border-collapse:collapse}
          td,th{border:1px solid #ccc;padding:8px}
        </style>
      </head>
      <body>
        <h2>Akupanchar Service</h2>
        <table>
          <tr><th>No</th><td>${row.service_number}</td></tr>
          <tr><th>Name</th><td>${row.naam} ${row.thar}</td></tr>
          <tr><th>Date</th><td>${row.miti}</td></tr>
          <tr><th>District</th><td>${row.jilla}</td></tr>
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

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/ayurveda/akupanchar-service",
      );

      setRows(res.data || []);
    } catch (error) {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* Future filtering for backend */
  const filteredRows = useMemo(() => {
    return rows.filter((item) => {
      const matchNo = registerNo
        ? String(item.mul_darta || "").includes(registerNo)
        : true;

      const matchDate = date ? String(item.miti || "").trim() === date : true;

      return matchNo && matchDate;
    });
  }, [rows, registerNo, date]);

  const start = (currentPage - 1) * pageSize;
  const paginatedRows = filteredRows.slice(start, start + pageSize);

  const nextPage = () => {
    if (start + pageSize < filteredRows.length) {
      setCurrentPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div style={styles.page}>
      {/* Top Title */}
      <div style={styles.topBar}>
        <div style={styles.heading}>अकुपुञ्चर सेवा दैनिक सूची</div>

        <div style={styles.breadcrumb}>
          <span style={styles.home}>गृहपृष्ठ</span>
          <span>/</span>
          <span>अकुपुञ्चर सेवा दैनिक सूची</span>
        </div>
      </div>

      {/* Main Card */}
      <div style={styles.card}>
        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.leftControls}>
            <span>Show</span>

            <select
              style={styles.select}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <span>entries</span>
          </div>

          <div style={styles.searchWrap}>
            <input
              style={styles.input}
              placeholder="मूल दर्ता नम्बर"
              value={registerNo}
              onChange={(e) => setRegisterNo(e.target.value)}
            />

            <input
              style={styles.dateInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button style={styles.searchBtn} type="button" onClick={fetchData}>
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th rowSpan="3" style={styles.th}>
                  मिति
                </th>
                <th rowSpan="3" style={styles.th}>
                  क्र.सं.
                </th>
                <th rowSpan="3" style={styles.th}>
                  मूल दर्ता नम्बर
                </th>

                <th colSpan="2" style={styles.th}>
                  सेवा दर्ता नम्बर
                </th>

                <th colSpan="2" style={styles.th}>
                  सेवाग्राहीको
                </th>

                <th rowSpan="3" style={styles.th}>
                  जाती
                </th>
                <th rowSpan="3" style={styles.th}>
                  लिङ्ग
                </th>
                <th rowSpan="3" style={styles.th}>
                  उमेर
                </th>

                <th colSpan="4" style={styles.th}>
                  ठेगाना
                </th>

                <th rowSpan="3" style={styles.th}>
                  सम्पर्क नम्बर
                </th>

                <th colSpan="2" style={styles.th}>
                  स्वास्थ्य अवस्था
                </th>

                <th
                  rowSpan="3"
                  style={{
                    ...styles.th,
                    minWidth: "180px",
                  }}
                >
                  कार्य
                </th>
              </tr>

              <tr>
                <th rowSpan="2" style={styles.th}>
                  मिति
                </th>
                <th rowSpan="2" style={styles.th}>
                  नम्बर
                </th>

                <th style={styles.th}>नाम</th>
                <th style={styles.th}>थर</th>

                <th style={styles.th}>जिल्ला</th>
                <th style={styles.th}>गाउँ/नगरपालिका</th>
                <th style={styles.th}>वडा नम्बर</th>
                <th style={styles.th}>टोल</th>

                <th style={styles.th}>रक्तचाप</th>
                <th style={styles.th}>प्रकृति</th>
              </tr>

              <tr>
                <th style={styles.th}></th>
                <th style={styles.th}></th>

                <th style={styles.th}></th>
                <th style={styles.th}></th>
                <th style={styles.th}></th>
                <th style={styles.th}></th>

                <th style={styles.th}>तौल</th>
                <th style={styles.th}>रोग</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="18" style={styles.noData}>
                    Loading...
                  </td>
                </tr>
              ) : paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan="18" style={styles.noData}>
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, index) => (
                  <tr key={row.id}>
                    <td style={styles.td}>{row.miti}</td>

                    <td style={styles.td}>{start + index + 1}</td>

                    <td style={styles.td}>{row.mul_darta}</td>

                    <td style={styles.td}>{row.miti}</td>

                    <td style={styles.td}>{row.service_number}</td>

                    <td style={styles.td}>{row.naam}</td>

                    <td style={styles.td}>{row.thar}</td>

                    <td style={styles.td}>{row.jaati}</td>

                    <td style={styles.td}>{row.linga}</td>

                    <td style={styles.td}>{row.umer}</td>

                    <td style={styles.td}>{row.jilla}</td>

                    <td style={styles.td}>-</td>

                    <td style={styles.td}>{row.wada_number}</td>

                    <td style={styles.td}>{row.tol}</td>

                    <td style={styles.td}>{row.sampark_number}</td>

                    <td style={styles.td}>{row.raktachap}</td>

                    <td style={styles.td}>
                      {row.prakriti}
                      <br />
                      {row.rog}
                    </td>

                    <td style={styles.td}>
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
                            fontSize: "12px",
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
                            fontSize: "12px",
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
        </div>

        {/* Pagination */}
        <div style={styles.bottomBar}>
          <button
            style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            Previous
          </button>

          <button
            style={
              start + pageSize >= filteredRows.length
                ? styles.disabledBtn
                : styles.pageBtn
            }
            disabled={start + pageSize >= filteredRows.length}
            onClick={nextPage}
          >
            Next
          </button>
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
              padding: "20px",
              width: "650px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <h3>सेवा विवरण</h3>

            {details.length === 0 ? (
              <p>No items</p>
            ) : (
              details.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px 0",
                  }}
                >
                  <strong>
                    {i + 1}. {item.sewa}
                  </strong>
                  <div>मिति: {item.miti}</div>
                  <div>जटिलता: {item.jatilata}</div>
                  <div>परीक्षण: {item.parikshan_sallah}</div>
                  <div>कैफियत: {item.kaifiyat}</div>
                </div>
              ))
            )}

            <button
              onClick={() => setShowModal(false)}
              style={{ marginTop: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
