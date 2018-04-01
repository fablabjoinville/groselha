import React from "react";
import { Jumbotron, Button, Form, FormGroup, FormControl, Col, Checkbox, Row } from 'react-bootstrap';

const styles = {
  title: {
    paddingLeft: '30px',
    paddingBottom: '20px'
  },
  content: {
    paddingLeft: '20px'
  },
  jumb: {
    backgroundColor: 'rgb(210, 228, 222)',
    margin: '2% 25% 0% 25%',
  },
}

export default class App extends React.Component {
  render() {
    return (
      <Jumbotron style={styles.jumb}>
        <Row style={styles.title}>
          <Col>
            <img
              src="https://raw.githubusercontent.com/fablabjoinville/fablabjoinville.github.io/master/assets/images/logo.png"
              alt="Fab Lab Logo"
              height="50"
              width="50"
            />
          </Col>
          <Col sm={10}>
            <h1><b>FAB LAB </b>JOINVILLE</h1>
          </Col>
        </Row>

        <Row style={styles.content}>
          <Col sm={6}>
            <h3><b>Registro do Endereço MAC</b></h3>
            <p>Ao digitar <code>/quem</code> no nosso Slack, o bot Groselha
            retorna quem está no Fab Lab baseado nos endereços MACs escaneados na rede.</p>
          </Col>
          <Form horizontal>
            <FormGroup controlId="formFirstName">
              <Col>Nome</Col>
              <Col>
                <FormControl type="firstName" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formLastName">
              <Col>Sobrenome</Col>
              <Col>
                <FormControl type="LastName" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formMacAddess">
              <Col>Endereço MAC</Col>
              <Col>
                <FormControl type="MacAddess" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formKind">
              <Col>Tipo</Col>
              <Col>
                <Checkbox inline> Mobile</Checkbox>&nbsp;
                <Checkbox inline> PC</Checkbox>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2}>
                <Button type="submit" href="/register-macs"  bsStyle="success">Registrar</Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Jumbotron>
    )
  }
}
