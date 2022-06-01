package com.fitness.dao;

import com.fitness.entity.MemberCard;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author yao 2022/6/1
 */
@Mapper
public interface MemberCardMapper {

    MemberCard selectByMemberId(String memberId);

    MemberCard selectByCardId(String cardIl);



    /**
     * 更新会员健身卡
     * @param memberCard
     */
    void updateMemberCard(MemberCard memberCard);
}
