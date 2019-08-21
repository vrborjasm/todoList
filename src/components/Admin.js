import React from 'react';

import Sort from './Sort'

const Admin = ({freeTodos, sortBy}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <button className="btn btn-raised btn-secondary" onClick={freeTodos}>Liberar</button>
                </div>
                <Sort sortBy={sortBy}/>
            </div>
        </div>
    );
};

export default Admin;