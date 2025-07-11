import React from "react";

function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's in your fridge?"
        className="px-3 py-2 rounded-l-lg border border-fridgeText text-fridgeText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fridgeText w-[180px] text-sm"
      />
      <button
        type="button"
        onClick={onSearch}
        className="bg-white text-fridgeText font-semibold px-4 py-2 border border-l-0 border-fridgeText rounded-r-lg hover:bg-gray-100 transition-colors text-sm"
      >
        Let’s take a look
      </button>
    </div>
  );
}

export default SearchBar;
