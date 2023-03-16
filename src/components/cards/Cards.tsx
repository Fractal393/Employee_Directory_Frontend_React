import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createAPIEndpoint, ENDPOINTS, IEmployee } from "../Api";
import "./cards.css";

type Props = {
  employees: IEmployee[];
  setEmployees;
};

const Cards: React.FC<Props> = ({ employees, setEmployees }) => {
  //STATES
  const [deletedEmployeeId, setDeletedEmployeeId] = useState<number | null>(
    null
  );
  /*  const [isEditable, setIsEditable] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const setEditable = (editable: boolean) => {
    if (containerRef.current) {
      containerRef.current.contentEditable = editable.toString();
    }
  }; */

  useEffect(() => {
    const fetchData = async () => {
      const response = await createAPIEndpoint(ENDPOINTS.Employees).get();
      setEmployees(response.data);
    };

    if (deletedEmployeeId !== null) {
      createAPIEndpoint(ENDPOINTS.Employees).delete(deletedEmployeeId);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((e) => e.employeeId !== deletedEmployeeId)
      );
      setDeletedEmployeeId(null);
    }
    /*     setEditable(isEditable);
     */ fetchData();
  }, [deletedEmployeeId /* isEditable */]);

  const handleUpdate = async (id: number, updatedEmployee: IEmployee) => {
    await createAPIEndpoint(ENDPOINTS.Employees).put(id, updatedEmployee);
  };

  const handleInputChange = async (
    id: number,
    field: keyof IEmployee,
    value: string | File
  ) => {
    const updatedEmployees = employees.map(async (employee) => {
      if (employee.employeeId === id) {
        let newValue;
        if (field === "imagePath" && value instanceof File) {
          // Convert new image to base64 string
          const reader = new FileReader();
          reader.readAsDataURL(value);
          newValue = await new Promise<string>((resolve) => {
            reader.onloadend = () => {
              const base64String = reader.result as string;
              resolve(base64String);
            };
          });
        } else {
          newValue =
            field === "preferredName" ? parseInt(value as string) : value;
        }
        return {
          ...employee,
          [field]: newValue,
        };
      }
      return employee;
    });
    const updatedEmployeesResolved = await Promise.all(updatedEmployees);
    setEmployees(updatedEmployeesResolved);
  };

  const handleSaveClick = async (id: number) => {
    const updatedEmployee = employees.find(
      (employee) => employee.employeeId === id
    );
    if (updatedEmployee) {
      await handleUpdate(id, updatedEmployee);
      const updatedEmployees = employees.map((employee) => {
        if (employee.employeeId === id) {
          return { ...employee, isEditing: false };
        }
        return employee;
      });
      setEmployees(updatedEmployees);
    }
  };
  const handleEditClick = (id: number) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.employeeId === id) {
        return { ...employee, isEditing: true };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div className="my-12 mx-auto px-4 md:px-12 border border-gray-500">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {employees.map((employee) => (
          <div
            className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:w-1/3 custom-screen-1 custom-screen-2"
            /* id="container"
            ref={containerRef} */
            key={employee.employeeId}
          >
            <a
              href={`#${employee.employeeId}`}
              className="flex flex-col text-black items-center bg-[#e9e8e8] border border-gray-200 rounded-none shadow md:flex-row md:max-w-xs hover:bg-gray-100"
            >
              <img
                className="object-cover w-full h-full shrink sm:md:h-auto md:w-32 md:h-32 p-4"
                src={employee.imagePath}
                alt=""
              />
              <div className="flex flex-col justify-between leading-normal text-center sm:text-center md:text-left ">
                <h5 className="text-lg font-bold tracking-tight">
                  {employee.firstName} {employee.lastName}
                </h5>
                <p className="lg:md:text-xs sm:text-sm font-normal  ">
                  {employee.jobTitle}
                </p>
                <p className="lg:text-xs md:text-xs sm:text-sm  font-normal">
                  {employee.department}
                </p>
                <div className="flex justify-center sm:justify-center md:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2 lg:w-3 lg:h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 4.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 4.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2 lg:w-3 lg:h-3"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 4.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 4.908z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2 lg:w-3 lg:h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.337 21.718a6.707 4.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 4.721 0 01-4.246.997z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2 lg:w-3 lg:h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2 lg:w-3 lg:h-3"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>
            </a>

            <div className="modal rounded-none" id={`${employee.employeeId}`}>
              <div className=" w-11/12 md:w-1/2 lg:w-1/3 bg-white shadow-lg overflow-hidden my-4">
                <div className="pt-4 px-6 flex justify-between">
                  <img
                    className=" h-28 pb-3"
                    src={employee.imagePath}
                    alt="avatar"
                  />
                  <a className="text-red-600" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
                {employee.isEditing ? (
                  <div className="py-2 px-6 grid grid-cols-3 gap-1">
                    <label className="text-black/75">Profile Picture:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleInputChange(
                            employee.employeeId,
                            "imagePath",
                            file
                          );
                        }
                      }}
                      className="file-input w-full bg-white rounded-none file:bg-blue file:border-0 file:text-white file-input-bordered font-light text-black border-[#8D8D8D] text-base focus:outline-none col-span-2"
                    />
                    <label className="text-black/75">First Name:</label>
                    <input
                      type="text"
                      value={employee.firstName}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "firstName",
                          e.target.value
                        )
                      }
                    />
                    <label className="text-black/75">Last Name:</label>
                    <input
                      type="text"
                      value={employee.lastName}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "lastName",
                          e.target.value
                        )
                      }
                    />
                    <label className="text-black/75">Preferred Name:</label>
                    <select
                      value={employee?.preferredName}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee?.employeeId,
                          "preferredName",
                          e.target.value
                        )
                      }
                    >
                      <option value={0}>{employee?.firstName}</option>
                      <option value={1}>{employee?.lastName}</option>
                    </select>
                    <label className="text-black/75">Job Title:</label>
                    <input
                      type="text"
                      value={employee.jobTitle}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "jobTitle",
                          e.target.value
                        )
                      }
                    />
                    <label className="text-black/75">Department:</label>
                    <select
                      value={employee.department}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "department",
                          e.target.value
                        )
                      }
                    >
                      <option value="IT Department">IT Department</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="MD">MD</option>
                      <option value="Sales">Sales</option>
                    </select>
                    <label className="text-black/75">Office:</label>
                    <select
                      value={employee.office}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "office",
                          e.target.value
                        )
                      }
                    >
                      {" "}
                      <option value="Seattle">Seattle</option>
                      <option value="India">India</option>
                    </select>
                    <label className="text-black/75">Email:</label>
                    <input
                      type="text"
                      value={employee.email}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "email",
                          e.target.value
                        )
                      }
                    />
                    <label className="text-black/75">Phone Number:</label>
                    <input
                      type="text"
                      value={employee.phoneNumber}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "phoneNumber",
                          e.target.value
                        )
                      }
                    />
                    <label className="text-black/75">Skype ID:</label>
                    <input
                      type="text"
                      value={employee.skypeID}
                      className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                      onChange={(e) =>
                        handleInputChange(
                          employee.employeeId,
                          "skypeID",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ) : (
                  <div className="py-4 px-6">
                    <h1 className="text-2xl font-semibold text-gray-800 pb-2">
                      {employee.firstName} {employee.lastName}
                    </h1>
                    <p className="text-lg text-gray-700">
                      {" "}
                      {employee.jobTitle}
                    </p>
                    <p className="text-lg text-gray-700 pb-3">
                      {employee.department}
                    </p>
                    <hr></hr>
                    <p className="text-lg text-gray-700 pt-3">
                      <span className="font-semibold">Office</span>:{" "}
                      {employee.office}
                    </p>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">Email</span>:{" "}
                      {employee.email}
                    </p>
                    <p className="text-lg text-gray-700">
                      {" "}
                      <span className="font-semibold">Phone Number</span>:{" "}
                      {employee.phoneNumber}
                    </p>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">Skype ID</span>:{" "}
                      {employee.skypeID}
                    </p>
                  </div>
                )}
                {employee.isEditing ? (
                  <div className="flex pb-3 justify-around">
                    <label
                      className="btn btn-outline text-white bg-blue rounded-none"
                      onClick={() => handleSaveClick(employee.employeeId)}
                    >
                      Save
                    </label>
                  </div>
                ) : (
                  <div className="flex pb-5 justify-around">
                    <button
                      onClick={() => handleEditClick(employee.employeeId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-black"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => setDeletedEmployeeId(employee.employeeId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Cards;
