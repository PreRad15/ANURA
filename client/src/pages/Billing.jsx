import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBill, getProducts } from "../api";

export default function Billing({ CommandBar }) {
  const [items, setItems] = useState([{ itemNo: "", name: "", qty: 1, price: 0 }]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const productData = await getProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Failed to load products", error);
        alert("Could not load product list from inventory.");
      }
    }
    loadProducts();
  }, []);

  const handleProductChange = (index, selectedItemNo) => {
    const selectedProduct = products.find(p => p.itemNo === selectedItemNo);
    const updatedItems = [...items];
    if (selectedProduct) {
      updatedItems[index] = {
        ...updatedItems[index],
        itemNo: selectedProduct.itemNo,
        name: selectedProduct.name,
        price: selectedProduct.price,
      };
    } else { // Handle case "Select a product"
      updatedItems[index] = { itemNo: "", name: "", qty: 1, price: 0 };
    }
    setItems(updatedItems);
  };

  const handleQtyChange = (index, value) => {
    const updatedItems = [...items];
    // Ensuring quantity is at least 1
    updatedItems[index].qty = Number(value) >= 1 ? Number(value) : 1;
    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([...items, { itemNo: "", name: "", qty: 1, price: 0 }]);
  };

  const removeRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    const billPayload = {
      items: items
        .filter(it => it.itemNo && it.qty > 0) // Filtring out incomplete rows
        .map(it => ({ itemNo: it.itemNo, qty: Number(it.qty) })),
    };

    if (billPayload.items.length === 0) {
      alert("Please add at least one valid product to the bill.");
      return;
    }

    try {
      const savedBill = await createBill(billPayload);
      if (savedBill && savedBill._id) {
        navigate(`/printed-bill/${savedBill._id}`);
      } else {
        console.error("Bill save response did not contain an ID:", savedBill);
        alert("Failed to save bill. The server responded unexpectedly.");
      }
    } catch (err) {
      console.error("Error creating bill:", err);
      // Displaying a more specific error message from the server if available
      const errorMessage = err.response ? (await err.response.json()).message : err.message;
      alert(`Could not create bill: ${errorMessage}`);
    }
  };

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  return (
    <>
      <CommandBar left={{ type: "back", to: "/" }} />
      <div className="section">
        <h1 className="big-title">New Bill</h1>
        <div className="table-responsive mt-4">
          <table className="table-outline">
            <thead>
              <tr>
                <th style={{width: '40%'}}>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, index) => (
                <tr key={index}>
                  <td>
                    <select
                      className="grey-input"
                      value={it.itemNo}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                    >
                      <option value="">Select a product</option>
                      {products.map(p => (
                        <option key={p.itemNo} value={p.itemNo}>
                          {p.name} (In Stock: {p.qty})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="grey-input"
                      value={it.qty}
                      onChange={(e) => handleQtyChange(index, e.target.value)}
                      disabled={!it.itemNo} // Disabling qty input until a product is selected
                    />
                  </td>
                  <td>₹{it.price.toFixed(2)}</td>
                  <td>₹{(it.qty * it.price).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeRow(index)} className="pill-btn" style={{ background: "var(--remove-badge)" }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button onClick={addRow} className="pill-btn" style={{ background: "var(--add-badge)" }}>+ Add Item</button>
          <div className="total-box">
            <h3 className="m-0">Grand Total: ₹{total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button onClick={handleSubmit} className="pill-btn" style={{ fontSize: '1.2rem', padding: '12px 24px', background: '#a0ffa0' }}>
            Generate Bill
          </button>
        </div>
      </div>
    </>
  );
}