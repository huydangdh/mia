import moment from "moment"
import { MesCardUI, MesModalUI } from "../MesUI"

function TestUI() {
  return (
    <>
      <MesCardUI card_header={"Header"} card_img="/Total.jpg" card_title="Title" card_body={"VioBody"} card_footer={"Footer"} />
      <MesModalUI />
    </>
  )
}


console.log(moment("05:00","hh:mm").hour())

export default TestUI
