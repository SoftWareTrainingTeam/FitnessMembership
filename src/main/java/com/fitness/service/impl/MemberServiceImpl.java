package com.fitness.service.impl;

import com.fitness.dao.MemberMapper;
import com.fitness.entity.Member;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.fitness.service.MemberService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author: chiatso
 * @create: 2022-05-19 22:55
 * @description: 会员业务实现类
 */
@Service
@Transactional
public class MemberServiceImpl implements MemberService {

  private MemberMapper memberMapper;

  @Autowired
  public MemberServiceImpl(MemberMapper memberMapper) {
    this.memberMapper = memberMapper;
  }

  @Override
  public Result<PageInfo<Member>> getMembersByPage(Integer startPage, Integer pageSize) {
    if (startPage < 1) {
      throw new PageNumberException("起使页码无效~");
    }
    Page<Member> page = PageHelper.startPage(startPage, pageSize);
    List<Member> members = memberMapper.getAllMembers();
    PageInfo<Member> pageInfo = new PageInfo<>(members);
    Result<PageInfo<Member>> result = new Result<>(Result.OK, "查询成功~", pageInfo);
    return result;
  }

  @Override
  public Result deleteMember(String id) {
    memberMapper.deleteMember(id);
    return new Result(Result.OK, "注销成功~");
  }

  @Override
  public Result updateMember(Member member) {
    memberMapper.updateMember(member);
    return new Result(Result.OK, "修改成功~");
  }

  @Override
  public Result insertMember(Member member) {
    memberMapper.insertMember(member);
    return new Result(Result.OK, "注册成功~");
  }
}
