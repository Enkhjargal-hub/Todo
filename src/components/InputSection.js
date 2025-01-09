import React from "react";

const InputSection = ({ inputValue, handleInputChange, handleAddButton, error }) => {
  return (
    <div className="Input-Section">
      <input
        placeholder="Add a new task..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAddButton();
          }
        }}
      />
      <button className="Add" onClick={handleAddButton}>
        Add
      </button>
      {error && <div className="Error">{error}</div>}
    </div>
  );
};

export default InputSection;
