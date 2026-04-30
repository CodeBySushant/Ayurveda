// src/components/SidebarItem.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const SidebarItem = ({
  item,
  openMenu,
  handleToggle,
  searchTerm,
  activeLink,
}) => {
  const isOpen = openMenu === item.id;

  const filteredChildren = useMemo(() => {
    if (!item.children) return [];
    if (!searchTerm) return item.children;

    const term = searchTerm.toLowerCase();
    return item.children.filter((child) => {
      if (child.type === "title") return true;
      return child.label.toLowerCase().includes(term);
    });
  }, [item.children, searchTerm]);

  const hasChildren = item.children && item.children.length > 0;

  const hasVisibleLinks = filteredChildren.some(
    (child) => child.type === "link"
  );

  const isVisible = !hasChildren || searchTerm === "" || hasVisibleLinks;

  if (!isVisible) return null;

  const isParentActive =
    hasChildren &&
    item.children.some(
      (child) => child.type === "link" && activeLink === child.path
    );

  const shouldBeOpen = isOpen || (searchTerm !== "" && hasVisibleLinks);

  /* ---------------- Parent With Children ---------------- */
  if (hasChildren) {
    return (
      <div style={{ marginBottom: "2px" }}>
        {/* Parent Button */}
        <button
          onClick={() => handleToggle(item.id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: shouldBeOpen
              ? "rgba(255,255,255,0.12)"
              : "transparent",
            color: isParentActive ? "#93c5fd" : "#e5e7eb",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = shouldBeOpen
              ? "rgba(255,255,255,0.12)"
              : "transparent")
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {item.icon &&
              React.createElement(item.icon, {
                size: 17,
                style: { color: "#9ca3af", flexShrink: 0 },
              })}
            <span style={{ fontSize: "14px", lineHeight: "1.5", textAlign: "left" }}>
              {item.label}
            </span>
          </div>

          {shouldBeOpen ? (
            <ChevronDown size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
          ) : (
            <ChevronRight size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
          )}
        </button>

        {/* Children — only render when open */}
        {shouldBeOpen && (
          <div
            style={{
              marginLeft: "14px",
              paddingLeft: "12px",
              borderLeft: "1px solid rgba(255,255,255,0.15)",
              marginTop: "2px",
              marginBottom: "4px",
            }}
          >
            {filteredChildren.map((child, index) => {
              /* Section Title */
              if (child.type === "title") {
                return (
                  <div
                    key={`${item.id}-title-${index}`}
                    style={{
                      padding: "10px 10px 4px",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {child.label}
                  </div>
                );
              }

              const isActive = activeLink === child.path;

              /* Link Item */
              return (
                <Link
                  key={`${item.id}-link-${index}`}
                  to={child.path}
                  style={{
                    display: "block",
                    padding: "8px 12px",
                    fontSize: "13.5px",
                    lineHeight: "1.5",
                    borderRadius: "0 8px 8px 0",
                    textDecoration: "none",
                    color: isActive ? "#93c5fd" : "#d1d5db",
                    background: isActive
                      ? "rgba(147,197,253,0.1)"
                      : "transparent",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#d1d5db";
                    }
                  }}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ---------------- Single Direct Link ---------------- */
  const isActive = activeLink === item.path;

  return (
    <Link
      to={item.path}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "8px",
        textDecoration: "none",
        color: isActive ? "#93c5fd" : "#e5e7eb",
        background: isActive ? "rgba(147,197,253,0.1)" : "transparent",
        transition: "background 0.15s, color 0.15s",
        marginBottom: "2px",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {item.icon &&
        React.createElement(item.icon, {
          size: 17,
          style: { color: "#9ca3af", flexShrink: 0 },
        })}
      <span style={{ fontSize: "14px", lineHeight: "1.5" }}>{item.label}</span>
    </Link>
  );
};

export default SidebarItem;