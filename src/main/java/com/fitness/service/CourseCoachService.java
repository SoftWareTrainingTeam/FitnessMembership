package com.fitness.service;

import com.fitness.dao.CourseCoachMapper;
import com.fitness.entity.CourseCoach;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.fitness.entity.Result.OK;

/**
 * @author yao 2022/5/27
 */
@Service
public class CourseCoachService {

    @Autowired
    CourseCoachMapper courseCoachMapper;

    @Transactional
    public Result<PageInfo<CourseCoach>> getAllCourseCoach(int offset, int limit) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<CourseCoach>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<CourseCoach> courseCoachList = courseCoachMapper.getAllCourseCoach();
        PageInfo<CourseCoach> pageInfo = new PageInfo<>(courseCoachList);
        result.setCode(OK);
        result.setMsg("课程-教练关系 查询成功");
        result.setData(pageInfo);
        return result;

    }

    @Transactional
    public Result<PageInfo<CourseCoach>> selectByCoach(int offset, int limit,String coachKey) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<CourseCoach>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<CourseCoach> courseCoachList = courseCoachMapper.selectByCoach(coachKey);
        PageInfo<CourseCoach> pageInfo = new PageInfo<>(courseCoachList);
        result.setCode(OK);
        result.setMsg("根据教练 模糊查询成功");
        result.setData(pageInfo);
        return result;

    }

    @Transactional
    public Result<PageInfo<CourseCoach>> selectByCourse(int offset, int limit,String courseKey) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<CourseCoach>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<CourseCoach> courseCoachList = courseCoachMapper.selectByCourse(courseKey);
        PageInfo<CourseCoach> pageInfo = new PageInfo<>(courseCoachList);
        result.setCode(OK);
        result.setMsg("根据课程 模糊查询成功");
        result.setData(pageInfo);
        return result;

    }

    @Transactional
    public Result<?> insertCourseCoach(int courseId, int coachId) {
        Result<?> result = new Result<>();
        courseCoachMapper.insertCourseCoach(courseId, coachId);
        result.setCode(OK);
        result.setMsg("添加 课程-教练关系 成功");
        return result;
    }

    @Transactional
    public Result<?> deleteCourseCoach(int courseId, int coachId){
        Result<?> result = new Result<>();
        courseCoachMapper.deleteCourseCoach(courseId, coachId);
        result.setCode(OK);
        result.setMsg("删除 课程-教练关系 成功");
        return result;
    }
}
