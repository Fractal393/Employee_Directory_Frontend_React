import axios from "axios";
import React, { useState, useEffect } from "react";

export const BASE_URL = "https://localhost:7213";

export const ENDPOINTS = {
  Employees: "Employees",
  Employee: "Employee",
};
export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}/${endpoint}/`;
  return {
    get: () => axios.get<IEmployee[]>(url),
    getFilter: (value) => {
      return axios.get<IEmployee[]>(
        `${url}?searchText=${value.params.searchText}&searchBy=${value.params.searchBy}`
      );
    },
    getById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
    getLetter: async (letter) =>
      axios.get<IEmployee[]>(`${url}?letter=${letter.filter}`),
    sidebarFilter: (department, office, jobTitle) =>
      axios.get<IEmployee[]>(
        `${url}?department=${department.department}&office=${office.office}&jobTitle=${jobTitle.jobTitle}`
      ),
  };
};

//generate a card

export interface IEmployee {
  employeeId: number;
  firstName: string;
  lastName: string;
  preferredName: number;
  office: string;
  phoneNumber: string;
  skypeID: string;
  email: string;
  department: string;
  jobTitle: string;
  imagePath: string;
  [key: string]: any; // Add index signature to allow any other field
}

type Props = {};

const Api = (props: Props) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [deletedEmployeeId, setDeletedEmployeeId] = useState<number | null>(
    null
  );

  const [updatedEmployee, setUpdatedEmployee] = useState<IEmployee | null>(
    null
  );

  const test = async () => {
    const response = await createAPIEndpoint(ENDPOINTS.Employees).get();
    setEmployees(response.data);
  };

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

    fetchData();
  }, [deletedEmployeeId]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (updatedEmployee) {
      setUpdatedEmployee({
        ...updatedEmployee,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (updatedEmployee) {
      const response = await createAPIEndpoint(ENDPOINTS.Employees).put(
        updatedEmployee.employeeId,
        updatedEmployee
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((e) =>
          e.employeeId === updatedEmployee.employeeId ? response.data : e
        )
      );
      setUpdatedEmployee(null);
    }
  };

  return (
    <>
      <label className="btn btn-primary" onClick={test}>
        Check API
      </label>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employeeId}>
            {employee.firstName} - {employee.lastName}{" "}
            <button onClick={() => setDeletedEmployeeId(employee.employeeId)}>
              Delete
            </button>
            <button onClick={() => setUpdatedEmployee(employee)}>Edit</button>
          </li>
        ))}
      </ul>
      {updatedEmployee && (
        <form>
          <label>
            First name:
            <input
              type="text"
              name="firstName"
              value={updatedEmployee.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last name:
            <input
              type="text"
              name="lastName"
              value={updatedEmployee.lastName}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleUpdate}>Update</button>
        </form>
      )}
    </>
  );
};

export default Api;
