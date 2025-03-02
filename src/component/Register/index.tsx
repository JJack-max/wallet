// Register.tsx
import { appDataDir } from "@tauri-apps/api/path";
import { Stronghold } from "@tauri-apps/plugin-stronghold";
import { Button, Form, Input, Typography, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 导入 Link 组件

const { Title } = Typography;

const Register: React.FC = () => {
  let nav = useNavigate();

  const [form] = Form.useForm();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onFinish = async (values: any) => {
    console.log("注册成功:", values);
    // 这里可以添加注册逻辑，例如调用 API
    const vaultPath = `${await appDataDir()}/wallet.hold`;
    const stronghold = await Stronghold.load(vaultPath, values.password);

    await stronghold.createClient("walletClient");

    await stronghold.save();

    nav("/login");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("注册失败:", errorInfo);
  };

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let generatedPassword = "";
    for (let i = 0; i < 30; i++) {
      generatedPassword += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }
    setPassword(generatedPassword);
    form.setFieldsValue({
      password: generatedPassword,
      confirmPassword: generatedPassword,
    });

    // 复制密码到剪贴板
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        message.success("密码已经复制到剪贴板，请保存密码");
      })
      .catch(() => {
        message.error("复制密码失败，请手动复制");
      });
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
          钱包注册
        </Title>
        <Form
          form={form}
          name="register"
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
              {
                min: 30,
                message: "密码长度至少为 30 个字符!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{30,}$/,
                message: "密码必须包含大小写字母、数字和特殊字符!",
              },
            ]}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input.Password
                style={{ flex: 1, marginRight: "10px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="default" onClick={generatePassword}>
                生成密码
              </Button>
            </div>
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "请确认密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不匹配!"));
                },
              }),
            ]}
          >
            <Input.Password
              style={{ width: "100%" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              注册
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            如果您已有账号，<Link to="/">请登录</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
