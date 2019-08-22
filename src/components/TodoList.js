import React from 'react';

import Todo from './Todo'

const TodoList = ({ todoList, handleCheck, modifyDate }) => {
  return (
    <div className="container">
      <div className="row">
        <div className=" mt-2 mb-2 offset-lg-2 col-lg-8 ">
        {todoList.map(todo => (
        <Todo
          todo={todo}
          key={todo.id}
          modifyDate={modifyDate}
          handleCheck={handleCheck}
        />))
      }

        </div>
      </div>
    </div>
  )
};

export default TodoList;