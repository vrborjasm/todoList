import React, { Component } from 'react';

class Sort extends Component {
    state={
        value: 'creation'
    }
    
    handleChange= (e) => {
        const value = e.target.value
        this.setState({
            value
        })
        this.props.sortBy(value)
    }


    render() {
        return (
            <div className="col-lg-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Orden</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01" onChange={this.handleChange}>
                        <option selected value="creation">Fecha de creacion</option>
                        <option value="expiration">Fecha de vencimiento</option>
                        <option value="status">Estado</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Sort;