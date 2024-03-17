import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
const { Header, Sider, Content } = Layout;

export default function PageLayout({children}) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    // <div className={styles.container}>
    //   <h1>Welcome to the Exam App</h1>
    //   <Link href="/exams">
    //     <button className={styles.button}>Start Creating Exams</button>
    //   </Link>
    // </div>
    <Layout className={styles.pageLayout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={currentRoute}
        >
          <Menu.Item
            key="/"
            icon={<UserOutlined />}
          >
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key="/exams"
            icon={<VideoCameraOutlined />}
          >
            <Link href="/exams">Exams</Link>
          </Menu.Item>
          <Menu.Item
            key="/exams/create"
            icon={<UploadOutlined />}
          >
            <Link href="/exams/create">Create Exam</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}