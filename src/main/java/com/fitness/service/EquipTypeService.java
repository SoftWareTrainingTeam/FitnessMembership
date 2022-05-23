package com.fitness.service;

import com.fitness.dao.EquipTypeMapper;
import com.fitness.entity.EquipType;
import com.fitness.entity.Equipment;
import com.fitness.entity.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static com.fitness.entity.Result.ERROR;
import static com.fitness.entity.Result.OK;

/**
 * @author yao 2022/5/23
 */
@Service
public class EquipTypeService {

    @Autowired
    EquipTypeMapper equipTypeMapper;

    @Transactional
    public Result<PageInfo<EquipType>> showEquipTypes(int offset,int limit){
        Result<PageInfo<EquipType>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<EquipType> list = equipTypeMapper.selectAll(offset, limit);
        PageInfo<EquipType> pageInfo = new PageInfo<>(list);
        result.setCode(OK);
        result.setMsg("器材类型列表查询成功");
        result.setData(pageInfo);
        return result;
    }

    @Transactional
    public Result<PageInfo<EquipType>> showEquipTypes(){
        Result<PageInfo<EquipType>> result = new Result<>();
        List<EquipType> list = equipTypeMapper.selectAll();
        PageInfo<EquipType> pageInfo = new PageInfo<>(list);
        result.setCode(OK);
        result.setMsg("器材类型列表查询成功");
        result.setData(pageInfo);
        return result;
    }

    @Transactional
    public Result<EquipType> selectTypeById(int id){
        Result<EquipType> result = new Result<>();
        EquipType equipType = equipTypeMapper.selectTypeById(id);
        result.setCode(OK);
        result.setMsg("器材类型列表查询成功");
        result.setData(equipType);
        return result;
    }

    @Transactional
    public Result<?> insertType(EquipType equipType){
        Result<EquipType> result = new Result<>();
        if (StringUtils.isBlank(equipType.getType())){
            result.setCode(ERROR);
            result.setMsg("器材类型不能为空");
            return result;
        }
        if (equipType.getPrice()<0){
            result.setCode(ERROR);
            result.setMsg("器材价格非法");
            return result;
        }
        if (StringUtils.isBlank(equipType.getProducer())){
            result.setCode(ERROR);
            result.setMsg("器材生产厂商不能为空");
            return result;
        }
        if (StringUtils.isBlank(equipType.getProductNumber())){
            result.setCode(ERROR);
            result.setMsg("器材型号不能为空");
            return result;
        }

        equipTypeMapper.insertType(equipType);

        result.setCode(OK);
        result.setMsg("新增器材信息成功");
        return result;
    }

    @Transactional
    public Result<?> updateType(EquipType equipType){
        Result<?> result = new Result<>();
        equipTypeMapper.updateType(equipType);
        result.setCode(OK);
        result.setMsg("成功修改器材种类信息");
        return result;
    }

    public Result<?> deleteType(int id){
        Result<?> result = new Result<>();
        equipTypeMapper.deleteType(id);
        result.setCode(OK);
        result.setMsg("删除器材种类信息成功");
        return result;
    }
}
