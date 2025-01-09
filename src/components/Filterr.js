import React from "react";

const Filterr = ({ filterState, setFilterState }) => {
  return (
    <div className="Filter">
      <button
        className={filterState === "All" ? "active Filter-1" : "Filter-1"}
        onClick={() => setFilterState("All")}
      >
        All
      </button>
      <button
        className={filterState === "Active" ? "active Filter-1" : "Filter-1"}
        onClick={() => setFilterState("Active")}
      >
        Active
      </button>
      <button
        className={filterState === "Completed" ? "active Filter-1" : "Filter-1"}
        onClick={() => setFilterState("Completed")}
      >
        Completed
      </button>
      <button
        className={filterState === "Log" ? "active Filter-1" : "Filter-1"}
        onClick={() => setFilterState("Log")}
      >
        Log
      </button>
    </div>
  );
};

export default Filterr;
