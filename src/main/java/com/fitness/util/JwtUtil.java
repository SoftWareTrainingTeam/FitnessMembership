package com.fitness.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Map;

/**
 * @author: chiatso
 * @create: 2022-05-19 13:38
 * @description: jwt工具类
 */
public class JwtUtil {

  // 签名
  private static String signature = "chiatso@163.com";

  /**
   * 生成token
   * @param map 传入payload
   * @return 返回token
   */
  public static String getToken(Map<String, String> map) {
    JWTCreator.Builder builder = JWT.create();
    map.forEach((k, v) -> {
      builder.withClaim(k, v);
    });
    Calendar instance = Calendar.getInstance();
    instance.add(Calendar.MINUTE, 30); //token 有效时间30分钟
    builder.withExpiresAt(instance.getTime());
    return builder.sign(Algorithm.HMAC256(signature));
  }

  /**
   * 验证并获取token中payload
   * @param token
   * @return
   */
  public static DecodedJWT verify(String token) {
    return JWT.require(Algorithm.HMAC256(signature)).build().verify(token);
  }
}
