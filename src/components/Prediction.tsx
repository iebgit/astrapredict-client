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
  Image,
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
    <SimpleGrid minChildWidth="400px" margin="10px" columns={2} spacing={4}>
      <Ascendant data={data} />
      <Box>
        {" "}
        <center>
          <Stack direction="row" spacing={1} align="center">
            <Input
              width={"66%"}
              placeholder={"Enter Coin Id"}
              onChange={(e) => setInput(e.target.value)}
              size="sm"
            />
            <Button
              colorScheme="yellow"
              size="sm"
              width={"25%"}
              onClick={() => {
                dispatch(changeCoinId(input.toLowerCase()));
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 3000);
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
            {data.coins.map((coin, i) => (
              <Image
                key={i}
                onClick={() => {
                  dispatch(changeCoinId(coin.id));
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 3000);
                }}
                title={coin.id.toString()}
                width="60px"
                padding="10px"
                _hover={{ cursor: "pointer" }}
                src={coin.image.toString()}
              ></Image>
            ))}
          </Stack>

          {isLoading ? (
            <Progress size="xs" isIndeterminate colorScheme="yellow" />
          ) : (
            <Progress size="xs" colorScheme="yellow" />
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
