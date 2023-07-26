import { formatISO } from "date-fns";
import { supabase } from "../../lib/supabase";

interface WorkTimeRecord {
  record_id: string;
  user_id: string;
  start_time: Date;
  end_time: Date;
}

interface MsgMesResponse<T> {
  error_code: number | string;
  error_msg: string | any;
  payload: T;
}

const formatWorkTimeRecord = (record: WorkTimeRecord) => ({
  ...record,
  start_time: formatISO(record.start_time),
  end_time: formatISO(record.end_time),
});

export async function AddWorktimeRecord(
  input: WorkTimeRecord
): Promise<MsgMesResponse<{}>> {
  try {
    console.log("[I] AddWorktimeRecord: ", formatISO(input.start_time), formatISO(input.end_time));
    const { error } = await supabase.from("mm_worktimerecord").insert(formatWorkTimeRecord(input));
    if (error) {
      throw new Error(error.message);
    }
    return { error_code: 200, error_msg: "INSERT OK", payload: {} };
  } catch (error) {
    return { error_code: error.code || 500, error_msg: error.message, payload: {} };
  }
}

export async function WorktimeQuery(
  queryData: WorkTimeRecord
): Promise<MsgMesResponse<WorkTimeRecord[]>> {
  try {
    const { data, error } = await supabase.rpc("search_worktime", {
      in_start_time: formatISO(queryData.start_time),
      in_end_time: formatISO(queryData.end_time),
    });
    if (error) {
      throw new Error(error.message);
    }
    return { error_code: 200, error_msg: "", payload: data || [] };
  } catch (error) {
    return { error_code: error.code || 500, error_msg: error.message, payload: [] };
  }
}
