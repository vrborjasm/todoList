import React from 'react';

const Admin = ({freeTodos, handleChangeSort, handleChangeFilter}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="offset-lg-1 col-lg-6 my-auto text-center">
                    <button className="btn btn-secondary btn-raised btn-lg" onClick={freeTodos}>Liberar Seleccionadas</button>
                </div>
                <div className="col-lg-4">
                    <div className="input-group mb-2 mt-2 row">
                        <div className="input-group-prepend col-lg-4">
                            <label className="input-group-text" for="inputGroupSelect01"><i class="material-icons">sort</i>Ordenar por: </label>
                        </div>
                        <div className="col-lg-8">
                            <select className="custom-select" id="inputGroupSelect01" onChange={handleChangeSort}>
                                <option selected value="creation">Fecha de creacion</option>
                                <option value="expiration">Fecha de vencimiento</option>
                                <option value="status">Estado</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group mb-2 mt-2 row">
                        <div className="input-group-prepend col-lg-4">
                            <label className="input-group-text" for="inputGroupSelect02"><i class="material-icons">filter_list</i>Filtrar por: </label>
                        </div>
                        <div className="col-lg-8">
                            <select className="custom-select" id="inputGroupSelect02" onChange={handleChangeFilter}>
                                <option value="all" selected>Todos</option>
                                <option value="free">Liberados</option>
                                <option value="pending">Pendientes</option>
                                <option value="late">Atrasados</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin;