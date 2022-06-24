package com.fitness.service.impl;

import com.fitness.dao.CourseMapper;
import com.fitness.dao.CourseMemberMapper;
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

  private CourseMemberMapper courseMemberMapper;

  @Autowired
  public MemberServiceImpl(MemberMapper memberMapper, CourseMemberMapper courseMemberMapper) {
    this.memberMapper = memberMapper;
    this.courseMemberMapper = courseMemberMapper;
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
    if(courseMemberMapper.getMemberCourseNumber(id)>0) {
      return new Result(Result.PARAMETER_ERROR, "该会员有未完成课程，暂不能注销~");
    }
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

  @Override
  public Result getMembersById(String id) {
    Member member = memberMapper.getMemberById(id);
    return new Result<Member>(Result.OK, "请求成功~", member);
  }

  @Override
  public Result getMembersByKeyword(Integer startPage, Integer pageSize, String keyword) {
    if (startPage < 1) {
      throw new PageNumberException("起使页码无效~");
    }
    Page<Member> page = PageHelper.startPage(startPage, pageSize);
    List<Member> members = memberMapper.getMembersByVague(keyword);
    PageInfo<Member> pageInfo = new PageInfo<>(members);
    Result<PageInfo<Member>> result = new Result<>(Result.OK, "查询成功~", pageInfo);
    return result;
  }

}
