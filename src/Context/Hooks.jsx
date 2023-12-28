import React from "react";

import { useState } from "react";
import HooksContext from "./HooksContext";

function Hooks(props) {
  const [mode, setMode] = useState(false);
  const[token, setToken] = useState(false)
  const [cart, setCart] = useState([])

  const toggleMode = () => {
   setMode(!mode)
  };

 

  return (
    <>
      <HooksContext.Provider value={{mode, toggleMode, token, setToken, cart, setCart}} >
        {props.children}
      </HooksContext.Provider>
    </>
  );
}

export default Hooks;
