import { formatISO } from "date-fns";
import { supabase } from "../../lib/supabase";

export interface IMM_WorkTimeRecordTBL {
  record_id: string;
  user_id: string;
  start_time: Date;
  end_time: Date;
}

export interface IMsgMesResponse {
  error_code: number | string;
  error_msg: string | Object | any;
  payload: Object;
}

export async function AddWorktimeRecord(
  input: IMM_WorkTimeRecordTBL,
): Promise<IMsgMesResponse> {
  console.log(
    `[I] AddWorktimeRecord: `,
    formatISO(input.start_time),
    formatISO(input.end_time),
  );
  let { error, data, count } = await supabase
    .from("mm_worktimerecord")
    .insert({
      user_id: input.user_id,
      start_time: formatISO(input.start_time),
      end_time: formatISO(input.end_time),
    })
    .then();
  console.log(
    `[I] AddWorktimeRecord - mm_worktimerecord: `,
    data,
    error,
    count,
  );
  let res: IMsgMesResponse = {
    error_code: 200,
    error_msg: "INSERT OK",
    payload: {},
  };
  return new Promise<IMsgMesResponse>((resolve, reject) => {
    if (error != null) {
      res.error_code = error.code;
      res.error_msg = error.message;
      reject(res);
    } else resolve(res);
  });
}
/**
 * @param data @type IMM_WorkTimeRecordTBL
 * @returns
 */
export async function WorktimeQuery(queryData: IMM_WorkTimeRecordTBL) {
  let { data, error } = await supabase.rpc('search_worktime',{})
  
  

  console.log(`[I] WorkTimeQuery: `, error, data);
  let res: IMsgMesResponse = {
    error_code: 200,
    error_msg: data,
    payload: {},
  };

 return new Promise<IMsgMesResponse>((resolve, reject) => {
    if (error != null) {
      res.error_code = error.code;
      res.error_msg = error.message.concat(error.details);
      reject(res);
    } else resolve(res);
  });
}
