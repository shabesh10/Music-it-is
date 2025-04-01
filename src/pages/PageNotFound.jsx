import React from "react";
import ErrorPage from "../helpers/ErrorPage";
import Button from "../helpers/Button";


const PageNotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify- items-center">
      <div>
        <p className="font-serif text-black text-[64px] text-center">404</p>
        <p className="text-black font-serif text-lg text-center">
          Looks like you are lost :(
        </p>
        <ErrorPage />
      </div>
      <div>
      <Button />
      </div>
    </div>
  );
};

export default PageNotFound;
