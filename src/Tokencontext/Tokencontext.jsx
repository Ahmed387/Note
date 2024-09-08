import { createContext, useState } from "react";
export let Tokencontext = createContext();

export default function Tokencontextprovider(props) {
  const [Token, setToken] = useState(null);
  return (
    <>
      <Tokencontext.Provider value={{ Token, setToken }}>
        {props.children}
      </Tokencontext.Provider>
    </>
  );
}
