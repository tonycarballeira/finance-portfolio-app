import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';  
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";

const BuyStock = ({symbol, price}) => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    const [purchasedStocks, setPurchasedStocks] = useState([]);
    
    const [stock, setStock] = useState({
      name: {symbol},
      purchases: [{
        price: {price},
        quantity: 0
      }],
      userOwner: userID   
    });
  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuys = async () => {
            try {
              const response = await axios.get("http://localhost:3001/stocks/stocksPurchased");
              setPurchasedStocks(response.data);
            } catch (err) {
              console.log(err);
            }
    }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setStock({ ...stock, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post(
          "http://localhost:3001/stocks/new",
          { ...stock },
          {
            headers: { authorization: cookies.access_token },
          }
        );
        setPurchasedStocks([...purchasedStocks, stock]);
        alert("Stock Purchased");
        navigate("/portfolio");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="">
        <h2>Buy Stock</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantity">Amount</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={stock.quantity}
            onChange={handleChange}
          />
          <button type="submit">Buy</button>
        </form>
      </div>
    );
}

export default BuyStock
