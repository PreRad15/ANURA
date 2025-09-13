// src/api.js
const API_URL = "http://localhost:5000/api"; // API URL

async function handleResponse(fetchPromise) {
  try {
    const response = await fetchPromise;
    // .ok is true if the status is 200-299
    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        // If the server sends an error without a JSON body, create a generic error
        return { message: `Request failed with status code ${response.status}` };
      });
      // Throw an error with the message from the server's JSON response
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();s
  } catch (error) {
    // Log the error and re-throw it so the component can handle it (e.g., show an alert)
    console.error("API call failed:", error.message);
    throw error;
  }
}

// INVENTORY

export function getProducts(search = "") {
  // Construct URL with search parameters correctly
  const url = new URL(`${API_URL}/products`, window.location.origin);
  if (search) {
    url.searchParams.append('search', search);
  }
  return handleResponse(fetch(url));
}

export function bulkAdd(productsPayload) { // e.g., { products: [...] }
  return handleResponse(fetch(`${API_URL}/products/bulk-add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productsPayload),
  }));
}

export function bulkRemove(productsPayload) { // e.g., { products: [...] }
  return handleResponse(fetch(`${API_URL}/products/bulk-remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productsPayload),
  }));
}

// BILLING

export function createBill(billData) {
  return handleResponse(fetch(`${API_URL}/bills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(billData),
  }));
}

export function getBill(billId) {
  return handleResponse(fetch(`${API_URL}/bills/${billId}`));
}

// SALES 
export function getSales() {
  return handleResponse(fetch(`${API_URL}/sales`));
}
