import React from "react";
import { Jumbotron, Button, Form, FormGroup, FormControl, Col, Radio, Row } from 'react-bootstrap';

import Description from './Description'
import Top from './Top'


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
    this.submitButton = this.submitButton.bind(this)
    this.anyError = this.anyError.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      macAddress: '',
      kind: '',
    }
  }

  anyError() {
    let stateValues = Object.values(this.state)
    let stateValuesLength = stateValues.map((i) => i.length)
    if (stateValuesLength.indexOf(0) === -1) // There is no value equal to '0', therefore, no errors
      return true
    else
      return false
  }

  submitButton() {
    if (this.anyError())
      return (<Button type="submit" onClick={this.handleSubmit} bsStyle="success">Registrar</Button>)
    else
      return (<Button type="submit" disabled bsStyle="success">Registrar</Button>)
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
            <FormGroup>
              <Col>
                <b>Nome</b>
              </Col>
              <Col>
                <FormControl
                  type="text"
                  onChange={(e) => this.setState({firstName: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col>
                <b>Sobrenome</b>
              </Col>
              <Col>
                <FormControl
                  type="text"
                  onChange={(e) => (
                    this.setState({lastName: e.target.value})
                  )}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col>
                <b>Endereço MAC</b>
              </Col>
              <Col>
                <FormControl
                  type="text"
                  onChange={(e) => (
                    this.setState({macAddress: e.target.value})
                  )}
                />
              </Col>
            </FormGroup>
            <FormGroup>
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
                {this.submitButton()}
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Jumbotron>
    )
  }
}
