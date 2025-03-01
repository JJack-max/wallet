// src/InitPage.tsx
import React, { useState } from "react";
import { Form, Input, Select, Button, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const InitPage: React.FC = () => {
  const PLACE_HOLDER_MAP = new Map<string, string>();
  PLACE_HOLDER_MAP.set("sqlite", "例如: sqlite:test.db");
  PLACE_HOLDER_MAP.set("mysql", "例如: mysql://user:password@host:port/test");
  PLACE_HOLDER_MAP.set(
    "postgres",
    "例如: postgres://user:password@host:port/test"
  );

  const [type, setType] = useState<string>("sqlite");
  const [url, setUrl] = useState<string>("");
  const [form] = Form.useForm(); // 使用 Form 实例

  const handleDbTypeChange = (value: string) => {
    setType(value);
    // 根据选择的数据库类型清空输入框
    setUrl("");
    form.resetFields(["url"]); // 清空输入框
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        console.log("数据库类型:", type);
        console.log("连接字符串:", url);
        // 在这里处理提交逻辑
      })
      .catch((errorInfo) => {
        console.log("校验失败:", errorInfo);
      });
  };

  // 正则表达式校验
  const getValidationRules = (type: string) => {
    switch (type) {
      case "sqlite":
        return [
          {
            required: true,
            message: "请输入连接字符串!",
          },
          {
            pattern: /^sqlite:.+$/,
            message: "格式不正确，应该是 sqlite:xxx",
          },
        ];
      case "mysql":
        return [
          {
            required: true,
            message: "请输入连接字符串!",
          },
          {
            pattern: /^mysql:\/\/\w+:\w+@[\w.-]+:\d+\/\w+$/,
            message:
              "格式不正确，应该是 mysql://user:password@host:port/dbname",
          },
        ];
      case "postgres":
        return [
          {
            required: true,
            message: "请输入连接字符串!",
          },
          {
            pattern: /^postgres:\/\/\w+:\w+@[\w.-]+:\d+\/\w+$/,
            message:
              "格式不正确，应该是 postgres://user:password@host:port/dbname",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <Title level={2}>初始化设置</Title>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="选择数据库类型">
          <Select value={type} onChange={handleDbTypeChange}>
            <Option value="sqlite">SQLite</Option>
            <Option value="mysql">MySQL</Option>
            <Option value="postgres">PostgreSQL</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="数据库连接字符串"
          name="url" // 添加 name 属性
          rules={getValidationRules(type)} // 使用动态校验规则
        >
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={PLACE_HOLDER_MAP.get(type)}
          />
        </Form.Item>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InitPage;
