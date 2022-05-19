package com.fitness.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: chiatso
 * @create: 2022-05-18 19:07
 * @description: 拦截器实现跨域
 */
public class CorsInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    String origin = request.getHeader("Origin");
    if(origin == null) {
      origin = request.getHeader("Referer");
    }
    //允许请求携带认证信息
    response.setHeader("Access-Control-Allow-Credentials", "true");
    //指定允许其他域名访问
    response.setHeader("Access-Control-Allow-Origin", origin);
    //允许请求的类型
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
    //允许的请求头字段
    response.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Token, Token");
    //设置预检请求的有效期
    response.addHeader("Access-Control-Max-Age", "3600");
    return true;
  }
}
