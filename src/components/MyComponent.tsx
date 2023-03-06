import React, { useState } from "react";
import { createAPIEndpoint, ENDPOINTS, IEmployee } from "./api";

const UploadImageExample: React.FC = () => {
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
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const test = async () => {
    const response = await createAPIEndpoint(ENDPOINTS.Employees).get();
    setEmployees(response.data);
  };
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

  const handleSubmit = async () => {
    try {
      const response = await createAPIEndpoint(ENDPOINTS.Employees).post(
        newEmployee
      );
      setNewEmployee({
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload Image Example</h1>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={newEmployee.firstName}
          onChange={(event) =>
            setNewEmployee({
              ...newEmployee,
              firstName: event.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <label className="btn btn-primary" onClick={test}>
        Check API
      </label>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employeeId}>
            {employee.firstName} - <img src={employee.imagePath}></img>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadImageExample;
