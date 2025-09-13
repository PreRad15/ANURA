import React, { useEffect, useState } from "react";
import { getProducts } from "../api.js";
import { Link } from "react-router-dom";

export default function Inventory({ CommandBar }) {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);

  async function load(search = "") {
    const data = await getProducts(search);
    setRows(data);
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {/* This "Back" button always goes to the Home page */}
      <CommandBar left={{ type: "back", to: "/" }} />
      <div className="section">
        <h1 className="big-title">Inventory</h1>

        <div className="d-flex align-items-center gap-3 my-4">
          <div className="h4 m-0">Search:-</div>
          <input
            className="grey-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") load(q);
            }}
            placeholder="Item No. or Product Name"
          />
        </div>

        <div className="d-flex gap-4 justify-content-end mb-3">
          <Link
            className="pill-btn"
            to="/add"
            style={{ background: "var(--add-badge)" }}
          >
            Add Product
          </Link>
          <Link
            className="pill-btn"
            to="/remove"
            style={{ background: "var(--remove-badge)" }}
          >
            Remove Product
          </Link>
        </div>

        <div className="table-responsive">
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
              {rows.map((r) => (
                <tr key={r.itemNo}>
                  <td>{r.itemNo}</td>
                  <td>{r.name}</td>
                  <td>{r.qty}</td>
                  <td>{r.price.toFixed(2)}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="4" className="center py-4">
                    No products
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
