import { useState } from "react";
import { useMesSelector } from "../../store";
import { Navigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";


function WorkTimeRecord() {
  const mesUser = useMesSelector((state) => state.mesUserState.user)
  const [dtStartTime, onChangeStartTime] = useState(new Date());
  const [dtEndTime, onChangeEndTime] = useState(new Date());

  function doSend(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert(_event)
  }

  function WorkTimeRecordForm() {
    return (
      <Card>
        <Card.Header as="h5">WORKTIME_RECORD</Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Form className="">
            <Stack>
              <Form.Group>
                <Form.Label> Start_Time: </Form.Label>
                <DateTimePicker onChange={onChangeStartTime} value={dtStartTime}></DateTimePicker>
              </Form.Group>
              <Form.Group>
                <Form.Label> End_Time: </Form.Label>
                <DateTimePicker onChange={onChangeEndTime} value={dtEndTime}></DateTimePicker>
              </Form.Group>
              <Button variant="primary" onClick={doSend}>Send</Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    );
  }


  if (!mesUser.isAuthed) return <Navigate to="/Login" />
  return (
    <>
      <div>
        <div className="">
          <Container>
            <WorkTimeRecordForm></WorkTimeRecordForm>
          </Container>


        </div>
      </div>
    </>

  )
}

export default WorkTimeRecord
