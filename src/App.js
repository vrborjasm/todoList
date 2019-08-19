import React, { Component } from 'react';

import Header from './components/Header'
import TodoList from './components/TodoList';

class App extends Component {
  state={
    todolist: [{
      "id": 1,
      "description": "Hacer app",
      "status": "pending",
      "date": "2019-08-20T18:49:02.116Z"
    },
    {
      "id": 2,
      "description": "Estudiar React",
      "status": "pending",
      "date": "2019-08-17T18:49:02.116Z"
    },
    {
      "id": 3,
      "description": "Visitar a Lezama",
      "status": "pending",
      "date": "2019-08-17T18:49:02.116Z"
    }]
  }
  render() {
    return (
      <div>
        <Header title="Todo List"/>
        <TodoList todoList={this.state.todolist}/> 
      </div>
    );
  }
}

export default App;