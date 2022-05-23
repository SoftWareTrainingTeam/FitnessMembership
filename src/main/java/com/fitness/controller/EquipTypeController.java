package com.fitness.controller;

import com.fitness.entity.EquipType;
import com.fitness.entity.Result;
import com.fitness.service.EquipTypeService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author yao 2022/5/23
 */
@RestController
public class EquipTypeController {

    @Autowired
    EquipTypeService equipTypeService;

    @GetMapping(path = "/api/selectAllEquipTypes")
    public Result<PageInfo<EquipType>> showEquipTypes(int offset, int limit) {
        return equipTypeService.showEquipTypes(offset,limit);
    }

    /**
     * 这里相当于重载一次方法，如果是获取列表的话是不需要分页的
     * @return
     */
    @GetMapping(path = "/api/selectAllEquipTypes2")
    public Result<PageInfo<EquipType>> showEquipTypes() {
        return equipTypeService.showEquipTypes();
    }

    @GetMapping(path = "/api/type/{id}")
    public Result<EquipType> selectTypeById(@PathVariable("id") int id){
        return equipTypeService.selectTypeById(id);
    }

    @PostMapping(path = "/api/type")
    public Result<?> insertType(@RequestBody EquipType equipType){
        return equipTypeService.insertType(equipType);
    }

    @PutMapping(path = "/api/type")
    public Result<?> updateType(@RequestBody EquipType equipType){
        return equipTypeService.updateType(equipType);
    }

    @DeleteMapping(path = "api/type/{id}")
    public Result<?> deleteType(@PathVariable("id") int id){
        return equipTypeService.deleteType(id);
    }
}
