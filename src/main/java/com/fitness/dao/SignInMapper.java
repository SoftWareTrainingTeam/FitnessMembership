package com.fitness.dao;

import com.fitness.entity.SignIn;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author yao 2022/6/1
 */
@Mapper
public interface SignInMapper {

    /**
     * 初始化一个用户的当余额记录
     * @param cardId 健身卡号
     * @param month 月份
     */
    void initNewMonth(String cardId,String month);

    /**
     * 检索一条记录
     * @param month
     * @param cardId
     * @return
     */
    SignIn selectOne(String cardId,String month);

    /**
     * 更新某一用户某月的签到信息
     * @param cardId
     * @param month
     */
    void updateMask(String cardId,String month,int mask);
}
