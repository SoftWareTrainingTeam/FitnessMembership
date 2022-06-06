package com.fitness.controller;

import com.fitness.entity.Result;
import com.fitness.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author yao 2022/5/29
 */
@RestController
public class SignInController {

    @Autowired
    SignInService signInService;

    /**
     * 用户签到
     * @return
     */
    @PostMapping(path = "/api/signIn/{identityCode}")
    public Result<?> signIn(@PathVariable("identityCode") String identityCode){
        return signInService.signIn(identityCode);
    }

    /**
     * 获取用户的签到日历
     * @param identityCode
     * @return
     */
    @PostMapping(path = "/api/calender/{identityCode}/{yearMonth}")
    public Result<?> getCalender(@PathVariable("identityCode") String identityCode ,@PathVariable("yearMonth") String yearMonth){
        return signInService.getCalender(identityCode,yearMonth);
    }
}
