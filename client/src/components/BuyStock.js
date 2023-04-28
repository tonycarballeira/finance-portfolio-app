import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';  
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";
import Card from './card/Card';
import { fetchQuote } from '../api/stock-api';

const BuyStock = ({symbol, price, details, name}) => {
    // const [s_price, setS_price] = useState(price);
    // const [s_symbol, setS_symbol] = useState(symbol);
    const stateRef = React.useRef().current
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    const [purchasedStocks, setPurchasedStocks] = useState([]);

    const [sumTotal, setSumTotal] = useState(0);
    
    const [stock, setStock] = useState({
      name: symbol,
      symbol: name,
      currentPrice: 0,
      quantity: 0,
      value: price,
      userOwner: userID   
    });
  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuys = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/stocks/${userID}`);
            
            let stocks = response.data;
            
            stocks.map(async(x)  => {           
              apiCall(x.symbol).then((result) => {
                x.cats = result.pc;                           
              });     
              console.log(x, "hilo");    
            });
            console.log(stocks, "cats");
            setPurchasedStocks(stocks);
            
            
          } catch (err) {
            console.log(err);
          }
        };

        const apiCall = async (sym) => {
          try {
            const result =  await fetchQuote(sym);
            return result;
          }catch (err){  
            console.log(err);
          }

        };     

        fetchBuys();
        
    }, []);

  useEffect(()   => {
   
    let sum = 0;
    purchasedStocks.map((x) => {
      sum = sum + x.value;
    });
    setSumTotal(sum);
      
  }, [purchasedStocks]);



    console.log(stock);

    

    const handleChange = (event) => {

      const value = Number(event.target.value);
      stock.quantity = value;
      setStock({ ...stock});
      console.log(sumTotal);
    };
  
    const handleSubmit = async (event) => {

      event.preventDefault();
      stock.name = symbol;
      stock.value = price;
      stock.symbol = name;
      setStock({...stock});

      try {
        if (purchasedStocks.filter(e => e.name === symbol).length > 0) {
          await axios.put(
            "http://localhost:3001/stocks/buy",
            { ...stock, userID },
            {
              headers: { authorization: cookies.access_token },
            }
          );   
         
          const total = stock.quantity * price;  
          const stocks = [...purchasedStocks];

          stocks.map((x) => {
            if(x.name == symbol) {
              x.quantity = x.quantity + stock.quantity;
              x.value = x.value + total;
            }
          })
          
          setPurchasedStocks(stocks); 
          setSumTotal(sumTotal => sumTotal + total);        
          alert("Stock Purchased");
        } else {
          
          await axios.post(
            "http://localhost:3001/stocks/new",
            { ...stock, userID },
            {
              headers: { authorization: cookies.access_token },
            }
          );
          const total = stock.quantity * price;
          setPurchasedStocks(purchasedStocks => [...purchasedStocks, stock]);
          setSumTotal(sumTotal => sumTotal + total);
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
  if(purchasedStocks.length > 0){
    console.log(purchasedStocks[0]["currentPrice"], purchasedStocks[0], "dogs");
    console.log(Object.keys(purchasedStocks[0]), "birds");
  }
  
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
              <span><span className='text-purple-500'>Total:</span> ${(Math.round((sumTotal) * 100) / 100).toFixed(2)}</span>
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
                          console.log(stock,"this is my stock");
                          console.log(stock.currentPrice);
                          console.log(stock.quantity);
                          console.log(stock.name);
                          console.log(stock.cats, "happening");
                          

                          return <tr class="border-b bg-neutral-100 ">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">{stock.name}</td>
                            <td class="whitespace-nowrap px-6 py-4">{stock.quantity}</td>
                
                            <td class="whitespace-nowrap px-6 py-4">${(Math.round((stock.currentPrice * stock.quantity) * 100) / 100).toFixed(2)}</td>  
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
