import { useEffect, useState } from "react";
import { useMesSelector } from "../../store";
import { Navigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { MesCardUI, MesModalUI } from "../../MesUI";
import moment from "moment";
import { APISvr_Add_WorktimeRecord } from "../../util/mock";


function WorkTimeQuery() {
  const mesUser = useMesSelector((state) => state.mesUserState.user)
  const [showAlert, setShowAlert] = useState(false)

  function doSend(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert(_event)
  }

  function WorkTimeQueryForm() {
    function MyForm() {
      const mesUser = useMesSelector(s => s.mesUserState.user)
      const [dtStartTime, onChangeStartTime] = useState(moment(mesUser.miscInfo.start_time, "hh:mm").toDate());
      const [dtEndTime, onChangeEndTime] = useState(new Date());

      const [isLoading, setLoading] = useState<boolean>(false)

      useEffect(() => {
        if (isLoading) {
          alert(`[I] mStartTime: ${dtStartTime}, mEndTime: ${dtEndTime}`);

          APISvr_Add_WorktimeRecord({
            user_id: mesUser.id,
            record_id: "001",
            start_time: dtStartTime,
            end_time: dtEndTime
          }).then(() => {
            setLoading(false)
          }).catch((reason) => {
            console.error(reason)
            setLoading(false)
          })

        }
      }, [isLoading])

      function DoPost() {
        setLoading(true)
      }

      return (
        <>
          <div className="d-grid gap-2">
            <p>start_time: </p>
            <DateTimePicker onChange={onChangeStartTime} value={dtStartTime} />
            <p></p>
            EndTime:
            <DateTimePicker onChange={onChangeEndTime} value={dtEndTime} />
            <p />
            <Button disabled={isLoading} variant="primary" onClick={DoPost}>{isLoading ? "Adding..." : "Thêm"}</Button>
          </div>
        </>
      )
    }
    return (
      <MesCardUI card_title="Title" card_body={<MyForm />} card_header={"WorkTimeRecord"} card_footer={"Footer"}></MesCardUI>
    )
  }


  if (!mesUser.isAuthed) return <Navigate to="/Login" />
  return (
    <>
      <div>
        <div className="">
          <Container>
            <WorkTimeQueryForm></WorkTimeQueryForm>
          </Container>
          {showAlert ? <MesModalUI title="Alert" content="Test" /> : ""}

        </div>
      </div>
    </>

  )
}

export default WorkTimeQuery
