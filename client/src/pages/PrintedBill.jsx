import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBill } from "../api";

export default function PrintedBill() {
  const { id } = useParams(); // The 'id' declaration
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBill() {
      if (!id) { // Check if the id exists before fetching
        setError("No bill ID provided.");
        setLoading(false);
        return;
      }
      try {
        const data = await getBill(id); // Use the 'id' from useParams command here
        if (!data || data.message) {
          setError("Bill not found or invalid.");
        } else {
          setBill(data);
        }
      } catch (err) {
        setError(err.message || "Failed to load the bill.");
      } finally {
        setLoading(false);
      }
    }
    fetchBill();
  }, [id]); // Runs again if the id changes

  if (loading) return <div>Loading bill...</div>;
  if (error) return <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>;
  if (!bill) return <div>No bill data available to display.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/billing")} className="pill-btn">⬅ New Bill</button>
      <div className="section">
        <h1 className="big-title">Bill Details</h1>
        <p><b>Bill Number:</b> #{bill.number}</p>
        <p><b>Date:</b> {new Date(bill.date).toLocaleString()}</p>

        <div className="table-responsive mt-4">
            <table className="table-outline">
            <thead>
                <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {bill.items && bill.items.length > 0 ? (
                bill.items.map((it, i) => (
                    <tr key={i}>
                    <td>{it.name}</td>
                    <td>{it.qty}</td>
                    <td>₹{it.price.toFixed(2)}</td>
                    <td>₹{(it.qty * it.price).toFixed(2)}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>No items found in this bill.</td>
                </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Subtotal</td>
                    <td style={{ fontWeight: 'bold' }}>₹{bill.total.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tax ({(TAX * 100).toFixed(0)}%)</td>
                    <td style={{ fontWeight: 'bold' }}>₹{bill.tax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem' }}>Grand Total</td>
                    <td style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>₹{bill.grandTotal.toFixed(2)}</td>
                </tr>
            </tfoot>
            </table>
        </div>
      </div>
    </div>
  );
}

// Defining TAX constant
const TAX = 0.07;
