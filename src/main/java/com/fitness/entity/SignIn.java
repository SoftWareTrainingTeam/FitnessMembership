package com.fitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author yao 2022/6/1
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SignIn {

    private int id;

    MemberCard memberCard;

    private String dateMonth;

    private int mask;

    private int continueSignMonth;

}
