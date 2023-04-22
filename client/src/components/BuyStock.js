import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';  
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";
import Card from './card/Card';

const BuyStock = ({symbol, price, details, name}) => {

    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    const [purchasedStocks, setPurchasedStocks] = useState([]);
    
    const [stock, setStock] = useState({
      name: symbol,
      purchases: [{
        price: price,
        quantity: 0
      }],
      userOwner: userID   
    });
  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuys = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/stocks/${userID}`);
            setPurchasedStocks(response.data);

          } catch (err) {
            console.log(err);
          }
        };
        fetchBuys();
    }, []);

    const handleChange = (event) => {
      const value = Number(event.target.value);
      
      const purchases = [...stock.purchases];
      
      purchases[0].quantity = value;
      setStock({ ...stock, purchases });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        if (purchasedStocks.filter(e => e.name === symbol).length > 0) {
          await axios.put(
            "http://localhost:3001/stocks/buy",
            { ...stock, userID },
            {
              headers: { authorization: cookies.access_token },
            }
          );     
          
          alert("Stock Purchased");
        } else {
          
          await axios.post(
            "http://localhost:3001/stocks/new",
            { ...stock, userID },
            {
              headers: { authorization: cookies.access_token },
            }
          );
          setPurchasedStocks(purchasedStocks => [...purchasedStocks, stock]);
          console.log(purchasedStocks);
          alert("Stock Purchased");
        }
      } catch (error) {
        console.error(error);
      }
    
          
    };

    const detailsList = {
      name: "Name",
      country: "country",
      currency: "currency",
      exchange: "exchange",
      ipo: "IPO Date",
      marketCapitalization: "Market Cap",
      finnhubIndustry: "Industry"
  };

  const convertMillionToBillion = (number) => {
      return ( number / 1000).toFixed(2);
  };
 
    return (
      <>
        <div className='col-span-1 md:col-span-1 xl:col-span-1 row-span-2 md:h-full xl:h-full '>
          <Card>
          
            <div className='w-full h-full flex flex-col justify-between'>
              <div className='w-full flex flex-row justify-between'>
                <h1 className="text-purple-500">{name}</h1>
                <h1>${price}</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <input type="number"
                  id="quantity"
                  name="purchases.quantity"
                  onChange={handleChange} 
                  className="shadow appearance-none border border-teal-500 rounded w-full py-2 
                  px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Amount">
                </input>
                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-600 border-teal-500 hover:border-teal-700 text-sm border-4 text-black py-1 px-2 rounded" type="button">
                  Buy
                </button>
              </form>
            

            
              <div className='w-full flex flex-row justify-between'>
                <h1 className="text-purple-500">Funds</h1>
                <h1>Shares:</h1>
                <h1>Total: ${price}</h1>
              </div>
              <form onSubmit={handleSubmit}>
              <input type="number"
                  id="quantity"
                  name="purchases.quantity"
                  onChange={handleChange} 
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 
                  px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Amount">
                </input>
                <button className="flex-shrink-0 bg-red-400 hover:bg-red-700 border-red-400 hover:border-red-700 text-sm border-4 text-black py-1 px-2 rounded" type="button">
                  Sell
                </button>
              </form>
            </div>
          </Card>
        </div>
        

        <div className='col-span-1 row-span-2'>   
          <Card>
            <ul className='w-full h-full flex flex-col justify-between divide-y-1 overflow-y-scroll pr-2'>
              <li className='flex-1 flex justify-between items-center'>
                <span className='text-purple-500'>Portfolio</span>
                <span className=''>Total: ${price}</span>
              </li>
              {purchasedStocks.map((stock) => {
                  return <li key={stock} className='flex-1 flex justify-between items-center'>
                  <span>{stock.name}</span>
                  <span>
                      {stock.purchases[0].price * stock.purchases[0].quantity}
                  </span>
                </li>
              })}
            </ul> 
          </Card>
        </div>

        <div className='col-span-1 row-span-2'>
          <Card>
              
                <ul className='w-full h-full flex flex-col justify-between divide-y-1 overflow-y-scroll pr-2'>
                <li className='flex-1 flex justify-between items-center'>
                  <span className='text-purple-500'>Watchlist</span>
                  <span className=''>ADD: </span>
                </li>
                
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
        </div>
      
      </>
      
      
    );
}

export default BuyStock
