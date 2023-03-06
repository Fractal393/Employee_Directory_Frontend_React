import React, { useState } from "react";
import { createAPIEndpoint, ENDPOINTS, IEmployee } from "./api";

type Props = {};

const EmployeeSearch: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState("");
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const handleSearch = async () => {
    const response = await createAPIEndpoint(ENDPOINTS.Employees).getFilter({
      params: { department: searchText },
    });
    setEmployees(response.data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div>
        <div className="flex">
          <label htmlFor="search-query" className="text-black/75 pr-2">
            Search
          </label>
          <div className="relative">
            <input
              id="search-query"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Any Keyword"
              className="pl-12 pr-4 py-2 w-full rounded-none border border-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSearch;
