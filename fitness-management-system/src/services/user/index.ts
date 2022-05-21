import request from "@/utils/request";
import type { LoginParams, ResponseResult } from "../typings";

export function login(params: LoginParams) {
  return request<ResponseResult<string>>(
    '/api/login',
    {
      method: 'POST',
      data: params
    }
  )
}

export function getCaptcha() {
  return request<ResponseResult<string>>(
    '/api/captcha',
    {
      method: 'GET'
    }
  )
}