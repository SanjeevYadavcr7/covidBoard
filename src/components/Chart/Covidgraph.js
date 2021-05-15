import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import numeral from "numeral";
import './Chart.css'

const options = {
  legend: {
    display: true,
    position:'top',
    align:'end',
    labels: {
        // usePointStyle: true,
        // padding:2,
        boxWidth:10,
    }
  },
  elements: {
    point: {
      radius:0,
    },
  },
  responsive:true,
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: true,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("0,0");
      },
    },
  },
  layout:{
    padding:{top:0,left:5,right:5,bottom:0}
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: { format: "MM/DD/YY", tooltipFormat: "ll",},
        ticks:{
            display:true,
            maxRotation:0,
            fontSize:10,
        },
        gridLines:{
            display:true,
            drawBorder:true,
        }
      },
    ],
    yAxes: [
      {
        offset:false,
        gridLines: {display: true,drawBorder:false},
        ticks: {
            min:0,
            padding:0,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {x: date,y: data[casesType][date]-lastDataPoint,};
      lastDataPoint = data[casesType][date];
      // console.log("Date = "+date+", "+casesType+" = "+data[casesType][date]-lastDataPoint);
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function Covidgraph(props) {
  const [data, setData] = useState({});
  const [deaths, setDeaths] = useState({});
  const [recovered, setRecovered] = useState({});
  let casesType="cases";
  let caseType2 = "deaths";
  let casesType3 = "recovered";
  let selCountry = props.country;
  // if(props.country = '')console.log("Country = Global");
  // else console.log("Country = "+props.country)
  useEffect(() => {
    const fetchData = async () => {
      let api = "https://disease.sh/v3/covid-19/historical/all?lastdays=50";
      if(props.country != ''){
        api = `https://disease.sh/v3/covid-19/historical/${props.country}?lastdays=50`;
      }
      await fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData;
          let deathChartData;
          let recoverChartData;
          if(props.country === ''){
            chartData = buildChartData(data, casesType);
            deathChartData = buildChartData(data, caseType2);
            recoverChartData = buildChartData(data, casesType3);  
          }
          else{
            chartData = buildChartData(data.timeline, casesType);
            deathChartData = buildChartData(data.timeline, caseType2);
            recoverChartData = buildChartData(data.timeline, casesType3);
          }
          setData(chartData);
          setDeaths(deathChartData);
          setRecovered(recoverChartData);
        });
    };
    fetchData();
  },[selCountry]);

  return (
    <div className="ChartBox">
      <p className="small-text">Global Covid Status</p>
      {(data.length > 0 && deaths.length > 0 && recovered.length) && (
        <Bar
          data={{
            datasets: [
              {
                backgroundColor: "rgba(146, 4, 255, 0.089)",
                borderColor: "rgb(153, 66, 252)",
                data: data,
                label:'Confirmed',
                fill:true,
                borderWidth:2,
                radius:0,
              },
              {
                backgroundColor: "#D1F2EB",
                borderColor: "#1ABC9C",
                data: deaths,
                label:'Deaths',
                fill:true,
                borderWidth:2,
                radius:0,
              },
              {
                backgroundColor: "rgba(255, 42, 42, 0.17)",
                borderColor: "#E74C3C",
                data: recovered,
                label:'Recovered',
                borderWidth:2,
                fill:true,
                radius:0,
              }
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Covidgraph;