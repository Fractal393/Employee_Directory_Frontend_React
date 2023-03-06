import React, { useEffect, useRef, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, IEmployee } from "./api";
import ItemList from "./ItemList";

type Props = {
  isSidebarOpen: boolean;
  employees: IEmployee[];
  setEmployees;
};

const items = [
  { text: "Item 1" },
  { text: "Item 2" },
  { text: "Item 3" },
  { text: "Item 4" },
  { text: "Item 5" },
];

var department = "",
  office = "",
  jobTitle = "";

const Sidebar: React.FC<Props> = ({
  isSidebarOpen,
  employees,
  setEmployees,
}) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [expanded, setExpanded] = useState(false);
  const [listHeight] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const fetchData = async (
    department: string,
    office: string,
    jobTitle: string
  ) => {
    const response = await createAPIEndpoint(ENDPOINTS.Employee).sidebarFilter(
      {
        department,
      },
      { office },
      { jobTitle }
    );
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchData("", "", "");
  }, []);

  const handleButtonClick = (
    department: string,
    office: string,
    jobTitle: string
  ) => {
    if (department) {
      setSearchTerm(department);
      fetchData(department, office, jobTitle);
    }
    if (office) {
      setSearchTerm(office);
      fetchData(department, office, jobTitle);
    }

    if (jobTitle) {
      setSearchTerm(jobTitle);
      fetchData(department, office, jobTitle);
    }
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-10 overflow-y-auto bg-white">
        <ul className="space-y-2">
          <li>
            <span className="flex items-center p-2 text-lg font-semibold text-gray-900 rounded-lg ">
              <span className="">Departments</span>
            </span>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleButtonClick("IT", "", "")}
              className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">IT</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              key={department}
              onClick={() => handleButtonClick("Human Resources", "", "")}
              className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">
                Human Resources
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              key={department}
              onClick={() => handleButtonClick("MD", "", "")}
              className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">MD</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              key={department}
              onClick={() => handleButtonClick("Sales", "", "")}
              className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Sales</span>
            </a>
          </li>
          <li>
            <span className="flex items-center p-2 text-lg font-semibold text-gray-900 rounded-lg ">
              <span className="">Offices</span>
            </span>
          </li>
          <li>
            <a
              href="#"
              key={office}
              onClick={() => handleButtonClick("", "Seattle", "")}
              className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Seattle</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              key={office}
              onClick={() => handleButtonClick("", "India", "")}
              className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">India</span>
            </a>
          </li>
          <li>
            <span className="flex items-center p-2 text-lg font-semibold text-gray-900 rounded-lg ">
              <span className="">Job Titles</span>
            </span>
          </li>
          <div
            className="flex flex-col overflow-hidden"
            style={{ maxHeight: expanded ? "none" : `${listHeight}px` }}
            ref={listRef}
          >
            <li>
              <a
                href="#"
                key={jobTitle}
                onClick={() =>
                  handleButtonClick("", "", "SharePoint Practice Head")
                }
                className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  SharePoint Practice Head
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                key={jobTitle}
                onClick={() => handleButtonClick("", "", "HR Head")}
                className="flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">HR Head</span>
              </a>
            </li>
          </div>
          <label
            className="cursor-pointer underline text-blue"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "View Less" : "View More..."}
          </label>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
