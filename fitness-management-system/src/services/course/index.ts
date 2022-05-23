import request from "@/utils/request";
import type { ResponseResult, Course } from "../typings";

export function getCourseList(param: { startPage?: number, pageSize?: number, keyword?: string }) {
  return request<
    ResponseResult<{
      list: Course[],
      total: number,
    }>
  >('/api/courseinfo', {
    method: 'GET',
    restful: param
  })
}

export function getCourseById(id: string) {
  return request<
    ResponseResult<Course>
  >('/api/courseinfo', {
    method: 'GET',
    restful: {
      id
    }
  })
}

export function addCourse(body: Omit<Course, 'courseId'>) {
  return request<
    ResponseResult<string>
  >('/api/courseinfo', {
    method: 'POST',
    data: body
  })
}

export function updateCourse(body: Course) {
  return request<
    ResponseResult<string>
  >('/api/courseinfo', {
    method: 'PUT',
    data: body
  })
}

export function deleteCourse(id: string) {
  return request<
    ResponseResult
  >('/api/courseinfo', {
    method: 'DELETE',
    restful: {
      id
    }
  })
}