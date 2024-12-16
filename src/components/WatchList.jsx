import { useContext } from "react";
import { WatchListContext } from "../Context/WatchListContext";

function WatchList() {
  const { watchList, removeFromWatchList } = useContext(WatchListContext);

  if (watchList.length === 0) {
    return <div className="text-white text-center">Watch list is empty.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-white font-bold text-xl mb-4">Watch List</h2>
      <ul className="bg-[#1a1a1a] p-4 rounded-lg">
        {watchList.map((crypto) => (
          <li
            key={crypto.id}
            className="flex justify-between items-center text-white mb-2"
          >
            <span>{crypto.name.toUpperCase()}</span>
            <button
              onClick={() => removeFromWatchList(crypto.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WatchList;
