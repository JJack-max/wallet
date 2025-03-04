// WalletLogin.tsx
import { appDataDir } from "@tauri-apps/api/path";
import { Stronghold } from "@tauri-apps/plugin-stronghold";
import { Button, Form, Input, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../WalletContext";
import { MyContextType } from "../../types";

const { Title } = Typography;

const Login: React.FC = () => {
  let nav = useNavigate();

  const context = useContext<MyContextType | undefined>(MyContext);

  if (!context) {
    throw new Error("找不到全局context");
  }

  const { setStronghold, setClient } = context;

  const [form] = Form.useForm();
  const [password, setPassword] = useState<string>("");

  const onFinish = async (values: any) => {
    console.log("登录成功:", values);
    // 这里可以添加登录逻辑，例如调用 API
    try {
      const vaultPath = `${await appDataDir()}/wallet.hold`;
      const stronghold = await Stronghold.load(vaultPath, values.password);

      let client = await stronghold.loadClient("walletClient");

      setStronghold(stronghold);
      setClient(client);
    } catch (error) {
      console.log(error);
      alert("密码错误");
      return;
    }

    localStorage.setItem("loginTime", Date.now().toString());

    nav("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("登录失败:", errorInfo);
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "600px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          钱包登录
        </Title>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <p>
            如果没有账号，<Link to="/register">请注册</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
