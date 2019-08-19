import React from 'react';

const Todo = ({ todo }) => {

  return (
    <div>          
        <p>{todo.description}</p>
        <p>{todo.date}</p>
    </div>
  )
};

export default Todo;