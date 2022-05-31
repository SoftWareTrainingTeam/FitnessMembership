package com.fitness.dao;

import com.fitness.entity.MemberCard;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author yao 2022/6/1
 */
@Mapper
public interface MemberCardMapper {

    /**
     * 根据关键字查询健身卡
     * @param keyword 用户id/会员卡号
     * @return
     */
    MemberCard selectOne(String keyword);
}
