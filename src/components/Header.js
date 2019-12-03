import React from "react";

const Header = ({ title }) => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return (
    <div className="nav nav-tabs bg-dark my-auto">
      <div className="container">
        <div className="navbar-brand">
          <h1>{title}</h1>
        </div>
        <div className="navbar-item text-right">
          Hoy: {date}/{month}/{year}
        </div>
      </div>
    </div>
  );
};

export default Header;
