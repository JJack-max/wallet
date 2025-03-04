import React, { useContext, useState } from "react";
import {
  generateMnemonic as doGenerateMnemonic,
  validateMnemonic,
} from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { Input, Row, Col, Button, Typography } from "antd";
import { MyContext } from "../../WalletContext";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Mnemonic: React.FC = () => {
  let nav = useNavigate();
  const [mnemonic, setMnemonic] = useState<string>(""); // 存储生成的助记词
  const [editable, setEditable] = useState<boolean>(false); // 控制输入框是否可编辑
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]); // 存储助记词的各个单词

  const context = useContext(MyContext);

  if (!context) {
    throw new Error("");
  }

  const { client, stronghold } = context;

  // 生成助记词
  const generateMnemonic = () => {
    const newMnemonic = doGenerateMnemonic(wordlist, 128); // 128 bits = 12 words
    setMnemonic(newMnemonic);
    setMnemonicWords(newMnemonic.split(" "));
    setEditable(false); // 生成后设置为只读
  };

  // 保存并复制助记词
  const saveAndCopy = () => {
    if (mnemonic) {
      if (!validateMnemonic(mnemonic, wordlist)) {
        alert("助记词错误");
        return;
      }
      navigator.clipboard
        .writeText(mnemonic)
        .then(() => {
          alert("助记词已复制到剪贴板！");
          let store = client?.getStore();
          store?.insert(
            "mnemonic",
            Array.from(new TextEncoder().encode(mnemonic))
          );
          stronghold?.save();
          nav("/");
        })
        .catch((err) => {
          console.error("复制失败:", err);
        });
    }
  };

  // 导入已有助记词
  const importMnemonic = () => {
    setEditable(true); // 设置为可编辑状态
    setMnemonic(""); // 清空当前的助记词
    setMnemonicWords(new Array(12).fill("")); // 清空助记词的单词
  };

  // 处理输入的助记词
  const handleChange = (index: number, value: string) => {
    const updatedWords = [...mnemonicWords];
    updatedWords[index] = value;
    setMnemonicWords(updatedWords);
    setMnemonic(updatedWords.join(" ")); // 更新助记词字符串
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Title level={1}>助记词生成器</Title>
      <Button
        type="primary"
        onClick={generateMnemonic}
        style={{ marginRight: "10px" }}
      >
        生成助记词
      </Button>
      <Button type="default" onClick={importMnemonic}>
        导入已有助记词
      </Button>

      {mnemonicWords.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>您的助记词:</h3>
          <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
            {mnemonicWords.map((word, index) => (
              <Col span={6} key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      marginRight: "10px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </label>
                  <Input
                    value={word}
                    onChange={(e) =>
                      editable && handleChange(index, e.target.value)
                    }
                    readOnly={!editable}
                    style={{ width: "100%", textAlign: "center" }}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <Button
            type="default"
            onClick={saveAndCopy}
            style={{ marginTop: "20px" }}
          >
            保存并复制
          </Button>
        </div>
      )}
    </div>
  );
};

export default Mnemonic;
