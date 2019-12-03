import React from "react";

import "./Todo.css";

const Todo = ({ todo, handleCheck, modifyDate, deleteTodo }) => {
  const extraClasses = {
    done: "todo__status--finished",
    alarm: "todo__status--pending",
    warning: "todo__status--late"
  };

  const classStatus = `card my-3 ${extraClasses[todo.status]}`;
  return (
    <div className={classStatus}>
      <div className="card-body py-2">
        <div className="row">
          <div className=" col-2 col-sm-1 text-center my-auto">
            <i className="material-icons" onClick={() => handleCheck(todo)}>
              {todo.selected ? "check_box" : "check_box_outline_blank"}
            </i>
          </div>
          <div className="col-10 col-sm-4 col-md-5 col-lg-5 my-auto">
            <p className="mb-0">{todo.description}</p>
          </div>
          <div className="col-8 col-sm-5 col-md-4 col-lg-4 my-auto text-center">
            <div className="form-group mb-0">
              <div>
                <input
                  onChange={e => modifyDate(e, todo)}
                  type="date"
                  className="form-control date_input_todo d-inline-block py-0"
                  name={`date-${todo.id}`}
                  value={todo.date}
                />
                <span>
                  <i class="material-icons">calendar_today</i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-2 col-sm-1 col-md-1 my-auto text-center">
            <i className="material-icons">{todo.status}</i>
          </div>
          <div className="col-2 col-sm-1 col-md-1 my-auto text-center">
            <i className="material-icons" onClick={() => deleteTodo(todo.id)}>
              delete
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
