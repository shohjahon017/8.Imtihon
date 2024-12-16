import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function PriceChart({ cryptoId, days }) {
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
        console.log(error);
      }
    };

    fetchChartData();
  }, [cryptoId, days]);

  const options = {
    chart: {
      id: "crypto-price",
      type: "line",
      background: "inherit",
      toolbar: { show: false },
    },
    grid: {
      show: true,
      borderColor: "#E0E0E0",
    },
    xaxis: {
      categories: chartLabels,
      title: {
        text: undefined,
      },
      labels: {
        show: true,
        style: { colors: "#A0C4FF" },
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#fff"],
    },
    tooltip: {
      enabled: true,
    },
  };

  const series = [
    {
      name: "Price",
      data: chartData,
    },
  ];

  return <Chart options={options} series={series} type="line" height={400} />;
}
