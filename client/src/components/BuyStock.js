import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';  
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";

const BuyStock = ({symbol, price}) => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    
    const [stock, setStock] = useState({
      name: {symbol},
      purchases: [{
        price: {price},
        quantity: 0
      }]   
    });
  
    const navigate = useNavigate();
  
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
