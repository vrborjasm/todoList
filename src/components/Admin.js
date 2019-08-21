import React from 'react';

const Admin = ({freeTodos, handleChange}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <button className="btn btn-raised btn-secondary" onClick={freeTodos}>Liberar</button>
                </div>
                <div className="col-lg-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" for="inputGroupSelect01">Orden</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={handleChange}>
                            <option selected value="creation">Fecha de creacion</option>
                            <option value="expiration">Fecha de vencimiento</option>
                            <option value="status">Estado</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;