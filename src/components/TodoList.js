import React from 'react';

import Todo from './Todo'

const TodoList = ({ todoList }) => {
  return (
    <div>
      {todoList.map(todo => (
        <Todo
          todo={todo}
        />))
      }
    </div>
  )
};

export default TodoList;