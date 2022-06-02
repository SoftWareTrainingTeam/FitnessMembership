import request from "@/utils/request";
import { ResponseResult } from "../typings";

export function getVipSignInRecord(memberId: string, date: string) {
  return request<
  ResponseResult<{calender: number}>
  >('/api/calender', {
    method: 'POST',
    restful: {
      memberId,
      date
    }
  })
}

export function signIn(identity: string) {
  return request<
  ResponseResult
  >('/api/signIn', {
    method: 'POST',
    restful: {
      identity
    }
  })
}