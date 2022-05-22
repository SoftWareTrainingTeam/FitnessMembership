import request from "@/utils/request";
import type { ResponseResult, Coach } from "../typings";
export function getCoachList(param: {startPage?: number, pageSize?: number, keyword?: string}) {
  return request<
    ResponseResult<{
      list: Coach[],
      total: number,
    }>
  >('/api/coach', {
    method: 'GET',
    restful: param
  })
}
export function addCoach(body: Omit<Coach, 'coachId'>) {
  return request<
    ResponseResult<string>
  >('/api/coach', {
    method: 'POST',
    data: body
  })
}

export function updateCoach(body: Coach) {
  return request<
    ResponseResult<string>
  >('/api/coach', {
    method: 'PUT',
    data: body
  })
}
export function deleteCoach(id: string) {
  return request<
    ResponseResult
  >('/api/coach', {
    method: 'DELETE',
    restful: {
      id
    }
  })
}