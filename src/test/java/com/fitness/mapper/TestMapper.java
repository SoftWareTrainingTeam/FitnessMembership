package com.fitness.mapper;


import com.fitness.entity.User;
import com.fitness.service.EquipService;
import com.fitness.service.UserService;
import com.fitness.util.Util;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

/**
 * @author yao 2022/5/17
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations ={"classpath:spring_config.xml"})
@Transactional
public class TestMapper {

    @Autowired
    EquipService equipService;

    @Autowired
    UserService userService;

    @Test
    public void test(){
        User user = new User();
        user.setUserId(1001);
        user.setUsername("test01");
        user.setPassword("123456");
        user.setType(1);
        userService.register(user);
    }

    public static void main(String[] args) {
        System.out.println(Util.signInOrNot(1));
    }

}
