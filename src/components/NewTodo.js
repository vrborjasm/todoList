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
            <div> 

            { error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios</div> : null }

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-8 col-lg-10">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Cosa por hacer" 
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.todo.description}
                            />
                        </div>
                    </div> {/*Fin de form*/}


                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Date</label>
                        <div className="col-sm-8 col-lg-4">
                            <input 
                            type="date" 
                            className="form-control" 
                            name="date"
                            onChange={this.handleChange}
                            value={this.state.todo.date}
                            />
                        </div>
                    </div> {/*Fin de form*/}

                    <input type="submit" className="py-3 mt-2 btn btn-success btn-block" value="Agregar Nueva Cita"/>

                </form>
            </div>
        );
    }
}

export default NewTodo;

