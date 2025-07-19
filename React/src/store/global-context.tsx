import { createContext, useState } from "react";
import * as React from "react";

const GlobalContext = createContext({
  showMenu: false,
  showMore: false,
  displayMenu: (data: boolean) => {},
  displayMore: () => {},
});

export function GlobalContextProvider(props: any) {
  const [showMenu, setshowMenu] = useState(false);
  const [showMore, setshowMore] = useState(false);

  function itemDisplayMenuHandler(data: boolean) {
    if (data) {
      data = false;
    }
    if (showMenu) {
      setshowMenu(false);
    } else {
      setshowMenu(true);
    }
  }

  function itemDisplayMoreHandler() {
    if (showMore) {
      setshowMore(false);
    } else {
      setshowMore(true);
    }
  }
  const context = {
    showMenu: showMenu,
    showMore: showMore,
    displayMenu: itemDisplayMenuHandler,
    displayMore: itemDisplayMoreHandler,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
