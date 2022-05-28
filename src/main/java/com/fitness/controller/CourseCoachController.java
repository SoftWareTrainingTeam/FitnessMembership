package com.fitness.controller;

import com.fitness.entity.CourseCoach;
import com.fitness.entity.Result;
import com.fitness.service.CourseCoachService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author yao 2022/5/27
 */
@RestController
public class CourseCoachController {

    @Autowired
    CourseCoachService courseCoachService;

    @GetMapping(path = "/api/courseCoach/{offset}/{limit}")
    public Result<PageInfo<CourseCoach>> getAllCourseCoach(@PathVariable("offset") int offset,@PathVariable("limit") int limit){
        return courseCoachService.getAllCourseCoach(offset, limit);
    }

    @GetMapping(path = "/api/courseCoach/{offset}/{limit}/{coachKey}")
    public Result<PageInfo<CourseCoach>> selectByCoach(@PathVariable("offset") int offset,@PathVariable("limit") int limit,@PathVariable("coachKey") String coachKey){
        return courseCoachService.selectByCoach(offset, limit, coachKey);
    }

    @GetMapping(path = "/api/courseCoach/{offset}/{limit}/{courseKey}")
    public Result<PageInfo<CourseCoach>> selectByCourse(@PathVariable("offset") int offset,@PathVariable("limit") int limit,@PathVariable("courseKey") String courseKey){
        return courseCoachService.selectByCourse(offset, limit, courseKey);
    }

    @PostMapping(path = "/api/courseCoach")
    public Result<?> insertCourseCoach(@RequestBody Map<String,Integer> map){
        return courseCoachService.insertCourseCoach(map.get("courseId"),map.get("coachId"));
    }

    @DeleteMapping(path = "/api/courseCoach")
    public Result<?> updateCourseCoach(@RequestBody Map<String,Integer> map){
        return courseCoachService.deleteCourseCoach(map.get("courseId"),map.get("coachId"));
    }
}
