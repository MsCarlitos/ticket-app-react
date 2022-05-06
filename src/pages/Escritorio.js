import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useHideMenu } from '../hooks/useHideMenu';
const { Title, Text } = Typography;

export const Escritorio = () => {

  const [ticket, setTicket] = useState(null)
  const [usuario] = useState(getUsuarioStorage);
  const { socket } = useContext(SocketContext);
  const history = useNavigate();
  useHideMenu(false);

  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
      setTicket(ticket)
    })
  }
  const salir = () => {
    localStorage.clear();
    history('/ingresar');
  }

  if(!usuario.agente && !usuario.escritorio) {
    return <Navigate to="ingresar" />
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type='success'>{usuario.escritorio}</Text>
        </Col>
        <Col span={4} align='right'>
          <Button
            shape='round'
            type='danger'
            onClick={salir}
          >
            <CloseCircleOutlined/>
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col span={24}>
            <Text>Esta atendiendo el ticket número:</Text>
            <Text
              style={{fontSize: 30}}
              type='danger'
            >
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col offset={18} span={6} align='right'>
          <Button onClick={siguienteTicket} shape='round' type='primary'>
            <RightOutlined/>
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  )
}
