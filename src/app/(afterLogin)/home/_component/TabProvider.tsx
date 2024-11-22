"use client";

import { createContext, ReactNode, useState } from "react";

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});

type Props = { children: ReactNode };

function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

export default TabProvider;
