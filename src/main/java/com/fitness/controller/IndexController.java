package com.fitness.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author yao 2022/5/17
 */
@Controller
public class IndexController {
    @RequestMapping(value = "/")
    public String index(){
        // 返回视图名称，被视图解析器解析
        return "index";
    }
}
