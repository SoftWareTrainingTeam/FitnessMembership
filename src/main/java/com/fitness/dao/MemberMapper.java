package com.fitness.dao;

import com.fitness.entity.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-19 22:01
 * @description: 会员持久层接口
 */
@Mapper
public interface MemberMapper {

  /**
   * 获取所有会员信息
   * @return 会员集合
   */
  List<Member> getAllMembers();

  /**
   * 根据会员id获取会员信息
   * @param id 会员id
   * @return 会员信息
   */
  Member getMemberById(String id);

  /**
   * 模糊查询会员信息
   * @param info 关键字
   * @return 所匹配的会员结果
   */
  List<Member> getMembersByVague(String info);

  /**
   * 获取所有的会员数量
   * @return 会员数量
   */
  Integer getAllMemberNumber();

  /**
   * 新增会员
   * @param member 带插入的会员
   * @return 返回自动生成的主键以及会员信息
   */
  void insertMember(Member member);


  /**
   * 根据会员id修改会员信息
   * @param member 带修改的会员信息
   */
  void updateMember(Member member);

  /**
   * 根据会员id删除会员
   * @param id
   */
  void deleteMember(String id);

  /**
   * 批量注册会员
   * @param members 会员集合
   */
  void insertMembersByBatch(List<Member> members);

  /**
   * 通过电话号码查会员id
   * @param telNumber
   * @return
   */
  int selectIdByTel(String telNumber);
}
