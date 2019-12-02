import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Liberadas", "Pendientes", "Vencidas"],
        datasets: [
          {
            label: "Todos",
            data: [2,3,5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 86, 0.6)"
            ]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="chart">
        <Bar data={this.state.chartData} width={50} height={25} options={{
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
