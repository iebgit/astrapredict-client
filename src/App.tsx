import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const regexPattern = /[^A-Za-z]/g;

interface IData {
  data: {
    planets: Array<any>
    location: {city: String, ip: String, region: String, country: String, time: String},
    btc: any,
    predicted: any
  }
}

const default_data = {data: {planets: [], location: {city: "", ip: "", region: "", country: "", time: ""}, btc: "", predicted: ""}}

function App() {
  const [res, setRes] = useState<IData>(default_data);
  const [images, setImages] = useState(
    importAll(require.context("./assets", false, /\.(png|jpe?g|svg)$/))
  );

  useEffect(() => {
    const getSidereal = async () => {
      const data: any = await axios.get(`http://localhost:5000/predict`);
      setRes(data);
    };
    getSidereal();
  }, []);

  function importAll(r: any) {
    let imgs: any = {};
    r.keys().forEach((item: String) => {
      imgs[item.replace("./", "")] = r(item);
    });
    return imgs;
  }

  function getImage() {
    return images[
      `${res.data.planets[0].longitude
        .replace(regexPattern, "")
        .toLowerCase()}${getRandomInt(4)}.png`
    ];
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className="App-header">
      {res?.data?.btc ? (
        <SimpleGrid minChildWidth="400px" columns={2} spacing={4}>
          <Box >
            {!!res?.data?.btc && (
              <center>
                <h3>
                  <strong style={{ color: "#FCB13B" }}>
                    {res?.data.location.city}, {res?.data.location.region}
                  </strong>
                  <br />
                  <small>{res?.data.location.time}</small>
                </h3>
                <br />
                <div style={{ justifyContent: "space-between" }}>
                  {images ? (
                    <img
                      style={{ borderRadius: "50%", maxWidth: "50%" }}
                      src={getImage()}
                      alt={res?.data.planets[0].planet}
                    ></img>
                  ) : (
                    <div className="loader">
                      <div className="outer"></div>
                      <div className="inner"></div>
                    </div>
                  )}
                </div>
                <br />
                <p
                  style={{
                    color: "#FF6630",
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  {res?.data.planets[0].planet.toUpperCase()}:{" "}
                  {res?.data.planets[0].longitude}
                </p>
                <br />
                <TableContainer
                  style={{ fontSize: "small", fontWeight: "bold" }}
                >
                  <Table>
                    <TableCaption style={{ color: "white" }}>
                      Model Prediction vs Live Price
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th style={{ color: "white" }}>Description</Th>
                        <Th style={{ color: "white" }}>Value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Predicted 24 Hr % △ BTC </Td>
                        <Td>
                          {" "}
                          <span
                            style={{ color: "#FCB13B", fontWeight: "bold" }}
                          >
                            {Math.round(res?.data.predicted * 100)} %
                          </span>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Predicted </Td>
                        <Td>
                          {" "}
                          <span
                            style={{ color: "#FCB13B", fontWeight: "bold" }}
                          >
                            $
                            {Math.round(
                              res?.data.btc +
                                res?.data.btc * res?.data.predicted
                            )}
                          </span>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Current </Td>
                        <Td>
                          {" "}
                          <span
                            style={{ color: "#FCB13B", fontWeight: "bold" }}
                          >
                            ${res?.data.btc}
                          </span>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </center>
            )}
          </Box>
          <Box>
            <center style={{ fontSize: "small", fontWeight: "bold" }}>
              <TableContainer>
                <Table>
                  <TableCaption style={{ color: "white" }}>
                    Planet Positions
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th style={{ color: "white" }}>Planets</Th>
                      <Th style={{ color: "white" }}>Positions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {res?.data.planets.slice(1).map((planet, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{planet.planet}</Td>
                          <Td>
                            {" "}
                            <span
                              style={{ color: "#FCB13B", fontWeight: "bold" }}
                            >
                              {planet.longitude}
                            </span>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </center>
          </Box>
        </SimpleGrid>
      ) : (
        <div className="App-center">
          <div className="loader">
            <div className="outer"></div>
            <div className="inner"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;