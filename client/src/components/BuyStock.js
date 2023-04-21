import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';  
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";
import Card from './card/Card';

const BuyStock = ({symbol, price}) => {
    // const [stockName, setStockName] = useState(symbol);
    // const [stockPrice, setStockPrice] = useState(price);
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
  
    // const handleChange = (event) => {
    //   const quantity = event.target.value;
      
    // };

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
 
    return (
      <Card>
        <div className='w-full h-full flex flex-col justify-between'>
          <div className='w-full flex flex-row justify-between'>
            <h1>{symbol}</h1>
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
            <h1>Funds</h1>
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
      
    );
}

export default BuyStock
