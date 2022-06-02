import request from "@/utils/request";
import type { ResponseResult, Course, CourseInfo } from "../typings";

export function getCourseInfoList(param: { startPage?: number, pageSize?: number, keyword?: string }) {
  return request<
    ResponseResult<{
      list: CourseInfo[],
      total: number,
    }>
  >('/api/course', {
    method: 'GET',
    restful: param
  })
}

// 课程退选
export function dropCourse(courseId: string, memberId: string) {
  return request<
  ResponseResult
  >('/api/courseMember', {
    method: 'DELETE',
    data: {
      courseId,
      memberId
    }
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