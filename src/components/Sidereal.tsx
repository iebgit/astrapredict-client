import "../App.css";
import { FC, useEffect, useState } from "react";
import Ascendant from "./Ascendant";
import {
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Progress,
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
      <Box w="90%">
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
              colorScheme="purple"
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
          <br />
          {loading ? (
            <Progress size="xs" isIndeterminate colorScheme="purple" />
          ) : (
            <Progress size="xs" colorScheme="purple" />
          )}
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
              <TableCaption>
                Sidereal Positions {moment(date).format("YYYY-MM-DD")}
              </TableCaption>

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
