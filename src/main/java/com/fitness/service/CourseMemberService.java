package com.fitness.service;

import com.fitness.dao.CourseMemberMapper;
import com.fitness.entity.CourseCoach;
import com.fitness.entity.CourseMember;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import static com.fitness.entity.Result.BAD_REQUEST;
import static com.fitness.entity.Result.OK;

/**
 * @author yao 2022/5/27
 */
@Service
public class CourseMemberService {

    @Autowired
    CourseMemberMapper courseMemberMapper;

    @Transactional
    public Result<PageInfo<CourseMember>> getAllCourseMember(int offset, int limit){
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<CourseMember>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<CourseMember> courseMemberList = courseMemberMapper.getAllCourseMember();
        PageInfo<CourseMember> pageInfo = new PageInfo<>(courseMemberList);
        result.setCode(OK);
        result.setMsg("课程-学员关系 查询成功");
        result.setData(pageInfo);
        return result;
    }

    @Transactional
    public Result<PageInfo<CourseMember>> selectByMember(int offset, int limit, String memberKey) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<CourseMember>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<CourseMember> courseMemberList = courseMemberMapper.selectByMember(memberKey);
        PageInfo<CourseMember> pageInfo = new PageInfo<>(courseMemberList);
        result.setCode(OK);
        result.setMsg("根据会员 模糊查询成功");
        result.setData(pageInfo);
        return result;

    }

    @Transactional
    public Result<PageInfo<CourseMember>> selectByCourse(int offset, int limit,String courseKey) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<CourseMember>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<CourseMember> courseMemberList = courseMemberMapper.selectByCourse(courseKey);
        PageInfo<CourseMember> pageInfo = new PageInfo<>(courseMemberList);
        result.setCode(OK);
        result.setMsg("根据课程 模糊查询成功");
        result.setData(pageInfo);
        return result;

    }

    @Transactional
    public Result<?> insertCourseMember(int courseId, int memberId) {
        Result<?> result = new Result<>();
        // 查一下表里面是不是已经有记录了，有的话返回错误信息
        CourseMember courseMember= courseMemberMapper.selectOne(courseId, memberId);
        if (courseMember==null){
            courseMemberMapper.insertCourseMember(courseId, memberId);
            result.setCode(OK);
            result.setMsg("添加 课程-会员关系 成功");
        }else{
            result.setCode(BAD_REQUEST);
            result.setMsg("该 学员 已加入 该 课程");
        }
        return result;
    }

    @Transactional
    public Result<?> deleteCourseCoach(int courseId, int coachId){
        Result<?> result = new Result<>();
        courseMemberMapper.deleteCourseMember(courseId, coachId);
        result.setCode(OK);
        result.setMsg("删除 课程-会员关系 成功");
        return result;
    }
}
