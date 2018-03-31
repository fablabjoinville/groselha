import React from "react";
import { Jumbotron, Button, Form, FormGroup, FormControl, Col, Checkbox } from 'react-bootstrap';

const styles = {
  jumb: {
    paddingTop: '40px',
    backgroundColor: 'white'
  },
}

export default class App extends React.Component {
  render() {
    return (
      <Jumbotron style={styles.jumb}>
        <Col sm={6}>
          <h3><b>Registro do Endereço MAC do Fab Lab</b></h3>
          <div>
            <p>Ao digitar "/quem" no nosso Slack, o Groselha (o bot)
            retorna quem está no Fab Lab baseado nos endereços MACs escaneados na rede</p>
          </div>
        </Col>

        <Form horizontal>
          <FormGroup controlId="formFirstName">
            <Col sm={2}>
              Nome
            </Col>
            <Col sm={4}>
              <FormControl type="firstName" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formLastName">
            <Col sm={2}>
              Sobrenome
            </Col>
            <Col sm={4}>
              <FormControl type="LastName" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formMacAddess">
            <Col sm={2}>
              Endereço MAC
            </Col>
            <Col sm={4}>
              <FormControl type="MacAddess" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formKind">
            <Col sm={2}>
              Tipo
            </Col>
            <Col sm={4}>
              <Checkbox inline> Mobile</Checkbox>&nbsp;
              <Checkbox inline> PC</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="info">Registrar</Button>
            </Col>
          </FormGroup>
        </Form>
      </Jumbotron>
    )
  }
}
