import React, { Component } from 'react';

import Header from './components/Header'
import Admin from './components/Admin'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import api from './api';


class App extends Component {
  state={
    todoList: [],
    sortBy: 'creation',
    filterBy: 'all'
  }

  componentDidMount () {
    api.getList()
      .then(response => this.setState({ todoList: response.data }))
      .catch(err => alert('No nos hemos podido comunicar con el servidor, intentalo nuevamente'))
    }

    handleChange= (e) => {
      this.setState({ sortBy: e.target.value })  
  }

    handleChangeFilter= (e) => {
      this.setState({ filterBy: e.target.value })  
  }

    handleCheck = (oldTodo) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== oldTodo.id)
    todoList.push({ ...oldTodo, selected: !oldTodo.selected })
    this.setState({ todoList })
  }

  modifyDate = (e,oldTodo) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== oldTodo.id)
    this.setState({ todoList })
    api.patch(oldTodo.id, { date: e.target.value })
    .then(response => {
      this.setState({ todoList: this.includeInTodoList(response.data) });
    })
    .catch(err => {
      this.setState({ todoList: this.includeInTodoList({ ...oldTodo }) });
      alert('Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!');
    })
    
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

    sortedList = (todoList) => {
      const order = this.state.sortBy
      let todof = []
      let todol = []
      let todop = []
      
      if (order === "creation") {
        todoList = todoList.sort((todoA, todoB) => todoA.id < todoB.id);
      }

      if (order === "expiration") {
        todoList = todoList.sort((todoA, todoB) => new Date(todoA.date) > new Date(todoB.date));
      }

      if (order === "status") {
        todoList.forEach(todo => {
          if (todo.finished) { todof.push(todo) }
          else if (new Date(todo.date) > new Date()) { todop.push(todo) }
          else {todol.push(todo)}
        });
        
        todoList = todol.concat(todop,todof)
      }
      return todoList
    }  

    filteredList = () => {
      const filter = this.state.filterBy
      let todoList = []
      
      if (filter === "all") {
        todoList = this.state.todoList
      } else if (filter === "free") {
        todoList = this.state.todoList.filter(todo => todo.finished)
      } else if (filter === "pending") {
        todoList = this.state.todoList.filter(todo => !todo.finished && new Date(todo.date) > new Date())
      } else {
        todoList = this.state.todoList.filter(todo => !todo.finished && new Date(todo.date) < new Date())
      }

      return todoList
    }  

  render() {
    let todoList = this.filteredList()
    todoList = this.sortedList(todoList)
    return (
      <div>
        <Header title="Todo List"/>
        <Admin freeTodos={this.freeTodos} handleChange={this.handleChange} handleChangeFilter={this.handleChangeFilter}/>
        <TodoList todoList={todoList} handleCheck={this.handleCheck} modifyDate={this.modifyDate}/>
        <NewTodo addTodo={this.addTodo}/> 
      </div>
    );
  }
}

export default App;