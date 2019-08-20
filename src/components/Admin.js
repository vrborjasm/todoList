import React from 'react';

const Admin = ({freeTodos}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <button className="btn btn-raised btn-secondary" onClick={freeTodos}>Liberar</button>
                </div>
                <div className="col-lg-4">
                    <p><i className="material-icons">filter_list</i>Filter</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;