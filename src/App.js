import React, { Component } from 'react';

import Header from './components/Header'
import Admin from './components/Admin'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import api from './api';


class App extends Component {
  state={
    todoList: [],
    sortBy: 'creation'
  }

  componentDidMount () {
    api.getList()
      .then(response => this.setState({ todoList: response.data }))
      .catch(err => alert('No nos hemos podido comunicar con el servidor, intentalo nuevamente'))
    }

    handleChange= (e) => {
      this.setState({ sortBy: e.target.value })  
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

    sortedList = () => {
      const order = this.state.sortBy
      let todof = []
      let todol = []
      let todop = []
      let todoList = []
      
      if (order === "creation") {
        todoList = this.state.todoList.sort((todoA, todoB) => todoA.id < todoB.id);
      }

      if (order === "expiration") {
        todoList = this.state.todoList.sort((todoA, todoB) => new Date(todoA.date) > new Date(todoB.date));
      }

      if (order === "status") {
        this.state.todoList.forEach(todo => {
          if (todo.finished) { todof.push(todo) }
          else if (new Date(todo.date) > new Date()) { todop.push(todo) }
          else {todol.push(todo)}
        });
        todoList = todol.concat(todop,todof)
      }
      return todoList
    }  

  render() {
    const todoList = this.sortedList()
    return (
      <div>
        <Header title="Todo List"/>
        <Admin freeTodos={this.freeTodos} handleChange={this.handleChange}/>
        <TodoList todoList={todoList} handleCheck={this.handleCheck}/>
        <NewTodo addTodo={this.addTodo}/> 
      </div>
    );
  }
}

export default App;