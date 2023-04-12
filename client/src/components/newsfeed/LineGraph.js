import React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './linegraph.css'
import 'chartjs-adapter-moment';

const LineGraph = () => {

    const [graphLabels, setGraphLabels] = useState([]);
    const [graphData, setGraphData] = useState([]);

   
    
    console.log(graphData[0]);

    const data =  {
        labels: ['01/23/87', '01/23/88', '01/23/89', '01/23/90'],
        datasets: [
            {
                type: "line",
                data: [0, 5, 2, 10],
                borderColor: "",
                borderWidth: 2,
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBackgroundColor: '#5AC53B',
                pointHoverBorderColor: '#000000',
                pointHoverBorderWidth: 4,
                pointHoverRadius: 6
            }
        ]
    }


    const options = {
        responsive: true,
        plugins: { 
            legend: { display: false },
            tooltip: {
                mode:"index",
                instersect: false
            }
        }, 
        scales: {
            y: {
                min: 0,
                max: 10,
                grid: {
                    display: false,
                    index: false
                },
                border: {
                    display: false
                },
                ticks: {
                    display: false,
                }
                
            },
            x: {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'
                },
                grid: {
                    display: false,
                    index: false,
                    drawBorder: false
                },
                border: {
                    display: false
                },
                ticks: {
                    display: false,
                  }
            }
        }
    }

  return (
    <div className='linegraph'>
        
        <Line 
            data={data}
            options={options}
        ></Line>
    </div>
  )
}

export default LineGraph
