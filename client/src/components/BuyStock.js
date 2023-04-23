import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';  
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";
import Card from './card/Card';

const BuyStock = ({symbol, price, details, name}) => {
    // const [s_price, setS_price] = useState(price);
    // const [s_symbol, setS_symbol] = useState(symbol);
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    const [purchasedStocks, setPurchasedStocks] = useState([]);
    
    const [stock, setStock] = useState({
      name: symbol,
      quantity: 0,
      value: price,
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
      
      // const purchases = [...stock.purchases];
      // purchases[0].quantity = value;
      // purchases[0].price = price;
      stock.quantity = value;
      setStock({ ...stock});
    };
  
    const handleSubmit = async (event) => {

      event.preventDefault();
      // const purchases = [...stock.purchases];
      // purchases[0].price = price;
      stock.name = symbol;
      stock.value = price;
      setStock({...stock});
      // setStock({ ...stock, purchases });

      try {
        if (purchasedStocks.filter(e => e.name === symbol).length > 0) {
          await axios.put(
            "http://localhost:3001/stocks/buy",
            { ...stock, userID },
            {
              headers: { authorization: cookies.access_token },
            }
          );   
          let theStock = purchasedStocks.filter(e => e.name === symbol)[0];
          console.log(theStock);
          
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
                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-600 border-teal-500 hover:border-teal-700 text-sm border-4 text-black py-1 px-2 rounded" type="submit">
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
            <div className='w-full flex flex-row justify-between'>
              <h1 className="text-purple-500">Portfolio</h1>
              <span><span className='text-purple-500'>Total:</span> ${price}</span>
            </div>
            
            <div class="flex flex-col justify-between w-full h-full">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                     
                      <thead
                        class="border-b bg-white font-medium ">
                        <tr>           
                          <th scope="col" class="px-6 py-4 text-purple-500">Stock</th>
                          <th scope="col" class="px-6 py-4 text-purple-500">Shares</th>
                          <th scope="col" class="px-6 py-4 text-purple-500">Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {purchasedStocks.map((stock) => {
                          return <tr class="border-b bg-neutral-100 ">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">{stock.name}</td>
                            <td class="whitespace-nowrap px-6 py-4">{stock.quantity}</td>
                            <td class="whitespace-nowrap px-6 py-4">${(Math.round((price * stock.quantity) * 100) / 100).toFixed(2)}</td>  
                          </tr>
                        })} 
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            

            
          </Card>
        </div>

        <div className='col-span-1 row-span-2'>
          <Card>
            <div className='w-full flex flex-row justify-between'>
              <h1 className="text-purple-500">Watchlist</h1>
              <span><span className='text-purple-500'>ADD:</span> ${price}</span>
            </div>
              
            <div class="flex flex-col justify-between w-full h-full">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light">
                     
                      <thead
                        class="border-b bg-white font-medium ">
                        <tr>           
                          <th scope="col" class="px-6 py-4 text-purple-500">Stock</th>
                          <th scope="col" class="px-6 py-4 text-purple-500">Shares</th>
                          <th scope="col" class="px-6 py-4 text-purple-500">Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {purchasedStocks.map((stock) => {
                          return <tr class="border-b bg-neutral-100 ">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">{stock.name}</td>
                            <td class="whitespace-nowrap px-6 py-4">{stock.quantity}</td>
                            <td class="whitespace-nowrap px-6 py-4">${(Math.round((price * stock.quantity) * 100) / 100).toFixed(2)}</td>  
                          </tr>
                        })} 
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

              
          </Card>
        </div>
      
      </>
      
      
    );
}

export default BuyStock
