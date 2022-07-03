import React from "react";

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-3 md:py-2 md:px-4 flex items-center justify-center bg-black text-white text-[15px] gap-1 font-semibold rounded-full hover:bg-purple-800"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
