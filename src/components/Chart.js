import React, { Component } from "react";
import { Doughnut  } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
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
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 86, 0.6)"
            ]
          }
        ]}
        this.setState({chartData})
  }, 3000);

  
  render() {
    return (
      <div className="chart">
        <Doughnut  data={this.state.chartData} width={150} height={35} options={{
            title:{
                display:true,
                text:"Todo's",
                fontSize:25
            },
            legend:{
                display:false,
                position: 'right'
            }    
        }} />
      </div>
    );
  }
}

export default Chart;
