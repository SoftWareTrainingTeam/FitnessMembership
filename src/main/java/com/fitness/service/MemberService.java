package com.fitness.service;

import com.fitness.entity.Member;
import com.fitness.entity.Result;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-19 22:54
 * @description: 会员业务层接口
 */
public interface MemberService {

  /**
   * 分页查询会员数据
   * @param startPage 起使页码
   * @param pageSize 页码大小
   * @return 通用结果实体类
   */
  Result<PageInfo<Member>> getMembersByPage(Integer startPage, Integer pageSize);

  /**
   * 注销会员
   * @param id 会员id
   * @return 通用结果实体类
   */
  Result deleteMember(String id);

  /**
   * 修改会员信息
   * @param member 会员信息
   * @return 通用结果实体类
   */
  Result updateMember(Member member);

  /**
   * 注册会员
   * @param member 带注册信息
   * @return 通用结果实体类
   */
  Result insertMember(Member member);
}
