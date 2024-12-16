import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
export default function CryptoCarousel() {
  const [cryptos, setCryptos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((response) => {
        setCryptos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNavigate = (cryptoId) => {
    navigate(`/details/${cryptoId}`);
  };

  const cryptoTemplate = (crypto) => {
    return (
      <div
        className="border-1 surface-border rounded-lg p-4 shadow-md text-center  cursor-pointer"
        onClick={() => handleNavigate(crypto.id)}
      >
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-20 h-20 mx-auto mb-2"
        />
        <div className="flex items-center gap-3 justify-center">
          <h4 className="text-lg font-semibold mt-2 text-white">
            {crypto.name}
          </h4>
          <p
            className={`mt-2 ${
              crypto.price_change_percentage_24h >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <p className="text-white mt-1 font-medium">{crypto.current_price}</p>
      </div>
    );
  };

  return (
    <div className="p-2 rounded-lg mt-6">
      <Carousel
        value={cryptos}
        numVisible={4}
        numScroll={2}
        circular
        autoplayInterval={2000}
        itemTemplate={cryptoTemplate}
      />
    </div>
  );
}
