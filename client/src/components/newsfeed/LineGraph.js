import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineGraph = () => {
  

    const data = [{
        x:10,
        y:0
    }, {
        x: 20,
        y: 60
    }]

    const options = {
       legend: {
            display: false
        },
        scales: {
            y: {
                min: 0,
                max: 10,
                
            },
            yAxes: {
                ticks: {
                    display: false
                }
            }
        }
    }

  return (
    <div className='linegraph'>
        
        <Line 
            data={{
                labels: ['', '', ''],
                datasets: [
                    {
                        type: "line",
                        borderColor: "",
                        borderWidth: 2,
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointHoverBackgroundColor: '#5AC53B',
                        pointHoverBorderColor: '#000000',
                        pointHoverBorderWidth: 4,
                        pointHoverRadius: 6,
                        data: [0, 5, 10]
                    }
                ]
            }}
            options={options}
        ></Line>
    </div>
  )
}

export default LineGraph
