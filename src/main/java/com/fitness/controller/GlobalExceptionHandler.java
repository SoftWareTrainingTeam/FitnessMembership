package com.fitness.controller;

import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

/**
 * @author: chiatso
 * @create: 2022-05-20 14:30
 * @description: 全局异常处理器
 */
@ControllerAdvice
@ResponseBody
//@RestControllerAdvice //可以使用复合注解
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  @Override
  protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
    // 处理数据校验问题
    if (ex instanceof MethodArgumentNotValidException) {
      String message = ((MethodArgumentNotValidException) ex).getFieldErrors().stream()
              .map(v -> v.getField() + ":" + v.getDefaultMessage())
              .collect(Collectors.joining(";"));
      body = new Result(Result.PARAMETER_ERROR, message);
    }
    return super.handleExceptionInternal(ex, body, headers, status, request);
  }

  @ExceptionHandler({PageNumberException.class})
  public Result handlePageNumberException(PageNumberException e) {
    return new Result(Result.ERROR, e.getMessage());
  }
}
