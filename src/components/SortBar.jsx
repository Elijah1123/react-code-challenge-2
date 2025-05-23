import React from "react";

function SortBar({ setSortBy }) {
  return (
    <div className="sort-bar">
      <label>Sort by: </label>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">None</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  );
}

export default SortBar;
