import { Client, Stronghold } from "@tauri-apps/plugin-stronghold";

// 定义 Context 的类型
export interface MyContextType {
  stronghold: Stronghold | undefined;
  client: Client | undefined;
  setStronghold: (stronghold: Stronghold) => void;
  setClient: (client: Client) => void;
}
