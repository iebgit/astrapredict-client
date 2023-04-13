import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Prediction from "./components/Prediction";
import Sidereal from "./components/Sidereal";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import AstraPredict from "./components/AstraPredict";

export interface IData {
  data: {
    planets: Array<any>;
    location: {
      city: String;
      ip: String;
      region: String;
      country: String;
      time: String;
    };
    price_change: any;
    predicted: any;
    coin_id: String;
    coins: Array<ICoins>;
  };
}

interface ICoins {
  id: String;
  image: String;
}

function App() {
  const [data, setData] = useState({
    planets: [],
    location: { city: "", ip: "", region: "", country: "", time: "" },
    price_change: 0,
    predicted: "",
    coin_id: "",
    coins: [],
  });
  const coinId = useSelector((state: RootState) => state.value);

  useEffect(() => {
    if (!!coinId?.value) {
      const getPrediction = async () => {
        const response: any = await axios.get(
          `https://astrapredict.herokuapp.com/predict`,
          {
            params: { coinId: coinId.value },
          }
        );
        console.log(response.data);
        setData(response.data);
      };
      getPrediction();
    }
  }, [coinId]);

  return (
    <div className="App-header">
      <Navbar />
      <br />

      {data?.price_change ? (
        <Routes>
          <Route path="/prediction" element={<Prediction data={data} />} />
          <Route path="/info" element={<AstraPredict />} />
          <Route path="/" element={<Sidereal data={data} />} />
        </Routes>
      ) : (
        <Loader />
      )}
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
