import { Component } from 'react';
import { Layout as AntLayout } from 'antd';
import './layout.module.css';
import 'antd/dist/antd.css';

import MenuItems from '../menu-items/menu-items';

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
          <MenuItems/>
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