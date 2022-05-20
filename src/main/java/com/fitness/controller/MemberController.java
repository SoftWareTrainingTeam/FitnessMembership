package com.fitness.controller;

import com.fitness.entity.Member;
import com.fitness.entity.Result;
import com.fitness.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * @author: chiatso
 * @create: 2022-05-20 0:12
 * @description: 会员控制器
 */
@Controller
@ResponseBody
public class MemberController {

  private MemberService memberService;

  @Autowired
  public MemberController(MemberService memberService) {
    this.memberService = memberService;
  }

  //分页获取会员信息
  @GetMapping("/api/member")
  public Result getMembersByPage(Integer startPage, Integer pageSize) {
    return memberService.getMembersByPage(startPage, pageSize);
  }

  //注册新会员
  @PostMapping("/api/member")
  public Result registerMember(@Validated @RequestBody Member member) {
    return memberService.insertMember(member);
  }

  //修改会员信息
  @PutMapping("/api/member")
  public Result modifyMember(@Validated @RequestBody Member member) {
    return memberService.updateMember(member);
  }

  //注销会员
  @DeleteMapping("/api/member/{id}")
  public Result deleteMember(@PathVariable("id") String id) {
    return memberService.deleteMember(id);
  }
}
