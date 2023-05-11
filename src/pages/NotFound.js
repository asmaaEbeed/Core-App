import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pt-10 mx-auto">
      <div className="center-content min-h-[calc(100vh-58px)] pb-7">
        <div className="img-container">
          <img
            src={require("../images/not-found.png")}
            alt="page not found"
            className="block mx-auto w-1/3"
          />
        </div>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Link
            className="bg-green-600 hover:bg-green-800 text-white active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 relative"
            type="button"
            to={"/"}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
