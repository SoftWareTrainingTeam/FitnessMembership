package com.fitness.interceptor;

import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.entity.Result;
import com.fitness.util.JwtUtil;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: chiatso
 * @create: 2022-05-19 13:50
 * @description: 拦截器 验证有没有携带token
 */
public class TokenInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    //从请求头的Authorization拿到token
    String token = request.getHeader("Authorization");
    Result<String> result = new Result<>();
    try {
      //验证token
      JwtUtil.verify(token);
      return true;
    } catch (TokenExpiredException e) {
      result = new Result<>(Result.NOT_ALLOWED, "Token过期~");
    } catch (SignatureVerificationException e){
      result = new Result<>(Result.NOT_ALLOWED, "签名错误~");
    } catch (AlgorithmMismatchException e){
      result = new Result<>(Result.NOT_ALLOWED, "解密错误~");
    } catch (Exception e) {
      result = new Result<>(Result.NOT_ALLOWED, "token无效~");
    }
    String json = new ObjectMapper().writeValueAsString(result);
    response.setContentType("application/json;charset=UTF-8");
    response.getWriter().println(json);
    return false;
  }
}
