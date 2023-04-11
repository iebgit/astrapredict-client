import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PredictionPage from "./pages/PredictionPage";
import SiderealPage from "./pages/SiderealPage";
import Navbar from "./components/Navbar"
import Loader from "./pages/Loader"
import { Routes, Route } from "react-router-dom";

export interface IData {
  data: {
    planets: Array<any>
    location: {city: String, ip: String, region: String, country: String, time: String},
    price_change: any,
    predicted: any
  }
}

const default_data = {planets: [], location: {city: "", ip: "", region: "", country: "", time: ""}, price_change: 0, predicted: ""}

function App() {
  const [data, setData] = useState(default_data);


  useEffect(() => {
    const getPrediction = async () => {
      const response: any = await axios.get(`http://localhost:5000/predict`);
      console.log(response.data)
      setData(response.data);
    };
    getPrediction();
  }, []);


  return (
    <div className="App-header">
      <Navbar/>
      <br/>

      {data?.price_change ? (
        <Routes>
          <Route path="/prediction" element={<PredictionPage data={data}/>} />
          <Route path="/" element={<SiderealPage data={data}/>} />
          <Route path="/loader" element={<Loader/>} />
        </Routes>
      ) : 
      <Loader/>
      }
    </div>
  );
}

export default App;