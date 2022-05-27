package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author yao 2022/5/27
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CourseCoach {
    /**
     * 教练引用
     */
    private Coach coach;

    /**
     * 课程引用
     */
    private CourseInfo courseInfo;
}
