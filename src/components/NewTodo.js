import React, { Component } from 'react';

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
                <div className="card">
                    <div className="card-body">
            { error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios</div> : null }
                        <div className="row">
                            <form onSubmit={this.handleSubmit} className="col-lg-12">
                                <div className="row">
                                    <div className="form-group col-lg-7">
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Cosa por hacer" 
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.todo.description}
                                        />
                                    </div> 


                                    <div className="form-group col-lg-3">
                                            <input 
                                            type="date" 
                                            className="form-control" 
                                            name="date"
                                            onChange={this.handleChange}
                                            value={this.state.todo.date}
                                            />
                                    </div> 
                                    <div className="col-lg-2">
                                        <input type="submit" className="py-3 mt-2 btn btn-success btn-block" value="Agregar Todo"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTodo;

