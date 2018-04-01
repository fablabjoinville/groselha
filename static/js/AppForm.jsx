import React from "react";
import { Jumbotron, Button, Form, FormGroup, FormControl, Col, Radio, Row } from 'react-bootstrap';

import Top from './Top'
import Description from './Description'


const styles = {
  content: {
    paddingLeft: '20px'
  },
  jumb: {
    backgroundColor: 'rgb(210, 228, 222)',
    margin: '2% 25% 0% 25%',
  },
}

export default class AppForm extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }

  handleSubmit(body) {
    fetch('/register-macs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
  }

  render() {
    return (
      <Jumbotron style={styles.jumb}>
        <Top />
        <Row style={styles.content}>
          <Description />
          <Form horizontal>
            <FormGroup controlId="formFirstName">
              <Col>
                <b>Nome</b>
              </Col>
              <Col>
                <FormControl
                  type="firstName"
                  onChange={(e) => this.setState({firstName: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formLastName">
              <Col>
                <b>Sobrenome</b>
              </Col>
              <Col>
                <FormControl
                  type="LastName"
                  onChange={(e) => this.setState({lastName: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formMacAddess">
              <Col>
                <b>Endereço MAC</b>
              </Col>
              <Col>
                <FormControl
                  type="MacAddess"
                  onChange={(e) => this.setState({macAddress: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formKind">
              <Col>
                <b>Tipo</b>
              </Col>
              <Col onClick={(e) => this.setState({kind: e.target.value})}>
                <Radio name="radioGroup" inline value='mobile'>
                  Mobile
                </Radio>{' '}
                <Radio name="radioGroup" inline value='pc'>
                  PC
                </Radio>{' '}
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2}>
                <Button
                  type="submit"
                  onClick={this.handleSubmit}
                  bsStyle="success">Registrar
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Jumbotron>
    )
  }
}
