import { Component } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './layout.module.css';
import 'antd/dist/antd.css';


const { Header, Content, Footer, Sider } = AntLayout;
const { SubMenu } = Menu;

class Layout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item  key="1" icon={<PieChartOutlined />}>
              Classes
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Attendance
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
              Check Attendance
            </Menu.Item>
            <Menu.Item key="4" icon={<FileOutlined />}>
              Submit Attendance
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    );
  }
}

export default Layout;