package com.fitness.dao;

import com.fitness.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author yao 2022/5/18
 */
@Mapper
public interface UserMapper {

    /**
     * 通过id查用户
     * @param id
     * @return
     */
    User selectById(int id);

    /**
     * 通过用户名查用户
     * @param username
     * @return
     */
    User selectByName(String username);

    /**
     * 插入用户
     * 这里因为密码是被加密后存储到数据库的，所以还不能直接操作数据库插
     * @param user
     * @return
     */
    int insertUser(User user);
}
