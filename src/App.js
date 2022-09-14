import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/users" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
      </Routes>
    </main>
  );
}

export default App;
