import React from 'react';

const Todo = ({ todo }) => {

  return (
    <div className="card mt-1 mb-1">
        <div className="card-body">
            <div className="row">
                <div className="col-lg-2 my-auto text-center">
                <i className="material-icons">check_box</i>
                </div>         
                <div className="col-lg-6 my-auto">
                    <p>{todo.description}</p>
                </div>          
                <div className="col-lg-2 my-auto text-center">
                    <p>{todo.date}</p>
                </div>
                <div className="col-lg-2 my-auto text-center">
                    <p>Status</p>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Todo;