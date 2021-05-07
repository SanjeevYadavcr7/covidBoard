import React,{ useState, useEffect } from 'react';
import CovidApi from '../../api/CovidApi';
import {Line, Bar} from 'react-chartjs-2';
import './Chart.css';

const Chart = ({data:{confirmed,deaths,recovered}, country}) => {
    
    const [dailyData,setDailyData] = useState([]);
    useEffect(() =>{
      const fetchAPI = async() =>{
        setDailyData(await CovidApi.fetchDailyData());
      }

      fetchAPI();
    },[]);
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'];

    const lineChart = (
        (dailyData.length > 0)
        ? (
        <Line
          data={{
          labels:dailyData.map(({date}) => month[new Date(date).getMonth()]+"'"+new Date(date).getFullYear()%100),
          datasets:[
            {
            data:dailyData.map(({confirmed}) => confirmed),
            label:'Infected',
            tension:0,
            borderColor:'#3333ff',
            fill:true,
            borderWidth: 2,
            radius:0,
            pointHitRadius: 7,
    
            },
            {
            data:dailyData.map(({deaths}) => deaths),
            label:'Deaths',
            borderColor:'red',
            backgroundColor:'rgba(255,0,0,0.5)',
            fill:true,
            borderWidth: 2,
            radius:0,
            pointHitRadius: 7,
            }]
        }}
    
        options = {{ responsive: true,maintainAspectRatio: false,
          layout:{
            padding:{top:0,left:15,right:40,bottom:10}
          },
          scales: {
              xAxes: [{
                ticks: { display: true,
                  fontSize: 14,
                  maxRotation:0,
                  padding: 10,
                  labelOffset: 0,
                  min: "29 Oct'20",
                },
                gridLines: {display: false,drawBorder: false}
                }],
              yAxes: [{
                ticks: { display: true, },
                gridLines: {display: true,drawBorder: false}
                }]
              }
    
            }}
    
        />): null
        );
    
    
    const barChart = (
      confirmed?(
        <Bar
          data={{
            labels:['Infected','Reccovered','Deaths'],
            datasets: [{
              label:'People',
              backgroundColor:[
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)',
              ],
              data:[confirmed.value,recovered.value,deaths.value]
            }]
          }}
          options={{
            legend:{display:false},
            title: {display:true, text:`Current state in ${country}`}
          }}
          width={100}
        height={30}
        />
      ) : null
    );
    

    return (
        <div className="ChartBox">
            <p className="small-text">Covid Status Data</p>
            <div className="actualChartbox">
              {country ? barChart : lineChart}
            </div>
        </div>
    )
}

export default Chart;
