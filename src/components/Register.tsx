import axios from "axios";
import React, { useState } from "react";
import LoginForm from "./Login";
export const BASE_URL = "https://localhost:7223";
type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let url = `${BASE_URL}/Users/Register`;
    e.preventDefault();
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <LoginForm />
    </>
  );
};

export default Register;
