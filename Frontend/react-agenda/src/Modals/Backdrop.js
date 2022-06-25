import React from "react";

function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed w-screen h-screen bg-black/40 top-0 left-0 cursor-pointer"
    ></div>
  );
}

export default Backdrop;
