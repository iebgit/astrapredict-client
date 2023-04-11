import "../App.css";
import Ascendant from "./Ascendant";
import { FC } from "react";
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
} from "@chakra-ui/react";
import { IData } from "../App";

const Prediction: FC<IData> = ({ data }) => {
  return (
    <SimpleGrid minChildWidth="400px" columns={2} spacing={4}>
      <Ascendant data={data} />
      <Box>
        {" "}
        <center>
          <TableContainer style={{ fontSize: "large", fontWeight: "bold" }}>
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ color: "white", fontSize: "20px" }}>
                    <strong>Description</strong>
                  </Th>
                  <Th style={{ color: "white", fontSize: "20px" }}>
                    24 Hr % Change{" "}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>BTC Current </Td>
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
                  <Td>BTC Predicted </Td>
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
