import React, { useEffect, useState } from "react";
import { AlphabetFilter } from "./AlphabetFilter";
import { createAPIEndpoint, ENDPOINTS, IEmployee } from "./Api";
import Cards from "./Cards";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";
type props = {
  employees: IEmployee[];
  setEmployees;
};

const LetterBoxes: React.FC<props> = ({ employees, setEmployees }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [newEmployee, setNewEmployee] = useState<IEmployee>({
    employeeId: 0,
    firstName: "",
    lastName: "",
    preferredName: 0,
    department: "",
    jobTitle: "",
    office: "",
    phoneNumber: "",
    skypeID: "",
    email: "",
    imagePath: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result?.toString() || "";
        setNewEmployee({
          ...newEmployee,
          imagePath: base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setNewEmployee({
      ...newEmployee,
      [name]: value,
      preferredName: parseInt(value),
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const response = await createAPIEndpoint(ENDPOINTS.Employees).post(
      newEmployee
    );
    setNewEmployee(response.data);
    setEmployees([...employees, response.data]);
  };

  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState("firstname");

  const handleSearch = async () => {
    const response = await createAPIEndpoint(ENDPOINTS.Employees).getFilter({
      params: { searchText, searchBy },
    });
    setEmployees(response.data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    /*     console.log("Employees array changed:", employees); */
  }, [employees]);

  return (
    <>
      <div className="mt-20">
        <AlphabetFilter employees={employees} setEmployees={setEmployees} />
        <div className="grid lg:grid-cols-4 gap-1 pt-8 sm:grid-cols-1 md:grid-cols-2 justify-around items-center  ">
          {/* Search Bar */}
          <div className="flex items-center">
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

          <div className="sm:text-center md:text-center lg:text-left text-center py-3 sm:py-3 md:py-3 lg:py-0">
            <label
              className="btn btn-outline text-white bg-green rounded-none"
              onClick={(s) => setSearchText("")}
            >
              Clear
            </label>
          </div>
          <div className="flex pb-3 sm:pb-3 md:pb-3 lg:pb-0">
            <label className="text-black/75 label w-24">Filter By</label>
            <select
              className="bg-white text-black select w-44 font-light rounded-none select-bordered focus:outline-none border-[#8D8D8D]"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="firstname">First Name</option>
              <option value="department">Department</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div className="flex-1 text-center sm:text-center md:text-center lg:text-right">
            <label
              htmlFor="add-user-modal"
              className=" btn btn-outline text-white bg-blue rounded-none "
            >
              Add Employee
            </label>
          </div>

          {/* Put this part before </body> tag */}

          <input type="checkbox" id="add-user-modal" className="modal-toggle" />
          <div className="modal rounded-none">
            <div className="modal-box bg-white text-black w-full max-w-4xl h-full max-h-[43rem] p-12 rounded-none">
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <label className="text-black/75 label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={newEmployee.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="bg-white text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                  />
                </div>
                <div className="">
                  <label className="text-black/75 label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newEmployee.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="bg-white text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-black/75 label">Preferred Name</label>
                  <select
                    className="bg-white text-black select w-full font-light rounded-none select-bordered focus:outline-none border-[#8D8D8D] text-base"
                    name="Preferred Name"
                    value={newEmployee.preferredName}
                    onChange={handleSelectChange}
                  >
                    {" "}
                    <option value={0}>{newEmployee.firstName}</option>
                    <option value={1}>{newEmployee.lastName}</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-black/75 label">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                    className="file-input w-full bg-white rounded-none file:bg-blue file:border-0 file:text-white file-input-bordered font-light text-black border-[#8D8D8D] text-base focus:outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-black/75 label">Email ID</label>
                  <input
                    type="email"
                    placeholder="username@example.com"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    className="bg-white text-black input w-full font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-black/75 label">Job Title</label>
                  <input
                    type="text"
                    placeholder="Software Engineer"
                    name="jobTitle"
                    value={newEmployee.jobTitle}
                    onChange={handleInputChange}
                    className="bg-white text-black input w-full font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-black/75 label">Office</label>
                  <select
                    placeholder="India / Seattle"
                    name="office"
                    value={newEmployee.office}
                    onChange={handleSelectChange}
                    className="bg-white text-black select w-full font-light rounded-none select-bordered focus:outline-none border-[#8D8D8D] text-base"
                  >
                    <option value="Seattle">Seattle</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="">
                  <label className="text-black/75 label">Department</label>
                  <select
                    placeholder="IT"
                    name="department"
                    value={newEmployee.department}
                    onChange={handleSelectChange}
                    className="bg-white text-black select w-full font-light rounded-none select-bordered focus:outline-none border-[#8D8D8D] text-base"
                  >
                    <option value="IT Department">IT Department</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="MD">MD</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div className="">
                  <label className="text-black/75 label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="555-555-5555"
                    name="phoneNumber"
                    value={newEmployee.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-white text-black input w-full font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-black/75 label">Skype ID</label>
                  <input
                    type="text"
                    placeholder="john.doe"
                    name="skypeID"
                    value={newEmployee.skypeID}
                    onChange={handleInputChange}
                    className="bg-white text-black input w-full font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="modal-action justify-center">
                <label
                  htmlFor="add-user-modal"
                  className="btn btn-outline text-blue w-56 bg-white"
                >
                  Cancel
                </label>
                <label
                  htmlFor="add-user-modal"
                  className="btn btn-outline text-white w-56 bg-blue"
                  onClick={handleSubmit}
                >
                  Add Employee
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-black">
          <b>Note:</b> Please use the advanced filter options for result
        </div>
        <Cards employees={employees} setEmployees={setEmployees} />
        {/* <Api /> */}
        {/* <MyComponent  /> */}
      </div>
    </>
  );
};

export default LetterBoxes;
