import React from 'react';

import Todo from './Todo'

const TodoList = ({ todoList, handleCheck }) => {
  return (
    <div className="container">
      {todoList.map(todo => (
        <Todo
          todo={todo}
          handleCheck={handleCheck}
        />))
      }
    </div>
  )
};

export default TodoList;