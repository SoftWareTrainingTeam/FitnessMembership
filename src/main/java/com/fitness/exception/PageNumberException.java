package com.fitness.exception;

/**
 * @author: chiatso
 * @create: 2022-05-20 15:13
 * @description: 查询页码异常类
 */
public class PageNumberException extends RuntimeException{

  private String message;

  public PageNumberException() {
    super();
  }
  public PageNumberException(String message) {
    super(message);
    this.message = message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  @Override
  public String getMessage() {
    return message;
  }
}
