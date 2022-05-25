package com.fitness.controller;

import com.fitness.entity.Equipment;
import com.fitness.entity.Result;
import com.fitness.service.EquipService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author yao 2022/5/17
 */
@RestController
public class EquipController {

    @Autowired
    EquipService equipService;

    /**
     * 单查一张表
     * @param offset
     * @param limit
     * @return
     */
    @RequestMapping(value = "/api/showEquips", method = RequestMethod.GET)
    public Result<PageInfo<Equipment>> showEquips(int offset, int limit) {
        return equipService.showEquips(offset, limit);
    }

    /**
     * 多表查询-两张
     * @param offset
     * @param limit
     * @return
     */
    @RequestMapping(value = "/api/AllEquipsInfo", method = RequestMethod.GET)
    public Result<PageInfo<Equipment>> AllEquipsInfo(int offset,int limit) {
        return equipService.AllEquipsInfo(offset,limit);
    }

    @GetMapping(path = "/api/selectEquip/{keyword}/{offset}/{limit}")
    public Result<PageInfo<Equipment>> selectByKeyWord(@PathVariable("keyword") String keyword,@PathVariable("offset") int offset,@PathVariable("limit") int limit){
        return equipService.selectByKeyWord(keyword, offset, limit);
    }

    /**
     * 通过id选择器材
     * @param id
     * @return
     */
    @RequestMapping(path = "/api/selectEquipById", method = RequestMethod.GET)
    public Result<Equipment> selectEquipById(int id) {
        return equipService.selectEquipById(id);
    }

    @RequestMapping(path = "/api/insertEquip", method = RequestMethod.POST)
    public Result<?> insertEquip(@RequestBody Equipment equipment) {
        return equipService.insertEquip(equipment);
    }

    @RequestMapping(path = "/api/updateEquip", method = RequestMethod.PUT)
    public Result<?> updateEquip(@RequestBody Equipment equipment) {
        return equipService.updateEquip(equipment);
    }

    @RequestMapping(path = "/api/deleteEquip", method = RequestMethod.DELETE)
    public Result<?> deleteEquip(int id) {
        return equipService.deleteEquip(id);
    }
}
