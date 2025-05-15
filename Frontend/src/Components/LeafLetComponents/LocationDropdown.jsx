import React from "react";

export const LocationDropdown = ({
  locations,
  onSelect,
  isDark,
  textColor,
  mainBorder,
  containerBg,
}) => {
  const categoryOrder = ["landmarks", "buildings", "barangays", "schools"];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        maxHeight: "300px",
        overflowY: "auto",
        backgroundColor: containerBg || "#fff",
        border: `1px solid ${mainBorder}`,
        borderRadius: "4px",
        zIndex: 10,
        marginTop: "0.25rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {categoryOrder.map((category) => {
        const items = locations[category];
        if (!items) return null;
        return (
          <div key={category}>
            <div
              style={{ padding: "0.5rem", fontWeight: "bold", color: mainBorder }}
            >
              {category}
            </div>
            {Object.keys(items).map((item) => (
              <div
                key={`${category}-${item}`}
                style={{
                  padding: "0.5rem",
                  cursor: "pointer",
                  color: textColor,
                  borderBottom: `1px solid ${isDark ? "#333" : "#eee"}`,
                }}
                onClick={() => onSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
