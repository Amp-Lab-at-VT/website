/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export default function SearchBar({ setExternalSearchTerm, setExternalFilterType } : SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");

    const handleInputChange = (event : any) => {
        setSearchTerm(event.target.value);
        if (setExternalSearchTerm != null)
            setExternalSearchTerm(event.target.value);
    };

    const handleFilterChange = (event : any) => {
        setFilterType(event.target.value);
        if (setExternalFilterType != null)
            setExternalFilterType(event.target.value);
    };

    const handleClear = (event : any) => {
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
            <button
                onClick={handleClear}
                style={{ marginLeft: "10px", padding: "10px" }}
            >
                Clear
            </button>
        </div>
    );
}

type SearchBarProps = {
    setExternalSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setExternalFilterType: React.Dispatch<React.SetStateAction<string>>;
};
