import { formatISO } from "date-fns";
import { supabase } from "../../lib/supabase"

export interface IMM_WorkTimeRecordTBL {
  record_id: string,
  user_id: string,
  start_time: Date,
  end_time: Date
}

export interface IMsgMesResponse {
  error_code: number,
  error_msg: string,
  payload: Object,

}

export async function AddWorktimeRecord(input: IMM_WorkTimeRecordTBL): Promise<IMsgMesResponse> {
//  let { error, data, count } = await supabase.from("mm_worktimerecord").insert({ user_id: "" }).then()
  console.log(`[I] AddWorktimeRecord: `, formatISO(input.start_time));


}
/**
 * 
 * @param data @type IMM_WorkTimeRecordTBL
 * @returns 
 */
export async function WorktimeQuery(queryData: IMM_WorkTimeRecordTBL) {
  let { error, data, count } = await supabase.from("mm_worktimerecord").select("*").then()
  console.log(`[I] WorkTimeQuery: `, error, data, count);


}
