import { useState } from "react";
import axios from "axios";
import React from "react";
export const BASE_URL = "https://localhost:7223";

interface User {
  id: number;
  email: string;
}

interface LoginResponse {
  token: string;
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

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

  return (
    <div>
      {loggedInUser ? (
        <>
          <p className="text-black">Welcome, {loggedInUser.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
