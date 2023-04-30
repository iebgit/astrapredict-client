import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Prediction from "./components/Prediction";
import Sidereal from "./components/Sidereal";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

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
    prediction_date: String;
    prev_predicted: String;
    prev_date: String;
  };
  loading: boolean;
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
    prediction_date: "",
    prev_predicted: "",
    prev_date: "",
  });
  const [loading, setLoading] = useState(true);
  const coinId = useSelector((state: RootState) => state.value);

  useEffect(() => {
    if (!!coinId?.value) {
      setLoading(true);
      const getPrediction = async () => {
        const response: any = await axios.get(
          `https://astrapredict.onrender.com/sidereal`,
          {
            params: { coinId: coinId.value },
          }
        );
        setData(response.data);
        setLoading(false);
      };
      getPrediction();
    }
  }, [coinId]);

  return (
    <div className="App-header">
      <Navbar />
      <br />
      <Routes>
        <Route
          path="/prediction"
          element={
            !loading && !!data?.planets?.length ? (
              <Prediction data={data} loading={loading} />
            ) : (
              <Loader />
            )
          }
        />
        <Route
          path="/sidereal"
          element={
            !loading && !!data?.planets?.length ? (
              <Sidereal data={data} loading={loading} />
            ) : (
              <Loader />
            )
          }
        />
        <Route path="/" element={<Landing />} />
      </Routes>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
