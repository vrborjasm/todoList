import React, { Component } from "react";
import { Doughnut  } from "react-chartjs-2";

import "./Chart.css"

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      display: 'd-none'
    };
  }
  
  count = setInterval(() => {
    const chartData = {
        labels: ["Liberadas", "Pendientes", "Vencidas"],
        datasets: [
          {
            label: "Todos",
            data: this.props.countTodos,
            backgroundColor: [
              "rgba(0, 255, 0, 0.6)",
              "rgba(255, 255, 0, 0.6)",
              "rgba(255, 0, 0, 0.6)"
            ]
          }
        ]}
        this.setState({chartData})
  }, 3000);

  handleDisplayButton = () => {
    if (this.state.display == 'd-none') {
      this.setState({ display: 'd-block' });
    } else {
      this.setState({ display: 'd-none' });
    }
  };

  render() {
    return (
      <div>
        <div className={this.state.display}>
        <Doughnut  data={this.state.chartData} width={150} height={50} options={{

            title:{
                display:true,
                text:"Todo's",
                fontSize:25
            },
            legend:{
                display:true,
                position: 'bottom'
            }    
        }} />
        </div>
        <button class="btn mx-auto my-2 d-block btn-secondary bmd-btn-fab m" onClick={this.handleDisplayButton}><i class="material-icons">pie_chart</i></button>
      </div>
    );
  }
}

export default Chart;
