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

export function AddWorktimeRecord(data: IMM_WorkTimeRecordTBL): Promise<IMsgMesResponse> {
  let isOk = false

  return new Promise<IMsgMesResponse>((resolve, reject) => {
    setTimeout(() => {
      console.log(`[I] APISvr_Add_WorktimeRecord: ${JSON.stringify(data)}`);
      if (isOk)
        resolve({ error_code: 200, error_msg: "Add_OK", payload: "NotImplement" })
      else{
        let msg : IMsgMesResponse = {
          error_code:400,
          error_msg: "Add_NG",
          payload : {}
        }
        reject(msg)
      }
    }, 2345)
  })
}
/**
 * 
 * @param data @type IMM_WorkTimeRecordTBL
 * @returns 
 */
export function WorktimeQuery(data: IMM_WorkTimeRecordTBL) {
  let isOk = false

  return new Promise<IMsgMesResponse>((resolve, reject) => {
    setTimeout(() => {
      console.log(`[I] APISvr_Select_WorktimeRecord: ${JSON.stringify(data)}`);
      if (isOk)
        resolve({ error_code: 200, error_msg: "Add_OK", payload: "NotImplement" })
      else{
        let msg : IMsgMesResponse = {
          error_code:400,
          error_msg: "Query_Not_found_NG",
          payload : {
            
          }
        }
        reject(msg)
      }
    }, 2345)
  })
}
