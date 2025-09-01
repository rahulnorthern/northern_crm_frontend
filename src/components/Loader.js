import React from 'react'
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.6)", // light overlay
        zIndex: 1050, // above everything
      }}
    >
      <div className="text-center">
        <Spinner
          animation="border"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        />
        <div className="mt-2 fw-bold">Loading...</div>
      </div>
    </div>
  );
}

export default Loader