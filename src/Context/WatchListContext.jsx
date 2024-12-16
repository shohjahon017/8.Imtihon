import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];
    setWatchList(storedWatchList);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (crypto) => {
    if (!watchList.find((item) => item.id === crypto.id)) {
      setWatchList((old) => [...old, crypto]);
    }
  };

  const removeFromWatchList = (cryptoId) => {
    setWatchList((old) => old.filter((item) => item.id !== cryptoId));
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
