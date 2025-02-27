import { useState } from "react";
import { DBConfig } from "./types";
import { getConfig } from "./util/db";
import { useEffect } from "react";
import InitPage from "./component/InitPage";

function App() {
  const [config, setConfig] = useState<DBConfig | undefined>(undefined); // 初始状态为 undefined

  useEffect(() => {
    const fetchConfig = async () => {
      const initialized = await getConfig();
      setConfig(initialized);
    };

    fetchConfig();
  }, []);

  if (config) {
    return <InitPage />;
  }

  return <h1>App...</h1>;
}

export default App;
