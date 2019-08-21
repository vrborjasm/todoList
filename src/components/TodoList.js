import React from 'react';

import Todo from './Todo'

const TodoList = ({ todoList, handleCheck, modifyDate }) => {
  return (
    <div className="container">
      {todoList.map(todo => (
        <Todo
          todo={todo}
          modifyDate={modifyDate}
          handleCheck={handleCheck}
        />))
      }
    </div>
  )
};

export default TodoList;