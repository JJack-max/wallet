// src/InitPage.tsx
import React, { useState } from "react";
import { Form, Input, Select, Button, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const InitPage: React.FC = () => {
  const msg = {
    sqlite: "例如: sqlite:test.db",
    mysql: "例如: mysql://user:password@host:port/test",
    postgres: "例如: postgres://user:password@host:port/test",
  };
  const PLACE_HOLDER_MAP = new Map<string, string>();
  PLACE_HOLDER_MAP.set("sqlite", "例如: sqlite:test.db");
  PLACE_HOLDER_MAP.set("mysql", "例如: mysql://user:password@host:port/test");
  PLACE_HOLDER_MAP.set(
    "postgres",
    "例如: postgres://user:password@host:port/test"
  );

  const [type, setType] = useState<string>("sqlite");
  const [url, setUrl] = useState<string>("");

  const handleDbTypeChange = (value: string) => {
    setType(value);
    // 根据选择的数据库类型清空输入框
    setUrl("");
  };

  const handleSubmit = () => {
    console.log("数据库类型:", type);
    console.log("连接字符串:", url);
    // 在这里处理提交逻辑
  };

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <Title level={2}>初始化设置</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="选择数据库类型">
          <Select value={type} onChange={handleDbTypeChange}>
            <Option value="sqlite">SQLite</Option>
            <Option value="mysql">MySQL</Option>
            <Option value="postgres">PostgreSQL</Option>
          </Select>
        </Form.Item>
        <Form.Item label="数据库连接字符串">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={PLACE_HOLDER_MAP.get(type)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InitPage;
