import React, { useState } from "react";
import { bulkRemove } from "../api.js";
import { useNavigate } from "react-router-dom";

function emptyRow(){ return { itemNo:"", name:"", qty:"", price:"" }; }

export default function Remove({ CommandBar }){
  const nav=useNavigate();
  const [rows,setRows]=useState([emptyRow(),emptyRow(),emptyRow(),emptyRow()]);

  function setField(i,k,v){
    const copy=[...rows]; copy[i][k]=v; setRows(copy);
  }
  
  async function handleRemove(){
    const cleaned = rows
        .filter(r => r.itemNo.trim()) // consider rows where an Item No. is present
        .map(r => ({ itemNo: r.itemNo.trim() }));

    if(cleaned.length === 0){ 
      alert("Please fill in the 'Item No.' for at least one row to remove products."); 
      return; 
    }
    
    try {
      // The API expects an object with a 'products' key
      await bulkRemove({ products: cleaned });
      alert("Products removed successfully!");
      nav("/inventory");
    } catch(err) {
      console.error("Error removing products:", err);
      alert(`Failed to remove products: ${err.message}`);
    }
  }

  return (
    <>
      <CommandBar left={{ type:"back", to:"/inventory" }} />
      <div className="section">
        <div className="center"><span className="badge-title badge-remove">Remove Product</span></div>

        <div className="table-responsive mt-4">
          <table className="table-outline">
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Product Name (auto-filled)</th>
                <th>Quantity (auto-filled)</th>
                <th>Price (auto-filled)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td><input className="grey-input" placeholder="Enter Item No. to remove" value={r.itemNo} onChange={e=>setField(i,"itemNo",e.target.value)} /></td>
                  <td><input className="grey-input" value={r.name} disabled /></td>
                  <td><input className="grey-input" value={r.qty} disabled /></td>
                  <td><input className="grey-input" value={r.price} disabled /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-muted">Note: Only the "Item No." column is needed to remove a product. Other fields are ignored.</p>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button className="pill-btn" style={{background:"var(--remove-badge)"}} onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </>
  );
}
