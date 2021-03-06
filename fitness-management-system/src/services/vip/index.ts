import request from "@/utils/request";
import type { ResponseResult, Vip } from "../typings";

export function getVipList(param: {startPage?: number, pageSize?: number, keyword?: string}) {
  return request<
    ResponseResult<{
      list: Vip[],
      total: number,
    }>
  >('/api/member', {
    method: 'GET',
    restful: param
  })
}

export function addVip(body: Omit<Vip, 'memberId'>) {
  return request<
    ResponseResult<string>
  >('/api/member', {
    method: 'POST',
    data: body
  })
}

export function updateVip(body: Vip) {
  return request<
    ResponseResult<string>
  >('/api/member', {
    method: 'PUT',
    data: body
  })
}

export function deleteVip(id: string) {
  return request<
    ResponseResult
  >('/api/member', {
    method: 'DELETE',
    restful: {
      id
    }
  })
}