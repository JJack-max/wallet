import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import InitPage from "./component/InitPage";
import { getConfig, setConfig } from "./util/db";

function App() {
  let nav = useNavigate();

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig();
      if (config) {
        setConfig(config);
      } else {
        nav("/init");
      }
    };

    fetchConfig();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>app..</h1>} />
        <Route path="/init" element={<InitPage />} />
      </Routes>
    </>
  );
}

export default App;
