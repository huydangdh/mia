import { useEffect, useState } from "react";
import { useMesSelector } from "../../store";
import { Navigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { Button, Container } from "react-bootstrap";
import { MesUICard, MesUIModal } from "../../MesUI";
import moment from "moment";
import { WorktimeQuery } from "../../api/mes_app/WorkTimeAPI";
import { formatISO } from "date-fns";

// datagrid
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid'

function WorkTimeQuery() {
  const mesUser = useMesSelector((state) => state.mesUserState.user);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const columns = [
    { key: 'record_id', name: "Record ID"},
    { key: 'user_id', name: "User ID"},
    { key: 'user_name', name: 'User Name'},
    { key: 'start_time', name: "Start Time"},
    { key: 'end_time', name: "End Time"}
  ]

  const default_cols = [
    {record_id: 'xxx-xxx-xxx-xxx', start_time:"xxx", end_time: "xxx"}
  ]
  const [rows, setRows] = useState(default_cols);

  function MesModalUIOnHide() {
    setShowAlert(false);
  }

  function doSend(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    alert(_event);
  }

  function WorkTimeQueryForm() {
    function MyForm() {
      const mesUser = useMesSelector((s) => s.mesUserState.user);
      const [dtStartTime, onChangeStartTime] = useState(
        moment(mesUser.miscInfo.start_time, "hh:mm").toDate(),
      );
      const [dtEndTime, onChangeEndTime] = useState(new Date());

      const [isLoading, setLoading] = useState<boolean>(false);

      useEffect(() => {
        if (isLoading) {
          alert(`[I] mStartTime: ${dtStartTime}, mEndTime: ${dtEndTime}`);

          WorktimeQuery({
            user_id: mesUser.id,
            record_id: "001",
            start_time: formatISO(dtStartTime),
            end_time: formatISO(dtEndTime),
          })
            .then((res) => {
              setLoading(false);
              setRows(res.error_msg);
            })
            .catch((reason) => {
              console.error(reason);
              setLoading(false);
              setAlertContent(reason);
              setShowAlert(true);
            });
        }
      }, [isLoading]);

      function DoPost() {
        setLoading(true);
      }

      return (
        <>
          <div className="d-grid gap-2">
            start_time:
            <DateTimePicker onChange={onChangeStartTime} value={dtStartTime} />
            <p></p>
            EndTime:
            <DateTimePicker onChange={onChangeEndTime} value={dtEndTime} />
            <p />
            <Button disabled={isLoading} variant="primary" onClick={DoPost}>
              {isLoading ? "Đang truy vấn..." : "Truy vấn"}
            </Button>
          </div>
        </>
      );
    }
    return (
      <MesUICard
        card_title="Title"
        card_body={<MyForm />}
        card_header={"WorkTimeQuery"}
        card_footer={"Footer"}
      >
      </MesUICard>
    );
  }

  if (!mesUser.isAuthed) return <Navigate to="/Login" />;
  return (
    <>
      <div>
        <div className="">
          <Container>
            <WorkTimeQueryForm></WorkTimeQueryForm>
            <br></br> 
            <DataGrid columns={columns} rows={rows} onRowsChange={setRows}></DataGrid>
          </Container>
          <MesUIModal
            title="Thông báo"
            content={alertContent.error_msg}
            isShow={showAlert}
            onHide={MesModalUIOnHide}
          />
        </div>
      </div>
    </>
  );
}

export default WorkTimeQuery;
