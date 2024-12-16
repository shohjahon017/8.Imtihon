import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ChartContext = createContext();

export const ChartProvider = ({
  children,
  cryptoId = "bitcoin",
  days = 30,
}) => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: days,
            },
          }
        );

        const prices = response.data?.prices;
        if (prices) {
          setChartData(prices.map((price) => price[1]));
          setChartLabels(
            prices.map((price) => new Date(price[0]).toLocaleDateString())
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChartData();
  }, [cryptoId, days]);

  return (
    <ChartContext.Provider value={{ chartData, chartLabels }}>
      {children}
    </ChartContext.Provider>
  );
};
