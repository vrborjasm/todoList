import React, { Component } from 'react';

import Header from './components/Header'

class App extends Component {
  state={
    todolist: []
  }
  render() {
    return (
      <div>
        <Header title="Todo List"/>  
      </div>
    );
  }
}

export default App;