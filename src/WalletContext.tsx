// context.tsx
import { Client, Stronghold } from "@tauri-apps/plugin-stronghold";
import React, { createContext, useState, ReactNode } from "react";
import { MyContextType } from "./types";

// 创建 Context，指定默认值为 null
const MyContext = createContext<MyContextType | undefined>(undefined);

// 创建 Provider 组件
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stronghold, setStronghold] = useState<Stronghold | undefined>(
    undefined
  );
  const [client, setClient] = useState<Client | undefined>(undefined);

  return (
    <MyContext.Provider
      value={{ stronghold, client, setStronghold, setClient }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
