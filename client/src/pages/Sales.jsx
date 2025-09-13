import React, { useEffect, useState } from "react";
import { getSales } from "../api.js";

export default function Sales({ CommandBar }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSales() {
      try {
        const salesData = await getSales();
        setRows(salesData);
      } catch (err) {
        console.error("Failed to fetch sales:", err);
        setError(err.message || "Could not load sales data.");
      } finally {
        setLoading(false);
      }
    }
    loadSales();
  }, []);

  if (loading) {
    return (
      <div className="section">
        <h1 className="big-title">Loading Sales Report...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <h1 className="big-title" style={{ color: 'red' }}>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <CommandBar left={{ type: "back" }} />
      <div className="section">
        <h1 className="big-title">Sales Report</h1>
        <div className="table-responsive mt-4">
          <table className="table-outline">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Sale</th>
                <th>Bills Generated</th>
                <th>Products Sold</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  {/* property names from r.total to r.totalAmount, etc. */}
                  <td>₹{(r.totalAmount || 0).toFixed(2)}</td>
                  <td>{r.billsGenerated || 0}</td>
                  <td>{r.productsSold || 0}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="4" className="center py-4">
                    No sales have been recorded yet.
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
