package com.fitness.controller;

import com.fitness.entity.Equipment;
import com.fitness.entity.Result;
import com.fitness.service.EquipService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author yao 2022/5/17
 */
@Controller
public class EquipController {

    @Autowired
    EquipService equipService;

    @RequestMapping(value = "/api/showEquips", method = RequestMethod.GET)
    @ResponseBody
    public Result<PageInfo<Equipment>> showEquips(int offset, int limit) {
        return equipService.showEquips(offset, limit);
    }

    @RequestMapping(path = "/api/selectEquipById", method = RequestMethod.GET)
    @ResponseBody
    public Result<Equipment> selectEquipById(int id) {
        return equipService.selectEquipById(id);
    }

    @RequestMapping(path = "/api/insertEquip", method = RequestMethod.POST)
    @ResponseBody
    public Result<?> insertEquip(Equipment equipment) {
        return equipService.insertEquip(equipment);
    }

    @RequestMapping(path = "/api/updateEquip", method = RequestMethod.POST)
    @ResponseBody
    public Result<?> updateEquip(Equipment equipment) {
        return equipService.updateEquip(equipment);
    }

    @RequestMapping(path = "/api/deleteEquip", method = RequestMethod.POST)
    @ResponseBody
    public Result<?> deleteEquip(int id) {
        return equipService.deleteEquip(id);
    }
}
