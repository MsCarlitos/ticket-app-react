import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import {Ingresar} from './Ingresar';
import {Cola} from './Cola';
import {CrearTicket} from './CrearTicket';
import { Escritorio } from './Escritorio';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;

const RouterPage = () => {
  const {ocultarMenu} = useContext(UiContext);
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsedWidth='0' breakpoint='md' hidden={ocultarMenu}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to='/ingresar'>Ingresar</Link>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to='/cola'>Cola</Link>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <Link to='/crear'>Crear Ticket</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/ingresar" element={<Ingresar />}/>
              <Route path="/cola" element={<Cola />}/>
              <Route path="/crear" element={<CrearTicket />}/>
              <Route path="/escritorio" element={<Escritorio />}/>
              <Route path='/*' element={<Ingresar />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default RouterPage;