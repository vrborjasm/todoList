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

    handleChange= (e) => {
      const status = e.target.value
      this.sortBy(status)
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

    sortBy = (order="creation") => {
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
        todof = this.state.todoList.filter(todo => todo.finished)
        todop = this.state.todoList.filter(todo => (new Date(todo.date) > new Date()) && !todo.finished)
        todol = this.state.todoList.filter(todo => (new Date(todo.date) < new Date()) && !todo.finished)
        todoList = todol.concat(todop,todof)
      }

      this.setState({
        todoList: todoList
      }) 
    }  

  render() {
    
    return (
      <div>
        <Header title="Todo List"/>
        <Admin freeTodos={this.freeTodos} handleChange={this.handleChange}/>
        <TodoList todoList={this.state.todoList} handleCheck={this.handleCheck}/>
        <NewTodo addTodo={this.addTodo}/> 
      </div>
    );
  }
}

export default App;