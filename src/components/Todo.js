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

  const classStatus = `card mt-1 mb-1 ${extraClasses[status]}`
  return (
    <div className={classStatus}>
        <div className="card-body">
            <div className="row">
                <div className="col-lg-2 my-auto text-center">
                <i className="material-icons" onClick={() => handleCheck(todo)}>{ todo.selected ? "check_box" : "check_box_outline_blank"}</i>
                </div>         
                <div className="col-lg-5 my-auto">
                    <p>{todo.description}</p>
                </div>          
                <div className="col-lg-3 my-auto text-center">
                    <form>
                    <div className="form-group col-lg-9">
                        <input 
                        onChange={(e) => modifyDate(e,todo)}
                        type="date" 
                        className="form-control" 
                        name="date"
                        value={todo.date}
                        />
                    </div>
                    </form> 
                </div>
                <div className="col-lg-2 my-auto text-center">
                <i className="material-icons">{status}</i>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Todo;