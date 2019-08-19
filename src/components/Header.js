import React from 'react';

const Header = ({title}) => {
    return (
        <div className="nav nav-tabs bg-dark my-auto">
                <li className="nav-link mx-auto"><h1>{title}</h1></li>
        </div>
    );
};

export default Header;