import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PriceChart from "./Chart";
import { BeatLoader } from "react-spinners";

function Details({ setCurrency }) {
  const { cryptoId } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [chartDays, setChartDays] = useState(1);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`)
      .then((response) => setCryptoDetails(response.data))
      .catch((error) => console.log(error));
  }, [cryptoId]);

  if (!cryptoDetails) {
    return (
      <div className="p-4 min-h-screen flex justify-center mt-10">
        <BeatLoader />
      </div>
    );
  }
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white flex">
      <div className="ml-5">
        <div className="ml-40" onChange={handleCurrencyChange}>
          <img
            className="w-52 h-52 pt-6 py-5"
            src={cryptoDetails.image.large}
            alt={cryptoDetails.name}
          />
          <p className="font-bold text-5xl">{cryptoDetails.name}</p>
        </div>
        <p className="max-w-[505px] py-6">
          {cryptoDetails.description.en.split(". ")[0]}.
        </p>
        <p className="font-bold pb-5">RANK: {cryptoDetails.market_cap_rank}</p>
        <p className="font-bold pb-5">
          Current Price: ${cryptoDetails.market_data.current_price.usd}
        </p>
        <p className="font-bold">
          Market Cap: ${cryptoDetails.market_data.market_cap.usd}
        </p>
      </div>
      <div className="w-[2px] bg-[#808080] h-[787px] ml-4"></div>
      <div className="">
        <div className="ml-10 my-10">
          <PriceChart cryptoId={cryptoId} days={chartDays}></PriceChart>
        </div>

        <div className="flex pl-10 gap-6">
          <button
            onClick={() => setChartDays(1)}
            className="w-[204px] h-[41px] border font-bold text-white rounded-md border-[#87CEEB] hover:bg-[#87CEEB] hover:text-black"
          >
            24 Hours
          </button>
          <button
            onClick={() => setChartDays(30)}
            className="w-[204px] h-[41px] border font-bold text-white rounded-md border-[#87CEEB] hover:bg-[#87CEEB] hover:text-black"
          >
            30 Days
          </button>
          <button
            onClick={() => setChartDays(90)}
            className="w-[204px] h-[41px] border font-bold text-white rounded-md border-[#87CEEB] hover:bg-[#87CEEB] hover:text-black"
          >
            3 Months
          </button>
          <button
            onClick={() => setChartDays(365)}
            className="w-[204px] h-[41px] border font-bold text-white rounded-md border-[#87CEEB] hover:bg-[#87CEEB] hover:text-black"
          >
            1 Year
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
