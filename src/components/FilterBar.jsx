import React from "react";

const botClasses = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

function FilterBar({ selectedClasses, setSelectedClasses }) {
  const toggleClass = (botClass) => {
    if (selectedClasses.includes(botClass)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== botClass));
    } else {
      setSelectedClasses([...selectedClasses, botClass]);
    }
  };

  return (
    <div className="filter-bar">
      <p>Filter by Class:</p>
      {botClasses.map((botClass) => (
        <label key={botClass}>
          <input
            type="checkbox"
            value={botClass}
            checked={selectedClasses.includes(botClass)}
            onChange={() => toggleClass(botClass)}
          />
          {botClass}
        </label>
      ))}
    </div>
  );
}

export default FilterBar;
