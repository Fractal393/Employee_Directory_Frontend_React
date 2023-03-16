import axios from "axios";
import React, { useState } from "react";
import { IEmployee } from "./api";
import LetterBoxes from "./LetterBoxes";
import { Navbar } from "./navbar/Navbar";
import Sidebar from "./Sidebar";

type Props = {};

interface User {
  id: number;
  email: string;
}

interface LoginResponse {
  token: string;
}

export const BASE_URL = "https://localhost:7213";

const Landing: React.FC<Props> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let url1 = `${BASE_URL}/Users/Register`;
    e.preventDefault();
    try {
      const response = await axios.post(url1, { email, password });
    } catch (response) {
      alert("Email already taken");
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    let url = `${BASE_URL}/Users/Login`;
    let ur2l = `${BASE_URL}/Users`;
    event.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(url, {
        email,
        password,
      });

      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem("token", token);

      // Fetch the user data
      const userResponse = await axios.get<User>(ur2l);

      setLoggedInUser(userResponse.data);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Clear the logged in user
    setLoggedInUser(null);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />

      {loggedInUser ? (
        <>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            employees={employees}
            setEmployees={setEmployees}
          />

          <div className="p-10 sm:ml-64">
            <LetterBoxes employees={employees} setEmployees={setEmployees} />
            <button
              onClick={handleLogout}
              className="text-white bg-blue btn btn-outline rounded-none mt-2"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="pl-5 pt-28">
          <div className="pb-5 text-4xl text-black w-full h-full">
            Please Log In
          </div>
          <div className="flex flex-col w-96">
            <form onSubmit={handleLogin}>
              <label className="text-black/75">
                Email:
                <input
                  type="text"
                  value={email}
                  className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <br />
              <label className="text-black/75">
                Password:
                <input
                  type="password"
                  value={password}
                  className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <br />
              <button
                type="submit"
                className="text-white bg-blue btn btn-outline rounded-none mt-2"
              >
                Login
              </button>
            </form>
            <span className="text-black text-base mt-1">
              <a href="#register-modal" className="underline">
                Not a User? Click here to Register
              </a>

              <div className="modal" id="register-modal">
                <div className="modal-box bg-white rounded-none">
                  <a className="text-red-600 float-right mb-5" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 justify-end text-right"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>

                  <form onSubmit={handleSubmit}>
                    <br />
                    <label className="text-black/75">
                      Email:
                      <input
                        type="text"
                        value={email}
                        className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </label>
                    <br />
                    <label className="text-black/75">
                      Password:
                      <input
                        type="password"
                        value={password}
                        className="bg-white col-span-2 text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </label>
                    <br />
                    <button
                      type="submit"
                      className="text-white bg-blue btn btn-outline rounded-none mt-2"
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
