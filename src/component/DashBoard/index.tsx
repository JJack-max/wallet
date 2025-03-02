import { useContext, useEffect } from "react";
import { MyContext } from "../../WalletContext";
import { useNavigate } from "react-router-dom";
import { MyContextType } from "../../types";

function DashBoard() {
  let nav = useNavigate();
  const context = useContext<MyContextType | undefined>(MyContext);

  useEffect(() => {
    const exec = async () => {
      if (!context) {
        nav("/login");
        return;
      }

      const { stronghold, client } = context;

      if (!(stronghold && client)) {
        nav("/login");
        return;
      }

      let store = client.getStore();

      let res = await store.get("mnemonic");

      if (!res) {
        nav("/mnemonic");
      }
    };

    exec();
  }, []);

  return <h3>aaaa</h3>;
}

export default DashBoard;
