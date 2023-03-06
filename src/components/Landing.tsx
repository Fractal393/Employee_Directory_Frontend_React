import React, { useState } from "react";
import { IEmployee } from "./api";
import LetterBoxes from "./LetterBoxes";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";
type Props = {};

const Landing: React.FC<Props> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const [employees, setEmployees] = useState<IEmployee[]>([]);
  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        employees={employees}
        setEmployees={setEmployees}
      />
      <div className="p-10 sm:ml-64">
        <LetterBoxes employees={employees} setEmployees={setEmployees} />
      </div>
    </>
  );
};

export default Landing;
