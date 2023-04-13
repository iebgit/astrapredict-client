import "../App.css";
import Ascendant from "./Ascendant";
import { FC, useState } from "react";
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
} from "@chakra-ui/react";

import { IData } from "../App";
import { useDispatch } from "react-redux";
import { changeCoinId } from "../coinIdSlice";

const Prediction: FC<IData> = ({ data }) => {
  const [id, setId] = useState("bitcoin");
  const [input, setInput] = useState("bitcoin");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <SimpleGrid minChildWidth="400px" columns={2} spacing={4}>
      <Ascendant data={data} />
      <Box>
        {" "}
        <center>
          <Stack direction="row" spacing={1} align="center">
            <Input
              placeholder={"Enter Coin Id"}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              colorScheme="orange"
              onClick={() => dispatch(changeCoinId(input.toLowerCase()))}
            >
              Submit
            </Button>
          </Stack>
          <br />
          {isLoading ? (
            <Progress size="xs" isIndeterminate colorScheme="orange" />
          ) : (
            <Progress size="xs" colorScheme="orange" />
          )}

          <TableContainer style={{ fontSize: "large", fontWeight: "bold" }}>
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ color: "white" }}>
                    <strong>Description</strong>
                  </Th>
                  <Th style={{ color: "white" }}>24 Hr % Change </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    {" "}
                    {data.coin_id[0].toUpperCase() + data.coin_id.slice(1)}{" "}
                    Current{" "}
                  </Td>
                  <Td>
                    {" "}
                    <span
                      style={{
                        color: data.price_change > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {data.price_change.toFixed(4)} %
                    </span>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    {data.coin_id[0].toUpperCase() + data.coin_id.slice(1)}{" "}
                    Predicted{" "}
                  </Td>
                  <Td>
                    {" "}
                    <span
                      style={{
                        color: data.predicted * 100 > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {(data.predicted * 100).toFixed(4)} %
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
