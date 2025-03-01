// src/RegisterPage.tsx
import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const generateRandomPassword = () => {
    const length = 30;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setPassword(password);
    form.setFieldsValue({ password }); // 更新表单中的密码字段

    // 复制密码到剪切板
    navigator.clipboard
      .writeText(password)
      .then(() => {
        message.success("密码已复制到剪切板，请先保存密码！");
      })
      .catch((err) => {
        message.error("复制密码失败，请手动复制！");
      });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("用户名:", values.username);
        console.log("密码:", values.password);
        // 在这里处理注册逻辑
      })
      .catch((errorInfo) => {
        console.log("校验失败:", errorInfo);
      });
  };

  // 密码校验规则
  const passwordValidationRules = [
    {
      required: true,
      message: "请输入密码!",
    },
    {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:,.<>?])[A-Za-z\d!@#$%^&*()_+[\]{}|;:,.<>?]{30,}$/,
      message:
        "密码必须包含大小写字母、数字和特殊字符，且长度至少为 30 个字符!",
    },
  ];

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <Title level={2}>注册页面</Title>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={passwordValidationRules}>
          <Input.Password
            value={password}
            onChange={handlePasswordChange}
            placeholder="请输入密码"
          />
          <Button
            type="default"
            onClick={generateRandomPassword}
            style={{ marginLeft: "10px" }}
          >
            随机生成密码
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
