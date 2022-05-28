package com.fitness.controller;

import com.fitness.entity.CourseMember;
import com.fitness.entity.Result;
import com.fitness.service.CourseMemberService;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.type.IntegerTypeHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Map;

/**
 * @author yao 2022/5/27
 */
@RestController
public class CourseMemberController {

    @Autowired
    CourseMemberService courseMemberService;

    @GetMapping(path = "/api/courseMember/{offset}/{limit}")
    public Result<PageInfo<CourseMember>> getAllCourseMember(@PathVariable("offset") int offset, @PathVariable("limit") int limit){
        return courseMemberService.getAllCourseMember(offset, limit);
    }

    @GetMapping(path = "/api/courseMember/{offset}/{limit}/{memberKey}")
    public Result<PageInfo<CourseMember>> selectByMember(@PathVariable("offset") int offset, @PathVariable("limit") int limit, @PathVariable("memberKey") String memberKey){
        return courseMemberService.selectByMember(offset, limit, memberKey);
    }

    @GetMapping(path = "/api/courseMember/{offset}/{limit}/{courseKey}")
    public Result<PageInfo<CourseMember>> selectByCourse(@PathVariable("offset") int offset,@PathVariable("limit") int limit,@PathVariable("courseKey") String courseKey){
        return courseMemberService.selectByCourse(offset, limit, courseKey);
    }

    @PostMapping(path = "/api/courseMember")
    public Result<?> insertCourseMember(@RequestBody Map<String, Integer> map){
        return courseMemberService.insertCourseMember(map.get("courseId"),map.get("memberId"));
    }

    @DeleteMapping(path = "/api/courseMember")
    public Result<?> updateCourseMember(@RequestBody Map<String, Integer> map){
        return courseMemberService.deleteCourseCoach(map.get("courseId"),map.get("memberId"));
    }
}
