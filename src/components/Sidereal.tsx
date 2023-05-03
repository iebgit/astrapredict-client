import "../App.css";
import { FC, useEffect, useState } from "react";
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
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { IData } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../slice/location.slice";
import type { RootState } from "../store";
import moment from "moment";

const Sidereal: FC<IData> = ({ data, loading }) => {
  const slice = useSelector((state: RootState) => state);
  const [date, setDate] = useState(
    slice.locationReducer.location.date
      ? new Date(slice.locationReducer.location.date?.replace("-", "/"))
      : new Date()
  );
  const dispatch = useDispatch();

  return (
    <SimpleGrid minChildWidth="400px" margin="10px" columns={2} spacing={4}>
      <Ascendant data={data} loading={loading} />
      <Box>
        <center style={{ fontSize: "small", fontWeight: "bold" }}>
          <Stack direction="row" spacing={1} align="center">
            <div style={{ color: "grey", width: "100%" }}>
              <SingleDatepicker
                name="date-input"
                date={date}
                onDateChange={setDate}
              />
            </div>

            <Button
              colorScheme="yellow"
              width={"4.25rem"}
              onClick={() => {
                dispatch(
                  changeLocation({
                    date: moment(date).format("YYYY-MM-DD"),
                    data: slice.locationReducer.location.data,
                  })
                );
              }}
            >
              Submit
            </Button>
          </Stack>
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
