import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChartProvider } from "./Context/ChartContext.jsx";
import { WatchListProvider } from "./Context/WatchListContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChartProvider cryptoId="bitcoin" days={30}>
      <WatchListProvider>
        <App />
      </WatchListProvider>
    </ChartProvider>
  </BrowserRouter>
);
