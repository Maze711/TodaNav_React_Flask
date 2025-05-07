import React, { useState } from "react";
import { LocationDropdown } from "./LocationDropdown";

export const LocationSearchInput = ({
  value,
  onChange,
  placeholder,
  locations,
  onSelect,
  isDark,
  textColor,
  mainBorder,
  containerBg
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter the locations based on the input value.
  const getFilteredLocations = () => {
    let filtered = {};
    Object.entries(locations).forEach(([category, items]) => {
      const filteredItems = Object.keys(items).filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[category] = {};
        filteredItems.forEach(item => {
          filtered[category][item] = items[item];
        });
      }
    });
    return filtered;
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: `1px solid ${mainBorder}`,
          fontSize: "1rem",
          backgroundColor: containerBg,
          color: textColor,
        }}
      />
      {showDropdown && (
        <LocationDropdown
          locations={getFilteredLocations()}
          onSelect={onSelect}
          isDark={isDark}
          textColor={textColor}
          mainBorder={mainBorder}
          containerBg={containerBg}
        />
      )}
    </div>
  );
};