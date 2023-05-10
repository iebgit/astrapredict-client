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
import { useDispatch } from "react-redux";
import { changeLocation } from "./slice/location.slice";
import { baseURL } from "./constants";

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
    coins: Array<String>;
    prediction_date: String;
    prev_predicted: String;
    prev_date: String;
  };
  loading: boolean;
}

function App() {
  const defaultData = {
    planets: [],
    location: { city: "", ip: "", region: "", country: "", time: "" },
    price_change: 0,
    predicted: "",
    coin_id: "",
    coins: [],
    prediction_date: "",
    prev_predicted: "",
    prev_date: "",
  };
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const slice = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!!slice?.coinIdReducer?.coinId) {
      setLoading(true);
      const getPrediction = async () => {
        const response: any = await axios.get(`${baseURL}/crypto-sidereal`, {
          params: { coinId: slice.coinIdReducer.coinId },
        });
        data.location.city
          ? setData({
              ...data,
              price_change: response.data.price_change,
              predicted: response.data.predicted,
              coin_id: response.data.coin_id,
              coins: response.data.coins,
              prediction_date: response.data.prediction_date,
              prev_predicted: response.data.prev_predicted,
              prev_date: response.data.prev_date,
            })
          : setData(response.data);
        console.log(data);
        setLoading(false);
        dispatch(
          changeLocation({
            data: {
              region: response.data.location.region,
              city: response.data.location.city,
              country: response.data.location.country,
            },
            date: slice.locationReducer.location.date,
          })
        );
      };
      getPrediction();
    }
  }, [slice.coinIdReducer.coinId]);

  useEffect(() => {
    if (
      slice?.locationReducer?.location?.date &&
      slice.coinIdReducer.coinId === data.coin_id
    ) {
      console.log("location");
      setLoading(true);
      const getPrediction = async () => {
        try {
          const response: any = await axios.get(`${baseURL}/custom-sidereal`, {
            params: {
              country: slice.locationReducer.location.data?.country,
              region: slice.locationReducer.location.data?.region,
              city: slice.locationReducer.location.data?.city,
              date: slice.locationReducer.location.date,
            },
          });
          setData({
            ...data,
            coin_id: slice.coinIdReducer.coinId.toString(),
            planets: response.data.data,
          });
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };
      getPrediction();
    }
  }, [slice.locationReducer.location]);

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
