import React, { useState } from "react";
import { bulkAdd } from "../api.js";
import { useNavigate } from "react-router-dom";

function emptyRow() {
  return { itemNo: "", name: "", qty: "", price: "" };
}

export default function Add({ CommandBar }) {
  const nav = useNavigate();
  const [rows, setRows] = useState([emptyRow(), emptyRow(), emptyRow(), emptyRow()]);

  function setField(i, k, v) {
    const copy = [...rows];
    copy[i][k] = v;
    setRows(copy);
  }

  async function handleAdd() {
    const cleaned = rows
      .filter((r) => r.itemNo && r.name && r.qty && r.price)
      .map((r) => ({
        itemNo: String(r.itemNo).trim(),
        name: r.name.trim(),
        qty: Number(r.qty),
        price: Number(r.price),
      }));

    if (cleaned.length === 0) {
      alert("Please fill all columns for at least one row.");
      return;
    }

    try {
      // products:to match what the API expects
      await bulkAdd({ products: cleaned }); 
      alert("Products added successfully!");
      nav("/inventory");
    } catch (err) {
      console.error("Error adding products:", err);
      //specific error message from the API if available
      alert(`Failed to add products: ${err.message || 'Please check the console for details.'}`);
    }
  }

  return (
    <>
      <CommandBar left={{ type: "back", to: "/inventory" }} />
      <div className="section">
        <div className="center">
          <span className="badge-title badge-add">Add Product</span>
        </div>

        <div className="table-responsive mt-4">
          <table className="table-outline">
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>
                    <input
                      className="grey-input"
                      value={r.itemNo}
                      onChange={(e) => setField(i, "itemNo", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="grey-input"
                      value={r.name}
                      onChange={(e) => setField(i, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="grey-input"
                      type="number" // number type for quantity
                      min="0"
                      value={r.qty}
                      onChange={(e) => setField(i, "qty", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="grey-input"
                      type="number" // number type for price
                      min="0"
                      step="0.01" // for decimal prices
                      value={r.price}
                      onChange={(e) => setField(i, "price", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            className="pill-btn"
            style={{ background: "var(--add-badge)" }}
            onClick={handleAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );
}
