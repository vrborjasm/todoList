import React from 'react';

import './Todo.css';

const changeStatus = ({ finished, date }) => {
  if (finished) return 'done'
    else if (new Date(date) > Date.now()) return 'alarm'
    return 'warning'
  }

const Todo = ({ todo, handleCheck, modifyDate }) => {  
  const status = changeStatus(todo)
  const extraClasses = {
    'done': 'todo__status--finished',
    'alarm': 'todo__status--pending',
    'warning': 'todo__status--late',
  };

  const classStatus = `card mt-2 mb-2 offset-lg-1 col-lg-10 ${extraClasses[status]}`
  return (
    <div className="row">
      <div className={classStatus}>
          <div className="card-body px-1 py-1">
              <div className="row">
                  <div className=" col-1 col-lg-2 text-center my-auto">
                  <i className="material-icons" onClick={() => handleCheck(todo)}>{ todo.selected ? "check_box" : "check_box_outline_blank"}</i>
                  </div>         
                  <div className=" col-11 col-lg-5 my-auto">
                      <p className="mb-0">{todo.description}</p>
                  </div>          
                  <div className=" col-12 col-lg-3 my-auto text-center">
                     
                      <div className="form-group mb-0">
                          <div>
                            
                          <input 
                          onChange={(e) => modifyDate(e,todo)}
                          type="date" 
                          className="form-control date_input_todo d-inline-block py-0" 
                          name="date"
                          value={todo.date}
                          />
                          
                          
                          <span><i class="material-icons">calendar_today</i></span>
                          
                          </div>
                      </div>
                
                  </div>
                  <div className="col-lg-2 my-auto text-center">
                  <i className="material-icons">{status}</i>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
};

export default Todo;