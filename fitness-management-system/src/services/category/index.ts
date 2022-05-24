import request from "@/utils/request";
import { EquipCate, ResponseResult } from "../typings";
// 获取分类信息
export function getEquipCateList(body: {offset: number, limit: number}) {
  return request<
    ResponseResult<{
      list: EquipCate[],
      total: number
    }>
    >('/api/selectAllEquipTypes', {
      method: 'GET',
      params: body
    })
}
export function getAllEquipCateList() {
  return request<
    ResponseResult<{
      list: EquipCate[]
    }>
    >('/api/selectAllEquipTypes2', {
      method: 'GET'
    })
}
// 添加分类
export function addEquipCate(body: EquipCate) {
  return request<
  ResponseResult
  >('/api/type', {
    method: 'POST',
    data: body
  })
}
// 修改分类
export function updateEquipCate(body: EquipCate) {
  return request<
  ResponseResult
  >('/api/type', {
    method: 'PUT',
    data: body
  })
}
// 删除分类
export function deleteEquipCate(typeId: number) {
  return request<
  ResponseResult
  >('/api/type', {
    method: 'DELETE',
    restful: {
      typeId
    }
  })
}