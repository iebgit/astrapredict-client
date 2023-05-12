import "../App.css";
import Ascendant from "./Ascendant";
import { FC, useState, useEffect } from "react";
import { getMarketData } from "./Coingecko";
import { useNavigate } from "react-router-dom";
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
  Input,
  Button,
  Progress,
  Stack,
  Image,
} from "@chakra-ui/react";
import icon from "../assets/icon.png";
import { IData } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { changeCoinId } from "../slice/coinId.slice";
import type { RootState } from "../store";

interface coinsArray {
  data: Array<any>;
}

const Prediction: FC<IData> = ({ data, loading }) => {
  const slice = useSelector((state: RootState) => state);
  const [id, setId] = useState(slice.locationReducer.location.date);
  const [input, setInput] = useState("bitcoin");
  const [coins, setCoins] = useState<coinsArray>({ data: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    setId(slice.locationReducer.location.date);
  }, [slice.locationReducer.location.date]);

  useEffect(() => {
    if (coins?.data?.length === 0 && data.planets.length > 0) {
      const getCoinsImages = async () => {
        const coinsArray = await getMarketData(data.coins);
        setCoins(coinsArray);
      };
      getCoinsImages();
    }
  }, [data.location.ip]);

  return (
    <SimpleGrid minChildWidth="400px" margin="10px" columns={2} spacing={4}>
      <Ascendant data={data} loading={loading} />
      <Box w="90%">
        {" "}
        <center style={{ fontSize: "small", fontWeight: "bold" }}>
          <Stack direction="row" spacing={1} align="center">
            <div style={{ color: "grey", width: "100%" }}>
              <Input
                placeholder={"Enter Coin Id"}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <Button
              colorScheme="purple"
              width={"4.25rem"}
              onClick={() => {
                dispatch(changeCoinId(input.toLowerCase()));
              }}
            >
              Submit
            </Button>
          </Stack>

          <Stack
            overflowX="auto"
            direction="row"
            spacing={1}
            align="flex-start"
            overflow="hidden"
          >
            {coins?.data?.length ? (
              coins?.data?.map((coin, i) => (
                <Image
                  key={i}
                  onClick={() => {
                    dispatch(changeCoinId(coin.id));
                  }}
                  title={coin.id}
                  width="60px"
                  padding="10px"
                  _hover={{ cursor: "pointer" }}
                  src={coin.image.toString()}
                ></Image>
              ))
            ) : (
              <Image
                title="placeholder"
                width="60px"
                padding="10px"
                _hover={{ cursor: "pointer" }}
                src={icon}
              ></Image>
            )}
          </Stack>

          {loading ? (
            <Progress size="xs" isIndeterminate colorScheme="blue" />
          ) : (
            <Progress size="xs" colorScheme="blue" />
          )}

          <TableContainer style={{ fontSize: "small", fontWeight: "bold" }}>
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ color: "white" }}>
                    <strong>Date</strong>
                  </Th>
                  <Th style={{ color: "white" }}>
                    <strong>Description</strong>
                  </Th>
                  <Th style={{ color: "white" }}>24 Hr %∆ </Th>
                </Tr>
              </Thead>
              <TableCaption>
                {data?.coin_id ? data.coin_id : "bitcoin"} predictions
              </TableCaption>
              <Tbody>
                <Tr>
                  <Td> {data.prev_date.split(" ")[0]}</Td>
                  <Td> Predicted</Td>
                  <Td>
                    {" "}
                    <span
                      style={{
                        color:
                          Number(data.prev_predicted) * 100 > 0
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {(Number(data.prev_predicted) * 100).toFixed(4)} %
                    </span>
                  </Td>
                </Tr>
                <Tr>
                  <Td> {data.prev_date.split(" ")[0]}</Td>
                  <Td> Actual</Td>
                  <Td>
                    {" "}
                    <span
                      style={{
                        color: data.price_change > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {Number(data.price_change).toFixed(4)} %
                    </span>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    {" "}
                    <span
                      style={{
                        color: "pink",
                        fontWeight: "bold",
                      }}
                    >
                      {data.prediction_date.split(" ")[0]}
                    </span>
                  </Td>
                  <Td>
                    <span
                      style={{
                        color: "pink",
                        fontWeight: "bold",
                      }}
                    >
                      Future
                    </span>
                  </Td>

                  <Td>
                    {" "}
                    <span
                      style={{
                        color: data.predicted * 100 > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {(Number(data.predicted) * 100).toFixed(4)} %
                    </span>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </center>
      </Box>
    </SimpleGrid>
  );
};

export default Prediction;
export {};
