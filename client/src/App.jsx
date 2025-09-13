import React from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Inventory from "./pages/Inventory.jsx";
import Add from "./pages/Add.jsx";
import Remove from "./pages/Remove.jsx";
import Billing from "./pages/Billing.jsx";
import PrintedBill from "./pages/PrintedBill.jsx";
import Sales from "./pages/Sales.jsx";
import About from "./pages/About.jsx";
import Store from "./pages/Store.jsx";

function CommandBar({ left, right }) {
  const nav = useNavigate();
  return (
    <div className="command-bar">
      <div>
        {left?.type === "back" ? (
          <button className="pill-btn" onClick={() => nav(left.to ?? -1)}>Back</button>
        ) : left?.label ? (
          <Link to={left.to} className="pill-btn">{left.label}</Link>
        ) : <span/>}
      </div>
      <div />
      <div>
        {right?.label && <Link to={right.to} className="pill-btn">{right.label}</Link>}
      </div>
    </div>
  );
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home CommandBar={CommandBar} />} />
      <Route path="/inventory" element={<Inventory CommandBar={CommandBar} />} />
      <Route path="/add" element={<Add CommandBar={CommandBar} />} />
      <Route path="/remove" element={<Remove CommandBar={CommandBar} />} />
      <Route path="/billing" element={<Billing CommandBar={CommandBar} />} />
      <Route path="/printed-bill/:id" element={<PrintedBill CommandBar={CommandBar} />} />
      <Route path="/sales" element={<Sales CommandBar={CommandBar} />} />
      <Route path="/about" element={<About CommandBar={CommandBar} />} />
      <Route path="/store" element={<Store CommandBar={CommandBar} />} />
    </Routes>
  );
}

