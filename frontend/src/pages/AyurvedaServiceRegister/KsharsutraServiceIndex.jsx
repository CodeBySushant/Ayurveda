import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const COLUMNS = [
  { key: "sn", label: "क्र.सं." },
  { key: "mulDartaNumber", label: "मुल दर्ता नम्बर", sub: "मिति" },
  { key: "sewaDartaNumber", label: "सेवा दर्ता नम्बर", sub: "मिति" },
  { key: "fullName", label: "सेवाग्राहीको पूरा नाम" },
  { key: "age", label: "उमेर", sub: "लिङ्ग" },
  {
    key: "address",
    label: "ठेगाना / जिल्ला",
    sub: "गाउँ / नगरपालिका / वडा नम्बर / टोल",
  },
  {
    key: "contact",
    label: "सम्पर्क नम्बर",
    sub: "प्रेषण भई आएको संस्था",
  },
  { key: "status", label: "स्थिति" },
  { key: "action", label: "कार्य" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function KsharsutraServiceIndex() {
  const [entries, setEntries] = useState(10);
  const [searchDate, setSearchDate] = useState("");
  const [searchMul, setSearchMul] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/ayurveda/ksharsutra-service",
      );

      setData(res.data || []);
    } catch (error) {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this record?");

    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/ayurveda/ksharsutra-service/${id}`,
      );

      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handlePrint = (row) => {
    const w = window.open("", "_blank");

    w.document.write(`
    <html>
    <head>
      <title>Print</title>
      <style>
        body{
          font-family:Arial;
          padding:25px;
        }
        table{
          width:100%;
          border-collapse:collapse;
        }
        td,th{
          border:1px solid #ccc;
          padding:8px;
        }
      </style>
    </head>
    <body>
      <h2>Ksharsutra Record</h2>

      <table>
        <tr><th>Service No</th><td>${row.service_number}</td></tr>
        <tr><th>Name</th><td>${row.full_name}</td></tr>
        <tr><th>Date</th><td>${row.miti}</td></tr>
        <tr><th>Contact</th><td>${row.sampark_num}</td></tr>
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

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const mulMatch = searchMul.trim()
        ? String(row.mool_darta || "")
            .toLowerCase()
            .includes(searchMul.toLowerCase())
        : true;

      const dateMatch = searchDate.trim()
        ? String(row.miti || "").includes(searchDate.trim())
        : true;

      return mulMatch && dateMatch;
    });
  }, [data, searchMul, searchDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const paged = filtered.slice(
    (currentPage - 1) * entries,
    currentPage * entries,
  );

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <span style={styles.pageTitle}>क्षारसुत्र सेवा दैनिक सूची</span>
        <nav style={styles.breadcrumb}>
          <a href="#" style={styles.breadcrumbLink}>
            गृहपृष्ठ
          </a>
          <span style={styles.breadcrumbSep}>/</span>
          <span style={styles.breadcrumbCurrent}>
            क्षारसुत्र सेवा दैनिक सूची
          </span>
        </nav>
      </div>

      {/* Table Card */}
      <div style={styles.card}>
        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.showEntries}>
            <span style={styles.controlLabel}>Show</span>
            <select
              style={styles.select}
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span style={styles.controlLabel}>entries</span>
          </div>

          <div style={styles.searchRow}>
            <input
              style={styles.searchInput}
              placeholder="मूल दर्ता नम्बर"
              value={searchMul}
              onChange={(e) => {
                setSearchMul(e.target.value);
                setCurrentPage(1);
              }}
            />
            <input
              style={styles.searchInput}
              placeholder="मिति (DD/MM/YYYY)"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              style={styles.searchBtn}
              onClick={fetchData}
              type="button"
              title="खोज्नुहोस्"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    style={
                      col.key === "action"
                        ? {
                            ...styles.th,
                            ...styles.thSticky,
                            minWidth: "180px",
                          }
                        : styles.th
                    }
                  >
                    <div style={styles.thInner}>
                      <span>{col.label}</span>
                      {col.sub && <span style={styles.thSub}>{col.sub}</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={COLUMNS.length} style={styles.noData}>
                    Loading...
                  </td>
                </tr>
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} style={styles.noData}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <tr
                    key={row.id}
                    style={i % 2 === 0 ? styles.trEven : styles.trOdd}
                  >
                    <td style={styles.td}>
                      {(currentPage - 1) * entries + i + 1}
                    </td>

                    <td style={styles.td}>
                      <div>{row.mool_darta}</div>
                      <div style={styles.subText}>{row.miti}</div>
                    </td>

                    <td style={styles.td}>
                      <div>{row.service_number}</div>
                      <div style={styles.subText}>{row.miti}</div>
                    </td>

                    <td style={styles.td}>{row.full_name}</td>

                    <td style={styles.td}>
                      <div>{row.umer}</div>
                      <div style={styles.subText}>{row.linga}</div>
                    </td>

                    <td style={styles.td}>
                      <div>{row.jilla}</div>
                      <div style={styles.subText}>
                        वडा {row.wada}, {row.tol}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div>{row.sampark_num}</div>
                      <div style={styles.subText}>-</div>
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          ...styles.badgeActive,
                        }}
                      >
                        सक्रिय
                      </span>
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        ...styles.tdSticky,
                        minWidth: "180px",
                      }}
                    >
                      <div style={styles.actionWrap}>
                        <button
                          type="button"
                          style={styles.btnPrint}
                          onClick={() => handlePrint(row)}
                        >
                          Print
                        </button>

                        <button
                          type="button"
                          style={styles.btnDelete}
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

        {/* Pagination */}
        <div style={styles.pagination}>
          <span style={styles.pageInfo}>
            {filtered.length === 0
              ? "Showing 0 to 0 of 0 entries"
              : `Showing ${(currentPage - 1) * entries + 1} to ${Math.min(currentPage * entries, filtered.length)} of ${filtered.length} entries`}
          </span>
          <div style={styles.pageButtons}>
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === 1 ? styles.pageBtnDisabled : {}),
              }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
              )
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} style={styles.ellipsis}>
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    style={{
                      ...styles.pageBtn,
                      ...(p === currentPage ? styles.pageBtnActive : {}),
                    }}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ),
              )}
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === totalPages ? styles.pageBtnDisabled : {}),
              }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Noto Sans Devanagari', 'Mukta', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    padding: "0",
  },
  pageHeader: {
    background: "#e8eaf0",
    borderBottom: "1px solid #d0d4de",
    padding: "12px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2d3748",
    letterSpacing: "0.01em",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
  },
  breadcrumbLink: {
    color: "#4a6cf7",
    textDecoration: "none",
    fontWeight: "500",
  },
  breadcrumbSep: {
    color: "#a0aec0",
  },
  breadcrumbCurrent: {
    color: "#718096",
  },
  card: {
    background: "#fff",
    margin: "20px 24px",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    borderBottom: "1px solid #edf2f7",
    flexWrap: "wrap",
    gap: "10px",
  },
  showEntries: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  controlLabel: {
    fontSize: "13px",
    color: "#4a5568",
  },
  select: {
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "13px",
    color: "#2d3748",
    background: "#fff",
    cursor: "pointer",
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  searchInput: {
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    padding: "6px 10px",
    fontSize: "13px",
    color: "#2d3748",
    outline: "none",
    width: "160px",
  },
  searchBtn: {
    background: "#4a6cf7",
    border: "none",
    borderRadius: "4px",
    padding: "7px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    background: "#eef1f8",
    color: "#3a4a6b",
    fontWeight: "700",
    padding: "10px 12px",
    textAlign: "center",
    borderBottom: "2px solid #d0d8ee",
    borderRight: "1px solid #dde3f0",
    whiteSpace: "nowrap",
    fontSize: "12.5px",
  },
  thInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  thSub: {
    fontSize: "11px",
    color: "#6b7fa8",
    fontWeight: "500",
  },
  td: {
    padding: "9px 12px",
    borderBottom: "1px solid #edf2f7",
    borderRight: "1px solid #edf2f7",
    color: "#2d3748",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "13px",
  },
  subText: {
    fontSize: "11px",
    color: "#718096",
    marginTop: "2px",
  },
  trEven: {
    background: "#fff",
  },
  trOdd: {
    background: "#f9fafc",
  },
  noData: {
    textAlign: "center",
    padding: "32px",
    color: "#a0aec0",
    fontSize: "14px",
    background: "#fafbfc",
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  badgeActive: {
    background: "#c6f6d5",
    color: "#276749",
  },
  badgeInactive: {
    background: "#fed7d7",
    color: "#9b2c2c",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    borderTop: "1px solid #edf2f7",
    flexWrap: "wrap",
    gap: "10px",
  },
  pageInfo: {
    fontSize: "13px",
    color: "#718096",
  },
  pageButtons: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  pageBtn: {
    border: "1px solid #cbd5e0",
    background: "#fff",
    color: "#4a5568",
    borderRadius: "4px",
    padding: "5px 12px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s",
  },
  pageBtnActive: {
    background: "#4a6cf7",
    color: "#fff",
    borderColor: "#4a6cf7",
    fontWeight: "600",
  },
  pageBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  ellipsis: {
    padding: "5px 4px",
    color: "#a0aec0",
    fontSize: "13px",
  },
  thSticky: {
    position: "sticky",
    right: 0,
    zIndex: 3,
    background: "#eef1f8",
  },

  tdSticky: {
    position: "sticky",
    right: 0,
    zIndex: 2,
    background: "#fff",
  },

  actionWrap: {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  btnPrint: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },

  btnDelete: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
};
