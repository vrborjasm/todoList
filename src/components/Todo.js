import React from 'react';

const changeStatus = ({ finished, date }) => {
  date = new Date(date)  
  date = date.getTime()
  if (finished) return 'done'
    else if (date > Date.now()) return 'alarm'
    return 'warning'
  }

  

const Todo = ({ todo, handleCheck }) => {  
  const status = changeStatus(todo)
  return (
    <div className="card mt-1 mb-1">
        <div className="card-body">
            <div className="row">
                <div className="col-lg-2 my-auto text-center">
                <i className="material-icons" onClick={() => handleCheck(todo)}>{ todo.selected ? "check_box" : "check_box_outline_blank"}</i>
                </div>         
                <div className="col-lg-6 my-auto">
                    <p>{todo.description}</p>
                </div>          
                <div className="col-lg-2 my-auto text-center">
                    <p>{todo.date}</p>
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