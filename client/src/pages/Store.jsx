import React from "react";
// 1. Import the logo image directly from the assets folder.
import storeLogo from "../assets/supermart-image.jpg";

export default function Store({ CommandBar }) {
  return (
    <>
      <CommandBar left={{ type: "back", to: "/" }} />
      <div className="section center">
        {/* 2. Use the imported 'storeLogo' variable in the src attribute. */}
        <img
          src={storeLogo}
          alt="Anura Mart Logo"
          style={{
            width: 180,
            height: 180,
            objectFit: 'contain',
            margin: '0 auto 24px'
          }}
        />
        <h1 className="big-title" style={{ fontSize: '72px' }}>Anura Super Market</h1>
        <div className="h4">Daily Needs</div>
        <div className="h4 mt-4">Address</div>
        <div className="h5">Shop No. 1504, Radha-Shyam Road, Akola, Maharashtra, India.</div>
        <div className="h4 mt-4">Contact Number - (+91) 9209273910</div>
      </div>
    </>
  );
}
