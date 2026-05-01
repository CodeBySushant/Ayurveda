// src/pages/AyurvedaServiceRegister/SurgeryServiceRegisterDailyList.jsx

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef0f6",
    padding: "22px",
    fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
    color: "#495057",
  },

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

  card: {
    background: "#fff",
    border: "1px solid #e0e3ea",
  },

  controls: {
    padding: "18px 14px 8px",
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
    background: "#fff",
    outline: "none",
    fontSize: "14px",
  },

  searchWrap: {
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "130px",
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
    whiteSpace: "nowrap",
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
    opacity: 0.6,
    cursor: "not-allowed",
    fontSize: "14px",
    color: "#5c6270",
  },
};

/* Future backend rows */
const initialRows = [];

export default function SurgeryServiceRegisterDailyList() {
  const [rows] = useState(initialRows);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [masterNo, setMasterNo] = useState("");
  const [date, setDate] = useState("18/01/2083");

  const filteredRows = useMemo(() => {
    return rows.filter((item) => {
      const matchNo = masterNo
        ? item.masterRegisterNo?.includes(masterNo)
        : true;

      const matchDate = date ? item.date === date : true;

      return matchNo && matchDate;
    });
  }, [rows, masterNo, date]);

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
      {/* Title */}
      <div style={styles.topBar}>
        <div style={styles.heading}>शल्य चिकित्सा सेवा दैनिक सूची</div>

        <div style={styles.breadcrumb}>
          <span style={styles.home}>गृहपृष्ठ</span>
          <span>/</span>
          <span>शल्य चिकित्सा सेवा दैनिक सूची</span>
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
              value={masterNo}
              onChange={(e) => setMasterNo(e.target.value)}
            />

            <input
              style={styles.dateInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button style={styles.searchBtn}>
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th rowSpan="3" style={styles.th}>कार्य</th>
                <th rowSpan="3" style={styles.th}>मिति</th>
                <th rowSpan="3" style={styles.th}>क्र.सं.</th>
                <th rowSpan="3" style={styles.th}>मूल दर्ता नम्बर</th>

                <th colSpan="2" style={styles.th}>सेवा दर्ता नम्बर</th>

                <th colSpan="2" style={styles.th}>सेवाग्राहीको</th>

                <th rowSpan="3" style={styles.th}>जाती</th>

                <th colSpan="2" style={styles.th}>लिङ्ग</th>

                <th colSpan="4" style={styles.th}>ठेगाना</th>

                <th rowSpan="3" style={styles.th}>सम्पर्क नम्बर</th>

                <th colSpan="2" style={styles.th}>स्वास्थ्य अवस्था</th>
              </tr>

              <tr>
                <th rowSpan="2" style={styles.th}>मिति</th>
                <th rowSpan="2" style={styles.th}>नम्बर</th>

                <th style={styles.th}>नाम</th>
                <th style={styles.th}>थर</th>

                <th rowSpan="2" style={styles.th}>उमेर</th>
                <th rowSpan="2" style={styles.th}></th>

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
                <th style={styles.th}>रोग परीक्षण</th>
              </tr>
            </thead>

            <tbody>
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan="17" style={styles.noData}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, index) => (
                  <tr key={index}>
                    <td style={styles.td}>Edit</td>
                    <td style={styles.td}>{row.date}</td>
                    <td style={styles.td}>{start + index + 1}</td>
                    <td style={styles.td}>{row.masterRegisterNo}</td>
                    <td style={styles.td}>{row.serviceDate}</td>
                    <td style={styles.td}>{row.serviceNo}</td>
                    <td style={styles.td}>{row.firstName}</td>
                    <td style={styles.td}>{row.lastName}</td>
                    <td style={styles.td}>{row.caste}</td>
                    <td style={styles.td}>{row.gender}</td>
                    <td style={styles.td}>{row.age}</td>
                    <td style={styles.td}>{row.district}</td>
                    <td style={styles.td}>{row.municipality}</td>
                    <td style={styles.td}>{row.ward}</td>
                    <td style={styles.td}>{row.tole}</td>
                    <td style={styles.td}>{row.contact}</td>
                    <td style={styles.td}>{row.bp}</td>
                    <td style={styles.td}>{row.disease}</td>
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
    </div>
  );
}