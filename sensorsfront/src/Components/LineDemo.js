import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

let hum = [];
let temp = [];
let labelHum = [];
let labelTemp = [];
const humedad = {
  labels: labelHum,
  datasets: [
    {
      label: 'Datos de humedad',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: hum
    }
  ]
};
const temperatura = {
  labels: labelTemp,
  datasets: [
    {
      label: 'Datos de temperatura',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(250,92,92,0.4)',
      borderColor: 'rgba(250,92,92,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(250,92,92,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(250,92,92,1)',
      pointHoverBorderColor: 'rgba(250,92,92,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: temp
    }
  ]
};

export default class LineDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hum: [],
      temp: []
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8085/history/sensor/1`)
      .then(res => {
        res.data.map(function (item) {
          hum.push(item.value);
          let date = new Date(item.createdAt);
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let time = `${hours} : ${minutes} hrs`;
          labelHum.push(time);
        });
        this.setState({ hum });
      });

    axios.get(`http://localhost:8085/history/sensor/2`)
      .then(res => {
        res.data.map(function (item) {
          temp.push(item.value);
          let date = new Date(item.createdAt);
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let time = `${hours} : ${minutes} hrs`;

          labelTemp.push(time);
          return temp, labelTemp
        });
        console.log(labelTemp);
        this.setState({ temp });
      });
  }
  render() {
    return (
      <div style={{ height: '10%' }}>
        <h2>Grafica de humedad</h2>
        <Line ref="chart"
          data={humedad}
        />
        <Line ref="chart"
          data={temperatura} />
      </div>
    );
  }


}