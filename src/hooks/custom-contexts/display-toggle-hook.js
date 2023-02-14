import { createContext, useState,useContext } from "react";

const CollapseContext = createContext();

function CollapseProvider(props) {
      const [toggle, setToggle] = useState(false);
      return (
            <CollapseContext.Provider value={{ toggle, setToggle }}>
                  {props.children}
            </CollapseContext.Provider>
      );
}

export function CollapseContextHook(){
      return useContext(CollapseContext)
}

export default CollapseContext;
export { CollapseProvider };

