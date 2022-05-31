package com.fitness.entity;

import java.io.Serializable;

/**
 * @author: chiatso
 * @create: 2022-05-19 14:50
 * @description: 通用返回实体类
 */
public class Result<T> implements Serializable {


  //状态码
  private int code;

  //消息
  private String msg;

  //数据
  private T data;

  //成功
  public final static int OK = 200;

  //参数格式错误
  public final static int PARAMETER_ERROR = 400;

  //认证
  public final static int NOT_ALLOWED = 401;

  public final static int BAD_REQUEST = 400;

  //错误
  public final static int ERROR = 500;

  public Result() {
  }

  public Result(int code, String msg) {
    this(code, msg, null);
  }

  public Result(int code, String msg, T data) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }

  public void setCode(int code) {
    this.code = code;
  }

  public void setMsg(String msg) {
    this.msg = msg;
  }

  public void setData(T data) {
    this.data = data;
  }

  public int getCode() {
    return code;
  }

  public String getMsg() {
    return msg;
  }

  public T getData() {
    return data;
  }
}
