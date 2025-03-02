import React, { useState } from "react";
import bip39 from "bip39";

const Mnemonic: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>("");

  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic(128); // 128 bits = 12 words
    setMnemonic(newMnemonic);
  };

  const copyToClipboard = () => {
    if (mnemonic) {
      navigator.clipboard
        .writeText(mnemonic)
        .then(() => {
          alert("助记词已复制到剪贴板！");
        })
        .catch((err) => {
          console.error("复制失败:", err);
        });
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>助记词生成器</h1>
      <button onClick={generateMnemonic}>生成助记词</button>
      {mnemonic && (
        <div style={{ marginTop: "20px" }}>
          <h3>您的助记词:</h3>
          <div
            style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}
          >
            {mnemonic.split(" ").map((word, index) => (
              <span key={index} style={{ margin: "0 5px" }}>
                {word}
              </span>
            ))}
          </div>
          <button onClick={copyToClipboard}>保存并复制</button>
        </div>
      )}
    </div>
  );
};

export default Mnemonic;
