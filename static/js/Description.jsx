import React from "react";
import { Col } from 'react-bootstrap';


export default class Description extends React.Component {
  render() {
    return (
      <Col sm={6}>
        <h3><b>Registro do Endereço MAC</b></h3>
        <p>Ao digitar <code>/quem</code> no nosso Slack, o bot Groselha
        retorna quem está no Fab Lab baseado nos endereços MACs escaneados na rede.</p>
      </Col>
    )
  }
}
