import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MainLayout from "./layouts/MainLayout";
import Details from "./components/Details";
import { useState } from "react";

function App() {
  const [currency, setCurrency] = useState("usd");

  return (
    <div className="container mx-auto h-screen font-montserrat">
      <MainLayout setCurrency={setCurrency} />
      <Routes>
        <Route path="/" element={<Home currency={currency} />} />
        <Route path="/details/:cryptoId" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
