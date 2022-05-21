export type ResponseResult<T> = {
  code: number,
  msg: string,
  data: T
}

export type LoginParams = {
  username: string,
  password: string,
  code: string,
}