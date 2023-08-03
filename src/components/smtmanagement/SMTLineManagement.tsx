// src/components/LineTW1.tsx

import React from 'react';
import SolderPasteMachine from './SolderPasteMachine';
import SolderAOI from './SolderAOI';
import SMTMachine1 from './SMTMachine1';
import SMTMachine2 from './SMTMachine2';
import { Container, Row, Col } from 'react-bootstrap';

const LineTW1: React.FC = () => {
  return (
    <div className="line-tw1">
      <h1>Line TW1</h1>
      <Container fluid>
        <Row>
          <Col md={8}>
            <Row>
              <Col sm={6}>
                <SolderPasteMachine />
              </Col>
              <Col sm={6}>
                <SolderAOI />
              </Col>
              <Col sm={6}>
                <SMTMachine1 />
              </Col>
              <Col sm={6}>
                <SMTMachine2 />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LineTW1;

