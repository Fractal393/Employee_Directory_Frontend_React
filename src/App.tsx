import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Landing from "./components/Landing";
import EmployeeList from "./components/EmployeeList";
import UploadImageExample from "./components/MyComponent";
import Register from "./components/Register";
import Test from "./components/Test";
function App() {
  return (
    <>
      {/* <Navbar />

      <Sidebar />
      <LetterBoxes /> */}
      {/* <Landing /> */}
      {/*  <Api /> */}
      {/* <MyComponent /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/body" element={<Test />}></Route>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
