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

  freeTodos = () => {
    let todoList=[]
    this.state.todoList.forEach(todo => {
      todo = (todo.selected) ? { ...todo, finished: true } : { ...todo }
      todoList.push(todo) 
    });
    this.setState({ todoList })
  }

  addTodo = (todo) => {
    const todoList = [...this.state.todoList, todo];
    this.setState({
        todoList
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