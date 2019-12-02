import React, { Component } from "react";

import Header from "./components/Header";
import Admin from "./components/Admin";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import Chart from "./components/Chart";
import api from "./api";

class App extends Component {
  state = {
    todoList: [],
    sortBy: "creation",
    filterBy: "all",
    countTodos: []
  };

  componentDidMount() {
    api
      .getList()
      .then(response => this.setState({ todoList: response.data }))
      .catch(err =>
        alert(
          "No nos hemos podido comunicar con el servidor, intentalo nuevamente"
        )
      );
  }

  time = setInterval(() => {
    this.state.todoList.forEach(todo => {
      const todoList = this.state.todoList.filter(compareTodo => compareTodo.id !== todo.id);
      this.setState({ todoList });
      const newStatus = this.checkStatus(todo.date, todo.status)
      if (todo.status !== newStatus) {
        api
        .patch(todo.id, {
          status: newStatus
        })
        .then(response => {
          this.setState({ todoList: this.includeInTodoList(response.data) });
        })
        .catch(err => {
          this.setState({ todoList: this.includeInTodoList({ ...todo }) });
          alert(
            "Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!"
          );
        });
      } else {
        todoList.push(todo);
        this.setState({ todoList });
      }
    })
  }, 30000);

  count = setInterval(() => {
    let done = 0;
    let alarm = 0;
    let warning = 0;
    this.state.todoList.forEach(todo => {
      if (todo.status === 'done'){done++}
      if (todo.status === 'alarm'){alarm++}
      if (todo.status === 'warning'){warning++}
    })
    let countTodos = [done,alarm,warning]
    this.setState({countTodos})
  }, 10000);

  handleChangeSort = e => {
    this.setState({ sortBy: e.target.value });
  };

  handleChangeFilter = e => {
    this.setState({ filterBy: e.target.value });
  };

  handleCheck = oldTodo => {
    const todoList = this.state.todoList.filter(todo => todo.id !== oldTodo.id);
    todoList.push({ ...oldTodo, selected: !oldTodo.selected });
    this.setState({ todoList });
  };

  modifyDate = (e, oldTodo) => {
    const todoList = this.state.todoList.filter(todo => todo.id !== oldTodo.id);
    this.setState({ todoList });
    api
      .patch(oldTodo.id, {
        date: e.target.value,
        status: this.checkStatus(e.target.value, oldTodo.status)
      })
      .then(response => {
        this.setState({ todoList: this.includeInTodoList(response.data) });
      })
      .catch(err => {
        this.setState({ todoList: this.includeInTodoList({ ...oldTodo }) });
        alert(
          "Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!"
        );
      });
  };

  includeInTodoList = todo => {
    const todoList = this.state.todoList.map(todo => ({ ...todo }));
    todoList.push(todo);

    return todoList;
  };

  freeTodos = () => {
    const todoList = [];

    this.state.todoList.forEach(todo => {
      if (todo.selected) {
        api
          .patch(todo.id, { finished: true, status: "done" })
          .then(response => {
            this.setState({ todoList: this.includeInTodoList(response.data) });
          })
          .catch(err => {
            this.setState({ todoList: this.includeInTodoList({ ...todo }) });
            alert(
              "Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!"
            );
          });
      } else {
        todoList.push({ ...todo });
      }
    });

    this.setState({ todoList });
  };

  checkStatus = (date, status) => {
    if (status !== "done") {
      if (status !== "alarm" && new Date(date) > Date.now()) {
        return "alarm";
      } else if (status !== "warning" && new Date(date) < Date.now()) {
        return "warning";
      }
    }
    return status;
  };

  addTodo = todo => {
    api
      .post({ ...todo, status: this.checkStatus(todo.date, todo.status) })
      .then(response => {
        this.setState({ todoList: this.includeInTodoList(response.data) });
      })
      .catch(err => {
        alert(
          "Hubo un problema conectando al servidor. Intentalo de nuevo mas tarde!"
        );
      });
  };

  deleteTodo = id => {
    api
      .delete(id)
      .then(responde => {
        const todoList = this.state.todoList.filter(todo => todo.id !== id);
        this.setState({ todoList });
      })
      .catch(err => {
        alert(
          "Hubo un problema conectando con el servidor. Intentelo de nuevo mas tarde"
        );
      });
  };

  sortedList = todoList => {
    const order = this.state.sortBy;
    let todof = [];
    let todol = [];
    let todop = [];

    if (order === "creation") {
      todoList = todoList.sort((todoA, todoB) => todoA.id < todoB.id);
    } else if (order === "expiration") {
      todoList = todoList.sort(
        (todoA, todoB) => new Date(todoA.date) > new Date(todoB.date)
      );
    } else {
      todoList.forEach(todo => {
        if (todo.finished) {
          todof.push(todo);
        } else if (new Date(todo.date) > new Date()) {
          todop.push(todo);
        } else {
          todol.push(todo);
        }
      });

      todoList = todol.concat(todop, todof);
    }
    return todoList;
  };

  filteredList = () => {
    const filter = this.state.filterBy;
    let todoList = [];

    if (filter === "all") {
      todoList = this.state.todoList;
    } else if (filter === "free") {
      todoList = this.state.todoList.filter(todo => todo.finished);
    } else if (filter === "pending") {
      todoList = this.state.todoList.filter(
        todo => !todo.finished && new Date(todo.date) > new Date()
      );
    } else {
      todoList = this.state.todoList.filter(
        todo => !todo.finished && new Date(todo.date) < new Date()
      );
    }

    return todoList;
  };

  render() {
    let todoList = this.filteredList();
    todoList = this.sortedList(todoList);
    return (
      <div>
        <Header title="todoList" />
        <Admin
          freeTodos={this.freeTodos}
          handleChangeSort={this.handleChangeSort}
          handleChangeFilter={this.handleChangeFilter}
        />
        <TodoList
          todoList={todoList}
          handleCheck={this.handleCheck}
          modifyDate={this.modifyDate}
          deleteTodo={this.deleteTodo}
          changeStatus={this.changeStatus}
        />
        <NewTodo addTodo={this.addTodo} />
        <Chart countTodos={this.state.countTodos}/>
      </div>
    );
  }
}

export default App;
