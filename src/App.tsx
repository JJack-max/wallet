import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import InitPage from "./component/InitPage";
import Register from "./component/Register";
import { getConfig } from "./util/db";

function App() {
  let nav = useNavigate();

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig();
      if (!config) {
        nav("/init");
        return;
      }

      nav("/register");
    };

    fetchConfig();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>app..</h1>} />
        <Route path="/init" element={<InitPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
