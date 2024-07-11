import React, { useContext, createContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [test, settest] = useState("test");
  return (
    <StateContext.Provider value={{ test, settest }}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
