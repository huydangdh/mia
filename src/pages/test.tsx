import moment from "moment"
import { MesUICard, MesUIModal } from "../MesUI"

function TestUI() {
  return (
    <>
      <MesUICard card_header={"Header"} card_img="/Total.jpg" card_title="Title" card_body={"VioBody"} card_footer={"Footer"} />
      <MesUIModal />
    </>
  )
}


console.log(moment("05:00","hh:mm").hour())

export default TestUI
