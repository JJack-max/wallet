// src/InitPage.tsx
import React, { useState } from "react";
import { Form, Input, Select, Button, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const InitPage: React.FC = () => {
  const [dbType, setDbType] = useState<string>("sqlite");
  const [dbConnectionString, setDbConnectionString] = useState<string>("");

  const handleDbTypeChange = (value: string) => {
    setDbType(value);
    // 根据选择的数据库类型清空输入框
    setDbConnectionString("");
  };

  const handleSubmit = () => {
    console.log("数据库类型:", dbType);
    console.log("连接字符串:", dbConnectionString);
    // 在这里处理提交逻辑
  };

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <Title level={2}>初始化设置</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="选择数据库类型">
          <Select value={dbType} onChange={handleDbTypeChange}>
            <Option value="sqlite">SQLite</Option>
            <Option value="mysql">MySQL</Option>
            <Option value="postgres">PostgreSQL</Option>
          </Select>
        </Form.Item>
        <Form.Item label="数据库连接字符串">
          <Input
            value={dbConnectionString}
            onChange={(e) => setDbConnectionString(e.target.value)}
            placeholder={
              dbType === "sqlite"
                ? "例如: sqlite:test.db"
                : dbType === "mysql"
                ? "例如: mysql://user:password@host/test"
                : "例如: postgres://user:password@host/test"
            }
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
