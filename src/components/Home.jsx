import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CryptoCarousel from "./Carousel";
import { BeatLoader } from "react-spinners";
import { WatchListContext } from "../Context/WatchListContext";

function Home({ currency }) {
  const { addToWatchList, watchList } = useContext(WatchListContext);
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${itemsPerPage}&page=${page}&sparkline=false&price_change_percentage=24h`
      )
      .then((response) => {
        setCryptos(response.data);
        setFilteredCryptos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, currency]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(value) ||
        crypto.symbol.toLowerCase().includes(value)
    );
    setFilteredCryptos(filtered);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleNavigate = (cryptoId) => {
    navigate(`/details/${cryptoId}`);
  };

  const handleAddToWatchList = (crypto) => {
    addToWatchList(crypto.id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return (
      <div className="p-4 min-h-screen flex justify-center mt-10">
        <BeatLoader color="#87CEEB" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <div
        style={{
          backgroundImage: `url(
            "https://s3-alpha-sig.figma.com/img/caf5/016f/97f154adfd88d0e48d9a7fc87e5ab035?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ns1OFW3yxM-~1ws-0TXFkmHn~kUFIX1r3US6OT~78ItQorz1GV8Sbmq0tGDHis-AlJ96pyhs7BypQAEmok5TM1D0s-JkhJmmdrdISkxLsDoBu9wkfQmaFVhnNCUOUbAfLgbnK1T3gIfKVQq9ucwPZlFGKiN368KN~6FKGgRqR0Oj7uRyasYgSFb~kE3GwJJlGKUTrM1yN86y~52O9mJx6AfTLDTzcc2-G2SnmaN1vhfQ7YywVw4UCRAGzffGGc9iT3JZdJehS0fo~-HQEozS0ntmOaU8QC9yE~Ek2onxDPttru3ahnsT0FefM7c5aG2IxHTxcLSakH9xl1fVFs6YgA__"
          )`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}
      >
        <h1 className="font-bold text-[60px] leading-[72px] text-[#87CEEB] flex justify-center pt-[69px]">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="flex justify-center text-[#A9A9A9] font-medium">
          Get all the Info regarding your favorite Crypto Currency
        </p>

        <div className="mb-16">
          <CryptoCarousel />
        </div>
      </div>

      <div className="bg-black">
        <div>
          <h4 className="text-[#FFFFFF] text-[34px] flex justify-center leading-10 pt-4">
            Cryptocurrency Prices by Market Cap
          </h4>
          <input
            type="text"
            placeholder="Search For a Crypto Currency.."
            className="py-6 px-3 w-[1200px] flex mx-auto text-white bg-black rounded border border-gray-700 mt-3 mb-10"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="bg-[#87CEEB] w-[1232px] mx-auto flex items-center h-[56px] text-black rounded ">
          <span className="font-bold leading-6 p-4">Coin</span>
          <div className="flex gap-48 ml-[500px]">
            <span className="font-bold leading-6">Price</span>
            <span className="font-bold leading-6 pr-5">24h Change</span>
            <span className="font-bold leading-6">Market Cap</span>
          </div>
        </div>
        {filteredCryptos.map((crypto, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center py-2 border-b h-[93px] border-gray-700 w-[1232px] mx-auto cursor-pointer px-4"
            onClick={() => handleNavigate(crypto.id)}
          >
            <div className="flex items-center gap-4 col-span-2">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="text-[22px] uppercase">{crypto.symbol}</span>
                <span className="text-[#A9A9A9]">{crypto.name}</span>
              </div>
            </div>

            <p className="text-center ml-32">
              ${crypto.current_price.toFixed(2)}
            </p>

            <div className="flex items-center justify-center gap-2 ml-[180px]">
              <img
                src="/eye.svg"
                alt="eye"
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWatchList(crypto);
                  toggleModal();
                }}
              />
              <p
                className={
                  crypto.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>

            <span className="text-center ml-[230px]">
              ${crypto.market_cap.toLocaleString()}
            </span>
          </div>
        ))}

        <div className="flex justify-center gap-2 mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={10}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="flex gap-2"
            pageClassName="px-4 py-2 text-[#87CEEB] rounded cursor-pointer"
            activeClassName="rounded-full bg-gray-600 text-white"
            previousClassName="px-4 py-2 text-gray-300 rounded cursor-pointer"
            nextClassName="px-4 py-2 text-gray-300 rounded cursor-pointer"
            breakClassName="px-4 py-2 text-gray-300 rounded cursor-pointer"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-end z-50">
          <div className="bg-[#515151] text-white w-96 p-4 rounded-lg">
            <button className="float-right text-red-500" onClick={toggleModal}>
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">WATCHLIST</h2>
            <div className="grid grid-cols-2 gap-4">
              {watchList.map((crypto) => (
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
                  <button className="mt-2 bg-[#FF0000] py-1 px-3 rounded text-black">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
