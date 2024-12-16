import { useContext, useState, useEffect } from "react";
import { WatchListContext } from "../Context/WatchListContext";

function MainLayout({ setCurrency }) {
  const { watchList, removeFromWatchList } = useContext(WatchListContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") || "usd";
    setSelectedCurrency(savedCurrency);
    setCurrency(savedCurrency);
  }, [setCurrency]);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex pl-[368px] justify-between h-16 bg-[#110f0f] items-center">
      <span className="font-bold text-[20px] text-[#87CEEB]">CRYPTOFOLIO</span>

      <div className="mr-80 gap-4 flex items-center">
        <select
          className="w-[85px] h-10 border-none bg-inherit text-white cursor-pointer"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option className="bg-black" value="usd">
            USD
          </option>
          <option className="bg-black" value="eth">
            ETH
          </option>
          <option className="bg-black" value="aed">
            AED
          </option>
        </select>

        <button
          onClick={toggleModal}
          className="bg-[#87CEEB] py-2 px-4 rounded font-medium text-[14px]"
        >
          WATCH LIST
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-end z-50">
          <div className="bg-[#515151] text-white w-96 p-4 rounded-lg">
            <button className="float-right text-red-500" onClick={toggleModal}>
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">WATCHLIST</h2>
            <div className="grid grid-cols-2 gap-4">
              {watchList.length > 0 ? (
                watchList.map((crypto) => (
                  <div
                    key={crypto.id}
                    className="bg-[#14161A] p-4 rounded-lg flex flex-col items-center"
                  >
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-16 h-16 mb-2"
                    />
                    <span className="text-lg font-bold">{crypto.name}</span>
                    <span className="text-lg">{`$${crypto.current_price}`}</span>
                    <button
                      onClick={() => removeFromWatchList(crypto.id)}
                      className="mt-2 bg-[#FF0000] py-1 px-3 rounded text-black"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">Watchlist is empty</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;
