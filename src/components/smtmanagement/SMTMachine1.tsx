import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import "./SMTLine.css";
import { Link } from "react-router-dom";

interface Feeder {
  id: number;
  name: string;
  componentType: string;
  status: string;
  materialCode: string;
  traceCode: string; // Add the traceCode property
}

interface CurrentProduction {
  pcbName: string;
}

const SMTMachine1: React.FC = () => {
  const [currentProduction, setCurrentProduction] = useState<CurrentProduction>(
    {
      pcbName: "PCB1234",
    }
  );
  const [selectedFeeder, setSelectedFeeder] = useState<Feeder | null>(null);

  const [feedersData, setFeedersData] = useState<Feeder[]>([
    {
      id: 1,
      name: "Feeder 1",
      componentType: "Resistor",
      status: "Ready",
      materialCode: "RES001",
      traceCode: "TRC001", // Simulated trace code
    },
    {
      id: 2,
      name: "Feeder 2",
      componentType: "Capacitor",
      status: "Empty",
      materialCode: "",
      traceCode: "", // Simulated trace code
    },
    {
      id: 3,
      name: "Feeder 3",
      componentType: "IC",
      status: "Ready",
      materialCode: "IC123",
      traceCode: "TRC003", // Simulated trace code
    },
    {
      id: 4,
      name: "Feeder 4",
      componentType: "Connector",
      status: "Low",
      materialCode: "CONN789",
      traceCode: "TRC004", // Simulated trace code
    },
    {
      id: 5,
      name: "Feeder 5",
      componentType: "Transistor",
      status: "Ready",
      materialCode: "TRANS456",
      traceCode: "TRC005", // Simulated trace code
    },
  ]);

  const handleFeederClick = (feeder: Feeder) => {
    setSelectedFeeder(feeder);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPCBName = `PCB${Math.floor(Math.random() * 10000)}`;
      setCurrentProduction({
        pcbName: randomPCBName,
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container className="smt-machine">
      <h2 className="header">SMT Machine 1</h2>
      <Row className="current-production">
        <Col>
          <div className="current-product icon-card">
            <h3 className="sub-header">Current Production</h3>
            <div className="current-production-details">
              <div className="pcb-name">
                <span className="label">PCB Name:</span>
                <span className="animated-text">
                  {currentProduction.pcbName}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="feeders-list">
        <Col>
          <h3 className="sub-header">Feeder List</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Feeder Name</th>
                <th>Component Type</th>
                <th>Status</th>
                <th>Material Code</th>
              </tr>
            </thead>
            <tbody>
              {feedersData.map((feeder) => (
                <tr
                  key={feeder.id}
                  onClick={() => handleFeederClick(feeder)}
                  className={selectedFeeder === feeder ? "selected" : ""}
                >
                  <td>{feeder.name}</td>
                  <td>{feeder.componentType}</td>
                  <td>
                    <Badge
                      pill
                      bg={
                        feeder.status === "Ready"
                          ? "success"
                          : feeder.status === "Empty"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {feeder.status}
                    </Badge>
                  </td>
                  <td>{feeder.materialCode}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {selectedFeeder && (
        <Row className="feeder-details">
          <Col>
            <h3 className="sub-header">Feeder Details</h3>
            <div className="feeder-details-content">
              <p>
                <strong>Feeder Name:</strong> {selectedFeeder.name}
              </p>
              <p>
                <strong>Component Type:</strong> {selectedFeeder.componentType}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  pill
                  bg={
                    selectedFeeder.status === "Ready"
                      ? "success"
                      : selectedFeeder.status === "Empty"
                        ? "danger"
                        : "warning"
                  }
                >
                  {selectedFeeder.status}
                </Badge>
              </p>
              <p>
                <strong>Material Code:</strong> {selectedFeeder.materialCode}
              </p>
              <p>
                <strong>Trace Code:</strong> <Link to={"/app/smtmgn/traceCodeDetail=?" + selectedFeeder.traceCode} >{selectedFeeder.traceCode}</Link>
              </p>
              {/* Additional material details can be displayed here */}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SMTMachine1;
