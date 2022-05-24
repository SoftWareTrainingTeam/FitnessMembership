import request from "@/utils/request";
import type { Equip, ResponseResult } from "../typings";

export function getEquipList(body: { offset: number, limit: number }) {
  return request<
    ResponseResult<{
      total: number,
      list: Equip[]
    }>
  >('/api/AllEquipsInfo', {
    method: 'GET',
    params: body
  })
}
export function addEquip(body: Equip) {
  return request<
  ResponseResult
  >('/api/insertEquip', {
    method: 'POST',
    data: body
  })
}
export function updateEquip(body: Equip) {
  return request<
  ResponseResult
  >('/api/updateEquip', {
    method: 'PUT',
    data: body
  })
}
export function deleteEquip(id: number) {
  return request<
  ResponseResult
  >('/api/deleteEquip', {
    method: 'DELETE',
    params: {
      id
    }
  })
}
