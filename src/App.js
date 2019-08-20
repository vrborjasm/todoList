import React, { Component } from 'react';

import Header from './components/Header'
import Admin from './components/Admin'
import TodoList from './components/TodoList';

class App extends Component {
  state={
    todoList: [{
      "id": 1,
      "description": "Hacer app",
      "status": "pending",
      "date": "2019-08-25T18:49:02.116Z"
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

  handleCheck = (oldTodo) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== oldTodo.id)
    todoList.push({ ...oldTodo, selected: !oldTodo.selected })
    this.setState({ todoList })
  }

  freeTodos = () => {
    let todoList=[]
    this.state.todoList.forEach(todo => {
      todo = (todo.selected) ? { ...todo, finished: true } : { ...todo }
      todoList.push(todo) 
    });
    this.setState({ todoList })
  }

  render() {
    const todoList = this.state.todoList.sort((todoA, todoB) => todoA.id - todoB.id);

    return (
      <div>
        <Header title="Todo List"/>
        <Admin freeTodos={this.freeTodos}/>
        <TodoList todoList={this.state.todoList} handleCheck={this.handleCheck}/> 
      </div>
    );
  }
}

export default App;