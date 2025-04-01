import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/70 flex justify-center items-center">
      <div class="loader"></div>
    </div>
  );
};

export default Spinner;


