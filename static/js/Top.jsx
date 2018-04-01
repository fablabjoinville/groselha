import React from "react";
import { Col, Row } from 'react-bootstrap';

const styles = {
  title: {
    paddingLeft: '30px',
    paddingBottom: '20px'
  },
}

export default class Top extends React.Component {
  render() {
    return (
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
    )
  }
}
