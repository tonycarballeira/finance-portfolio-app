import React, {useContext, useState, useEffect} from 'react'
import { mockCompanyDetails } from '../../constants/mock';
import Header from '../Header';
import Details from '../Details';
import Overview from '../Overview';
import Chart from '../Chart';
import StockContext from '../../context/StockContext';
import { fetchStockDetails } from '../../api/stock-api';

const Dashboard = () => {

  const {stockSymbol} = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});


  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (err){
        setStockDetails({});   
        console.log(err);
      }
    }

    const updateStockOverview = async () => {}

  }, [stockSymbol])

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
    grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand bg-neutral-100">
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={mockCompanyDetails.name}/>
      </div>
      <div className='md:col-span-2 row-span-4'>
        <Chart />
      </div>
      <div>
        <Overview symbol={mockCompanyDetails.ticker} 
        price={300} 
        change={30} 
        changePercent={10.0}
        currency={"USD"} />
      </div>
      <div className='row-span-2 xl:row-span-3 xl:h-full h-fit'>
        <Details details={mockCompanyDetails}/>
      </div>
    </div>
  )
}

export default Dashboard
