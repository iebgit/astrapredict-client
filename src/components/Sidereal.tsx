import "../App.css";
import { FC } from "react";
import Ascendant from "./Ascendant";
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

const Sidereal: FC<IData> = ({ data }) => {
  return (
    <SimpleGrid minChildWidth="400px" columns={2} spacing={4}>
      <Ascendant data={data} />
      <Box>
        <center style={{ fontSize: "small", fontWeight: "bold" }}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ color: "white", fontSize: "20px" }}>Planets</Th>
                  <Th style={{ color: "white", fontSize: "20px" }}>
                    Positions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.planets.slice(1).map((planet, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{planet.planet}</Td>
                      <Td>
                        {" "}
                        <span style={{ color: "#FCB13B", fontWeight: "bold" }}>
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
  );
};

export default Sidereal;
