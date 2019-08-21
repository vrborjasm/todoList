import React, { Component } from 'react';

import Header from './components/Header'
import Admin from './components/Admin'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import api from './api';


class App extends Component {
  state={
    todoList: []
  }

  componentDidMount () {
    api.getList()
      .then(response => this.setState({ todoList: response.data }))
      .catch(err => alert('No nos hemos podido comunicar con el servidor, intentalo nuevamente'))
  }

  handleCheck = (oldTodo) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== oldTodo.id)
    todoList.push({ ...oldTodo, selected: !oldTodo.selected })
    this.setState({ todoList })
  }

  includeInTodoList = (todo) => {
    const todoList = this.state.todoList.map(todo => ({ ...todo }));
    todoList.push(todo);

    return todoList;
  }

  freeTodos = () => {
    const todoList = [];

    this.state.todoList.forEach(todo => {
      if (todo.selected) {
        api.patch(todo.id, { finished: true })
          .then(response => {
            this.setState({ todoList: this.includeInTodoList(response.data) });
          })
          .catch(err => {
            this.setState({ todoList: this.includeInTodoList({ ...todo }) });
            alert('Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!');
          })
      } else {
        todoList.push({ ...todo });
      }
    })

    this.setState({ todoList });
  }

  addTodo = (todo) => {
    api.post(todo).then(response => {
      this.setState({ todoList: this.includeInTodoList(response.data) });
    })
    .catch(err => {
      alert('Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!');
    })
}

  render() {
    const todoList = this.state.todoList.sort((todoA, todoB) => todoA.id - todoB.id);

    return (
      <div>
        <Header title="Todo List"/>
        <Admin freeTodos={this.freeTodos}/>
        <TodoList todoList={this.state.todoList} handleCheck={this.handleCheck}/>
        <NewTodo addTodo={this.addTodo}/> 
      </div>
    );
  }
}

export default App;