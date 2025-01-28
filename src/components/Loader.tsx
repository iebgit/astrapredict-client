import "../App.css";
import {Text, useColorModeValue} from "@chakra-ui/react"

export default function Loader() {
  return (
    <div className="App-center">
      <Text color={useColorModeValue("orange.200", "orange.500")}>
        <center style={{padding: "5px"}}>We are currently using free servers.</center>
        <center style={{padding: "5px"}}>This may take a while...</center>
      </Text>
     
      <br/>
      <div className="loader">
        <div className="outer"></div>
        <div className="inner"></div>
      </div>
    </div>
  );
}
