import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ CommandBar }){
  const nav = useNavigate();
  return (
    <>
      <CommandBar left={{ label:"Store", to:"/store" }} right={{ label:"About", to:"/about" }} />
      <div className="section">
        <div className="home-cards">
          <div className="home-card" onClick={()=>nav("/inventory")}>Inventory</div>
          <div className="home-card" onClick={()=>nav("/billing")}>New Bill</div>
          <div className="home-card" onClick={()=>nav("/sales")}>Sale Report</div>
        </div>
      </div>
    </>
  );
}
