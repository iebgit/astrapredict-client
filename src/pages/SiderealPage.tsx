import "../App.css";
import { useState, FC } from "react";
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
import { IData } from "../App"

const regexPattern = /[^A-Za-z]/g;

const SiderealPage:FC<IData> = ({data}) => {
    const [images, setImages] = useState(
        importAll(require.context("../assets", false, /\.(png|jpe?g|svg)$/))
      );

      function importAll(r: any) {
        let imgs: any = {};
        r.keys().forEach((item: String) => {
          imgs[item.replace("./", "")] = r(item);
        });
        return imgs;
      }
    
      function getImage() {
        return images[
          `${data.planets[0].longitude
            .replace(regexPattern, "")
            .toLowerCase()}${getRandomInt(4)}.png`
        ];
      }

      function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
      }
    return (
<SimpleGrid minChildWidth="400px" columns={2} spacing={4}>
<Box>
  <center style={{  fontWeight: "bold" }}>
  <h3>
        <strong style={{ color: "#FCB13B" }}>
          {data.location.city}, {data.location.region}
        </strong>
        <br />
        <small>{data.location.time}</small>
      </h3>
      <br />
      <div style={{ justifyContent: "space-between" }}>
        {images ? (
          <img
            style={{ borderRadius: "50%", maxWidth: "50%" }}
            src={getImage()}
            alt={data.planets[0].planet}
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
        {data.planets[0].planet.toUpperCase()}:{" "}
        {data.planets[0].longitude}
      </p>
</center>
    </Box><Box>
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
          {data.planets.slice(1).map((planet, i) => {
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
</SimpleGrid>)

}

export default SiderealPage;