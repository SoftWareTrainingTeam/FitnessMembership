package com.fitness.controller;

import com.fitness.entity.Equipment;
import com.fitness.service.EquipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author yao 2022/5/17
 */
@Controller
public class EquipController {

    @Autowired
    EquipService equipService;

    @RequestMapping("/test")
    @ResponseBody
    public List<Equipment> showEquips(){
        return equipService.showEquips();
    }
}
