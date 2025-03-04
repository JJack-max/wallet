import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col, Select, Typography, Spin, Table, message } from "antd";
import { PublicKey } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../WalletContext";

const { Title, Text } = Typography;

const WalletPage: React.FC = () => {
  const nav = useNavigate();
  const context = useContext(MyContext);
  const [network, setNetwork] = useState<string>("devnet");
  const [address, setAddress] = useState<PublicKey | null>(new PublicKey("tLCWU4StsiKSG7gv67bL9GazWVqrESuQVCp4ovumU6b"));
  const [balance, setBalance] = useState<number>(100.5); // 假的 SOL 余额
  const [tokens, setTokens] = useState<any[]>([
    { key: "token1", account: { pubkey: new PublicKey("tLCWU4StsiKSG7gv67bL9GazWVqrESuQVCp4ovumU6b") }, amount: { uiAmount: 1000 } },
    { key: "token2", account: { pubkey: new PublicKey("tLCWU4StsiKSG7gv67bL9GazWVqrESuQVCp4ovumU6b") }, amount: { uiAmount: 2000 } },
  ]); // 假的 Token 数据
  const [transactions, setTransactions] = useState<any[]>([
    { signature: "TxSig1234567890", blockTime: 1632549378 },
    { signature: "TxSig9876543210", blockTime: 1632549380 },
  ]); // 假的交易记录
  const [contracts, setContracts] = useState<any[]>([
    "DeployedContract1234567890",
    "DeployedContract9876543210",
  ]); // 假的合约部署数据

  const [loading, setLoading] = useState<boolean>(false);

  const networks = ["localnet", "devnet", "testnet", "mainnet"];

  // Handle network change
  const handleNetworkChange = (value: string) => {
    setNetwork(value);
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "signature",
      key: "signature",
      render: (text: string) => <Text ellipsis>{text}</Text>,
    },
    {
      title: "Timestamp",
      dataIndex: "blockTime",
      key: "blockTime",
      render: (time: number) => <Text>{new Date(time * 1000).toLocaleString()}</Text>,
    },
  ];

  const tokenColumns = [
    {
      title: "Token Address",
      dataIndex: "account",
      key: "account",
      render: (account: any) => <Text ellipsis>{account.pubkey.toBase58()}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: any) => <Text>{amount.uiAmount}</Text>,
    },
  ];


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
        return;
      }

      let mnemonic = new TextDecoder().decode(new Uint8Array(res));
      console.log("mnemonic: ", mnemonic);
    };

    exec();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1}>Solana 钱包页面</Title>

      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col>
          <Select value={network} onChange={handleNetworkChange} style={{ width: 200 }}>
            {networks.map((net) => (
              <Select.Option key={net} value={net}>
                {net}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {address && (
            <div style={{ marginBottom: "20px" }}>
              <Text strong>当前地址: </Text>
              <Text>{address.toBase58()}</Text>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <Text strong>SOL余额: </Text>
            <Text>{balance} SOL</Text>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Text strong>Tokens: </Text>
            <Table
              columns={tokenColumns}
              dataSource={tokens}
              pagination={false}
              size="small"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Text strong>交易记录: </Text>
            <Table
              columns={columns}
              dataSource={transactions}
              pagination={false}
              size="small"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Text strong>部署的合约: </Text>
            <div>{contracts.length > 0 ? contracts.map((contract, index) => (
              <div key={index}>{contract}</div>
            )) : "没有找到合约"}</div>
          </div>
        </>
      )}

      <Button type="primary" onClick={() => message.info("数据已刷新！")}>
        刷新数据
      </Button>
    </div>
  );
};

export default WalletPage;
