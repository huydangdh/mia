import { useEffect, useState } from "react";
import { useMesSelector } from "../../store";
import { Navigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { MesUICard, MesUIModal } from "../../MesUI";
import moment from "moment";
import { AddWorktimeRecord, IMsgMesResponse } from "../../api/mes_app/WorkTimeAPI";


function WorkTimeRecord() {
  const mesUser = useMesSelector((state) => state.mesUserState.user)
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState("")

  const onHideMesUI = () =>{
    setShowAlert(false)
  }

  function doSend(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert(_event)
  }

  function WorkTimeRecordForm() {
    function MyForm() {
      const mesUser = useMesSelector(s => s.mesUserState.user)
      const [dtStartTime, onChangeStartTime] = useState(moment(mesUser.miscInfo.start_time, "hh:mm").toDate());
      const [dtEndTime, onChangeEndTime] = useState(new Date());

      const [isLoading, setLoading] = useState<boolean>(false)
      useEffect(() => {
        if (isLoading) {
          alert(`[I] mStartTime: ${dtStartTime}, mEndTime: ${dtEndTime}`);

          AddWorktimeRecord({
            user_id: mesUser.id,
            record_id: "0010",
            start_time: dtStartTime,
            end_time: dtEndTime
          }).then((res) => {
            setShowAlert(true)
            setAlertContent(res.error_msg)
            setLoading(false)
          }).catch((reason : IMsgMesResponse) => {
            console.error(reason)
            setLoading(false)
            setShowAlert(true)
            setAlertContent(reason.error_msg)
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
            <Button disabled={isLoading} variant="primary" onClick={DoPost}>{isLoading ? "Đang thêm." : "Thêm"}</Button>
          </div>
        </>
      )
    }
    return (
      <MesUICard card_title="Title" card_body={<MyForm />} card_header={"WorkTimeRecord"} card_footer={"Footer"}></MesUICard>
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
          <MesUIModal title="Thông báo" content={alertContent} isShow={showAlert} onHide={onHideMesUI} />
        </div>
      </div>
    </>

  )
}

export default WorkTimeRecord
