import "../App.css";
import { useState, FC } from "react";
import { Box } from "@chakra-ui/react";
import { IData } from "../App";

const regexPattern = /[^A-Za-z]/g;

const Ascendant: FC<IData> = ({ data }) => {
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
    <Box>
      <center style={{ fontWeight: "bold" }}>
        <h5>
          <strong style={{ color: "#FCB13B" }}>
            {data.location.city}, {data.location.region}
          </strong>
          <br />
          <small>{data.location.time}</small>
        </h5>
        <br />
        <div style={{ justifyContent: "space-between" }}>
          <img
            style={{ borderRadius: "50%", maxWidth: "50%" }}
            src={getImage()}
            alt={data.planets[0].planet}
          ></img>
        </div>
        <br />
        <p
          style={{
            color: "#FF6630",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          {data.planets[0].planet.toUpperCase()}: {data.planets[0].longitude}
        </p>
      </center>
    </Box>
  );
};

export default Ascendant;
