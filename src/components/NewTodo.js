import React, { Component } from 'react';

import './NewTodo.css';

const iniState = {
    todo: {
        description: '',
        date: ''
    },
    error: false
 }

class NewTodo extends Component {
    state = {...iniState}

    handleChange = (e) => {
        this.setState({
            todo: {
                ...this.state.todo,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { description, date } = this.state.todo;
        if (description === '' || date === '' ){
            this.setState({
                error: true
            });
            return
        }
        const newTodo = { ...this.state.todo };
        this.props.addTodo(newTodo)
        this.setState({
            ...iniState
        })
    }

    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="card mt-2 mb-2 px-1 py- offset-lg-1 col-lg-10">
                        <div className="card-body px-1 py-1">
                { error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios</div> : null }
                            <div className="row">
                                <form onSubmit={this.handleSubmit} className="col-lg-12 mb-0">
                                    <div className="row">
                                        <div className="form-group offset-lg-1 col-lg-6 my-auto pl-0">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Cosa por hacer" 
                                            name="description"
                                            onChange={this.handleChange}
                                            value={this.state.todo.description}
                                            />
                                        </div> 


                                        <div className="form-group col-lg-3 my-auto">
                                                <input 
                                            type="date" 
                                            className="form-control date_input d-inline-block" 
                                            name="date"
                                            onChange={this.handleChange}
                                            value={this.state.todo.date}
                                            />
                                            <i class="material-icons">calendar_today</i>
                                        </div> 
                                        <div className="col-lg-2 text-center my-auto">
                                            <button type="submit" class="btn btn-secondary bmd-btn-fab"><i class="material-icons">add</i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        );
    }
}

export default NewTodo;

