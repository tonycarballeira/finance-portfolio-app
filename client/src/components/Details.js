import React from 'react'
import Card from './card/Card';


const Details = ({details}) => {
    const detailsList = {
        name: "Name",
        country: "country",
        currency: "currency",
        exchange: "exchange",
        ipo: "IPO Date",
        marketCapitalization: "Market Cap",
        finnnhubIndustry: "Industry"
    };

    const convertMillionToBillion = (number) => {
        return ( number / 1000).toFixed(2);
    };

  return (
    <Card>
        <ul className='w-full h-full flex-col justify-between divide-y-1'>
            {Object.keys(detailsList).map((item) => {
                return <li key={item} className='flex-1 flex justify-between items-center'>
                    <span>{detailsList[item]}</span>
                    <span>
                        {item === "marketCapitalization" ? 
                        `${convertMillionToBillion(details[item])}B` 
                        : details[item]}
                    </span>
                </li>
            })}
        </ul>
    </Card>
  )
}

export default Details
