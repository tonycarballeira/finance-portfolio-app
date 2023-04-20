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
        <div className='w-full h-full flex flex-col justify-between divide-y-1'>
          <h2>Buy</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity">Amount</label>
            <input
              type="number"
              id="quantity"
              name="purchases.quantity"
              onChange={handleChange}
            />
            <button type="submit">Buy</button>
          </form>
        

        
          <h2>Sell</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity">Amount</label>
            <input
              type="number"
              id="quantity"
              name="purchases.quantity"
              onChange={handleChange}
            />
            <button type="submit">Sell</button>
          </form>
        </div>
      
      
      </Card>
      
    );
}

export default BuyStock
