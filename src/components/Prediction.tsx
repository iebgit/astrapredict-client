import "../App.css";
import Ascendant from "./Ascendant";
import { FC, useState, useEffect } from "react";
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
  TableContainer,
  Input,
  Button,
  Progress,
  Stack,
  Image,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import icon from "../assets/icon.png";
import { IData } from "../App";
import { useDispatch } from "react-redux";
import { changeCoinId } from "../coinIdSlice";

const Prediction: FC<IData> = ({ data, loading }) => {
  const [id, setId] = useState("bitcoin");
  const [input, setInput] = useState("bitcoin");
  const dispatch = useDispatch();

  return (
    <SimpleGrid minChildWidth="400px" margin="10px" columns={2} spacing={4}>
      <Ascendant data={data} loading={loading} />
      <Box w="90%">
        {" "}
        <center>
          {/* <Stack direction="row" spacing={1} align="center">
            <Input
              placeholder={"Enter Coin Id"}
              onChange={(e) => setInput(e.target.value)}
              size="sm"
            />
            <Button
              colorScheme="yellow"
              size="sm"
              width={"4.25rem"}
              onClick={() => {
                dispatch(changeCoinId(input.toLowerCase()));
              }}
            >
              Submit
            </Button>
          </Stack> */}

          <Stack
            overflowX="auto"
            direction="row"
            spacing={1}
            align="flex-start"
            overflow="hidden"
          >
            {data?.coins.length ? (
              data?.coins.map((coin, i) => (
                <Image
                  key={i}
                  onClick={() => {
                    dispatch(changeCoinId(coin.id));
                  }}
                  title={coin.id.toString()}
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
            <Progress size="xs" isIndeterminate colorScheme="yellow" />
          ) : (
            <Progress size="xs" colorScheme="yellow" />
          )}

          <TableContainer style={{ fontSize: "large", fontWeight: "bold" }}>
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ color: "white" }}>
                    <strong>Date</strong>
                  </Th>
                  <Th style={{ color: "white" }}>
                    <strong>Description</strong>
                  </Th>
                  <Th style={{ color: "white" }}>24 Hr % Change </Th>
                </Tr>
              </Thead>
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
