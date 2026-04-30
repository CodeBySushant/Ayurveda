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

  /* Filter children (only links searchable, titles always stay) */
  const filteredChildren = useMemo(() => {
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

  /* ---------------- Parent With Children ---------------- */
  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => handleToggle(item.id)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition
          ${
            isOpen
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }
          ${isParentActive ? "text-blue-400" : ""}
          `}
        >
          <div className="flex items-center gap-3">
            {item.icon &&
              React.createElement(item.icon, {
                size: 18,
                className: "text-gray-400",
              })}

            <span className="text-[15px] leading-6">{item.label}</span>
          </div>

          {isOpen || searchTerm ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <div
          className={`ml-5 mt-1 border-l border-gray-700 overflow-hidden transition-all duration-300
          ${
            isOpen || searchTerm
              ? "max-h-[1200px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {filteredChildren.map((child, index) => {
            /* Section Title */
            if (child.type === "title") {
              return (
                <div
                  key={`${item.id}-title-${index}`}
                  className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase"
                >
                  {child.label}
                </div>
              );
            }

            /* Link Item */
            return (
              <Link
                key={`${item.id}-link-${index}`}
                to={child.path}
                className={`block px-4 py-2 text-[15px] leading-6 transition rounded-r-lg
                ${
                  activeLink === child.path
                    ? "bg-gray-800 text-blue-400"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------------- Single Direct Link ---------------- */
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
      ${
        activeLink === item.path
          ? "bg-gray-800 text-blue-400"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {item.icon &&
        React.createElement(item.icon, {
          size: 18,
          className: "text-gray-400",
        })}

      <span className="text-[15px] leading-6">{item.label}</span>
    </Link>
  );
};

export default SidebarItem;