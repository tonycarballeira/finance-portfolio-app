import React, {useContext, useEffect} from 'react'
import { useState } from 'react'
import { convertUnixTimestampToDate, convertDateToUnixTimestamp, createDate } from '../helpers/date-helper';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Card from './card/Card';
import ChartFilter from './ChartFilter';
import { chartConfig } from '../constants/config';  
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';



const Chart = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W");

    const {stockSymbol} = useContext(StockContext);

    useEffect(() => {
        const getDateRange = () => {
            const { days, weeks, months, years } = chartConfig[filter];
      
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
      
            const startTimestampUnix = convertDateToUnixTimestamp(startDate);
            const endTimestampUnix = convertDateToUnixTimestamp(endDate);
            
            console.log(chartConfig[filter].resolution);
            return { startTimestampUnix, endTimestampUnix };
          };
      

        const updateChartData = async () => {
            try {
              const { startTimestampUnix, endTimestampUnix } = getDateRange();
              const resolution = chartConfig[filter].resolution;
              const result = await fetchHistoricalData(
                stockSymbol,
                resolution,
                startTimestampUnix,
                endTimestampUnix
              );
              console.log(endTimestampUnix);
              setData(formatData(result));
            } catch (error) {
              setData([]);
              console.log(error);
            }
          };
      
          updateChartData();
        }, [stockSymbol, filter]);  

    const formatData = (data) => {
        return data.c.map((item, index) => {
            return {
                value: item.toFixed(2),
                date: convertUnixTimestampToDate(data.t[index]),
            };
        });
    };

  return (
    <Card>
        <ul className='flex top-2 right-2 z-40'>
            {Object.keys(chartConfig).map((item) => {
                return (
                <li key={item}>
                    <ChartFilter text={item} active={filter === item} onCLick={() => {
                        setFilter(item);
                    }}/>
                </li>)
            })}
        </ul>
        <ResponsiveContainer>
            <AreaChart data={data} margin={{
                    top: 20, right: 20, bottom: 50, left: 20,
                }}>
                <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="gray"
                fillOpacity={1} strokeWidth={0.5} fill="url(#chartColor)"/>
                <Tooltip />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin", "dataMax"]}/>
            </AreaChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart
