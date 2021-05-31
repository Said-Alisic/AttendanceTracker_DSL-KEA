import { Link as NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import './menu-items.module.css';

export function MenuItems() {

  // FUTURE-UPDATE: Refactor; poor functionality
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/') 
  };

  if (JSON.parse(localStorage.getItem('authUser'))) {
    if (JSON.parse(localStorage.getItem('authUser')).user.role === 'STUDENT') {
      return (
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/submit-attendance">
              Submit Attendance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            <NavLink to="/" onClick={handleLogout}>
              Sign out
            </NavLink>
          </Menu.Item>
        </Menu>
      )
    } else if (JSON.parse(localStorage.getItem('authUser')).user.role === 'TEACHER') {
      return (
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/attendances">
              Attendance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to="/check-attendance">
              Check Attendance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            <NavLink to="/" onClick={handleLogout}>
              Sign out
            </NavLink>
          </Menu.Item>
        </Menu>
      )
    } else if (JSON.parse(localStorage.getItem('authUser')).user.role === 'ADMIN') {
      return (
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
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            <NavLink to="/" onClick={handleLogout}>
              Sign out
            </NavLink>
          </Menu.Item>
        </Menu>
      )
    } 
  } else {
    return (
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<LogoutOutlined />}>
          <NavLink to="/" onClick={handleLogout}>
            Sign out
          </NavLink>
        </Menu.Item>
      </Menu>
    )
  }

}

export default MenuItems;
