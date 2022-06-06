package com.fitness.service;

import com.fitness.dao.UserMapper;
import com.fitness.entity.Result;
import com.fitness.entity.User;
import com.fitness.util.Constant;
import com.fitness.util.JwtUtil;
import com.fitness.util.Util;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import static com.fitness.entity.Result.ERROR;
import static com.fitness.entity.Result.OK;

/**
 * @author yao 2022/5/18
 */
@Service
public class UserService implements Constant {

    @Autowired
    UserMapper userMapper;

    public Map<String, Object> register(User user) {
        Map<String, Object> map = new HashMap<>();

        // 空值处理
        if (user == null) {
            throw new IllegalArgumentException("参数不能为空!");
        }
        if (StringUtils.isBlank(user.getUsername())) {
            map.put("usernameMsg", "用户名不能为空!");
            return map;
        }
        if (StringUtils.isBlank(user.getPassword())) {
            map.put("passwordMsg", "密码不能为空!");
            return map;
        }
        if (user.getType() != MANAGER_TYPE && user.getType() != SUPER_MANAGER_TYPE) {
            map.put("emailMsg", "用户类型为空或不正确！");
            return map;
        }

        // 验证账号是否存在
        User checkUser = userMapper.selectByName(user.getUsername());
        if (checkUser != null) {
            map.put("usernameMsg", "该账号已存在!");
            return map;
        }

        // 注册用户
        // 这里多加上一个字段（签名）是为了防止MD5被字典反向破解
        user.setPassword(Util.getMd5(user.getPassword() + PASSWORD_APPEND));
        userMapper.insertUser(user);

        return map;
    }

    public Result<String> login(String username, String password) {
        Result<String> result = new Result<>();
        if (StringUtils.isBlank(username)) {
            result.setCode(ERROR);
            result.setMsg("用户名不能为空");
            return result;
        }
        if (StringUtils.isBlank(password)) {
            result.setCode(ERROR);
            result.setMsg("密码不能为空");
            return result;
        }
        User user = userMapper.selectByName(username);
        if (user == null) {
            result.setCode(ERROR);
            result.setMsg("用户名不存在");
            return result;
        }

        // 验证密码
        password = Util.getMd5(password + PASSWORD_APPEND);
        if (!user.getPassword().equals(password)) {
            result.setCode(ERROR);
            result.setMsg("密码不正确");
            return result;
        }

        // 生成Token
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("username", user.getUsername());
        // type原本是int，这里转String
        tokenMap.put("type", user.getType() + "");
        String token = JwtUtil.getToken(tokenMap);

        result.setCode(OK);
        result.setMsg("登录成功");
        result.setData(token);

        return result;
    }
}
