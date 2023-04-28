import React, { useState } from "react";

const SearchBar = ({setExternalSearchTerm, setExternalFilterType}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (setExternalSearchTerm != null)
        setExternalSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    if (setExternalFilterType != null)
        setExternalFilterType(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilterType("");
    if (setExternalSearchTerm != null)
      setExternalSearchTerm(event.target.value);
    if (setExternalFilterType != null)
      setExternalFilterType(event.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ width: "70%", padding: "10px" }}
      />
      <select
        value={filterType}
        onChange={handleFilterChange}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        <option value="">Search By</option>
        <option value="option1">Mentor</option>
        <option value="option2">Project Name</option>
      </select>
      <button onClick={handleClear} style={{ marginLeft: "10px", padding: "10px" }}>Clear</button>
    </div>
  );
};

export default SearchBar;
