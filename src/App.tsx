import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import DashBoard from "./component/DashBoard";
import Mnemonic from "./component/Mnemonic";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mnemonic" element={<Mnemonic />} />
    </Routes>
  );
};

export default App;
