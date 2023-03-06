import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, IEmployee } from "./api";

type props = {
  employees: IEmployee[];
  setEmployees;
};

export const AlphabetFilter: React.FC<props> = ({
  employees,
  setEmployees,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async (filter: string) => {
    const response = await createAPIEndpoint(ENDPOINTS.Employees).getLetter({
      filter,
    });
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleButtonClick = (filter: string) => {
    setSearchTerm(filter);
    fetchData(filter);
  };

  return (
    <div className="flex flex-wrap justify-center">
      <label
        onClick={() => fetchData("")}
        className="btn btn-outline btn-square text-white bg-blue rounded-none flex-shrink-0 w-11 mb-2 md:mb-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {Array.from(alphabet).map((letter) => (
        <label
          key={letter}
          onClick={() => handleButtonClick(letter)}
          className="btn btn-outline btn-square text-white bg-blue rounded-none flex-shrink-0 w-[2.7rem] mb-2 md:mb-0"
        >
          {letter}
        </label>
      ))}
    </div>
  );
};
