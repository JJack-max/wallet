import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import InitPage from "./component/InitPage";
import Register from "./component/Register";
import { getConfig, getUserCount } from "./util/db";

function App() {
  let nav = useNavigate();

  useEffect(() => {
    const fetchConfig = async () => {
      let count = await getUserCount();
      if (count == -1) {
        nav("/init");
      } else if (count == 0) {
        nav("/register");
      } else {
        nav("/");
      }
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
