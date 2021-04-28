import { Component } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Layout as AntLayout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './layout.module.css';
import 'antd/dist/antd.css';


const { Header, Content, Sider } = AntLayout;

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
          <Menu theme="dark" mode="inline">
            <Menu.Item  key="1" icon={<TeamOutlined />}>
              <NavLink to="/classes">
                Classes
              </NavLink>
            </Menu.Item>
            <Menu.Item  key="2" icon={<TeamOutlined />}>
              <NavLink to="/users">
                Users
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              <NavLink to="/attendance">
                Attendance
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <NavLink to="/check-attendance">
                Check Attendance
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              <NavLink to="/submit-attendance">
                Submit Attendance
              </NavLink>
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