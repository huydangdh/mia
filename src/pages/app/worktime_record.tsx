import { useState } from "react";
import { useMesSelector } from "../../store";
import { Navigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { MesCardUI } from "../../MesUI";
import moment from "moment";


function WorkTimeRecord() {
  const mesUser = useMesSelector((state) => state.mesUserState.user)
  const [dtStartTime, onChangeStartTime] = useState(new Date());
  const [dtEndTime, onChangeEndTime] = useState(new Date());

  function doSend(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert(_event)
  }

  function WorkTimeRecordForm() {
    function MyForm() {
      const mesUser = useMesSelector(s => s.mesUserState.user)
      const [dtStartTime, onChangeStartTime] = useState(moment(mesUser.miscInfo.start_time, "hh:mm").toDate());
      const [dtEndTime, onChangeEndTime] = useState(new Date());



      return (
        <>
          <div>
            <p>start_time: </p>
            <DateTimePicker onChange={onChangeStartTime} value={dtStartTime} />
            <p>EndTime:</p>
            <DateTimePicker onChange={onChangeEndTime} value={dtEndTime} />

          </div>
        </>
      )
    }
    return (
      <MesCardUI card_title="Title" card_body={<MyForm />} card_header={"Sample_CardUI"}></MesCardUI>
    )
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
