import request from "@/utils/request";
import type { CurrentUser, LoginParams, ResponseResult } from "../typings";

/**
 * 
 * @param params 
 * @returns 
 */
export function login(params: LoginParams) {
  return request<
  ResponseResult<string>
  >('/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    }
  )
}

export function getCaptcha() {
  return request<
  ResponseResult<string>
  >('/api/captcha',{
      method: 'GET'
    }
  )
}

export function getCurrentUser() {
  return request<
  ResponseResult<CurrentUser>
  >('/api/currentUser', {
    method: 'GET',
  });
}