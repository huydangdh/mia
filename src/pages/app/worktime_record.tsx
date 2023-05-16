import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

function WorkTimeRecord() {
  const [value, onChange] = useState(new Date());


  function doSend(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    alert(_event)
  }

  return (
    <>
      <div>
        <div className="w3-card-4">
          <div className="w3-container w3-green">
            <h2>Input WorkTimeRecord</h2>
          </div>
          <form className="w3-container">
            <p>
              <label>Start_Time: </label>
              <DateTimePicker onChange={onChange} value={value}></DateTimePicker>
            </p>
            <p>
              <label>End_Time: </label>
              <DateTimePicker onChange={onChange} value={value} ></DateTimePicker>
            </p>
            <button type="button" onClick={doSend}>Send</button>
            <p></p>
          </form>

        </div>
      </div>
    </>

)
}

export default WorkTimeRecord
