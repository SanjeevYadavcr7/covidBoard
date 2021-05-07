import React,{useEffect, useCallback, useState} from 'react';
import numeral from 'numeral';
import {sortData} from '../../util';
import './RightCompo.css';

function StatusRightCompo(props) {
    const {data, countryData} = props;
    const isFetching = false;
    const {active, recovered, deaths,todayCases,todayDeaths,todayRecovered} = data;
    const x = todayCases/1000;
    const y = todayRecovered/1000;
    const z = todayDeaths/1000;

    const [arrayData,setArrayData] = useState([]);

    const getData = useCallback(() => {
            let mostInfected = [];
            countryData.map((rowData) => {
            var obj = {
                "country":rowData.country,
                "cases":rowData.active+rowData.recovered+rowData.deaths,
                }
            mostInfected.push(obj);
            })
            mostInfected = sortData(mostInfected).slice(0,5);        
           setArrayData(mostInfected);
    })

    useEffect(() => {
        getData();
    },[])
    let i = 0;
    let j = 2;
    return (
        <div className="RightCompo">
            <div className="helplineBox status_helplineBox">
                <p className="head-text">Global Covid Status</p>
                <div className="numBox1">
                    <p className="p11">
                        <span className="p01">Active cases</span>
                        <span className="p001"> +
                            {(!isFetching) ? x : ''}k
                        </span><br/>
                        <span className="p12">{ (!isFetching) ? numeral(active).format('0,0') : ''}</span>
                    </p>
                </div>
                <div className="numBox2">
                    <p className="p11">
                        <span className="p01 greenClass">Recovered </span>
                        <span className="p001 greenClass"> +
                            {(!isFetching) ? y : ''}k
                        </span><br/>
                        <span className="p12 greenClass">{ (!isFetching) ? numeral(recovered).format('0,0') : ''}</span>
                    </p>
                </div>
                <div className="numBox3">
                    <p className="p11">
                        <span className="p01 redClass">Death cases</span>
                        <span className="p001 redClass"> +
                            {(!isFetching) ? z : ''}k
                        </span><br/>
                        <span className="p12 redClass">{(!isFetching) ? numeral(deaths).format('0,0') : ''}</span>
                    </p>
                </div>
            </div>
            <div className="newsBoxs ">
                <p className="head-text">Most Infected Countries</p>
                {
                    (arrayData.length) ? 
                    arrayData.map((rowData, key) => {
                        return(
                            <div className="news" key={rowData.country}>
                                    <span className={`dot${++i}`}><span className={`dot${i}${j}`}></span></span>
                                <p><strong>{rowData.country}</strong> - {numeral(rowData.cases).format('0,0')}</p>
                            </div>
                        )
                    }) : ''
                }
                <p className="head-text"><small>* Total confirmed cases</small></p>                
            </div>
        </div>
    )
}

export default StatusRightCompo
