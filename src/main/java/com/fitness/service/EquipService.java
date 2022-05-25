package com.fitness.service;

import com.fitness.dao.EquipmentMapper;
import com.fitness.entity.Equipment;
import com.fitness.entity.Result;
import com.fitness.exception.PageNumberException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Timestamp;
import java.util.List;

import static com.fitness.entity.Result.OK;

/**
 * @author yao 2022/5/17
 */
@Service
public class EquipService {

    @Autowired
    EquipmentMapper equipmentMapper;

    /**
     * 老师在文档里说扫描包的问题，实测还是要加上@Transactional注解，sqlSession对象才能被Spring管理
     *
             * @return
             */
    @Transactional
    public Result<PageInfo<Equipment>> showEquips(int offset, int limit) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<Equipment>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<Equipment> equipmentList = equipmentMapper.selectAllEquip();
        PageInfo<Equipment> pageInfo = new PageInfo<>(equipmentList);
        result.setCode(OK);
        result.setMsg("器材列表查询成功");
        result.setData(pageInfo);
        return result;
    }

    @Transactional
    public Result<PageInfo<Equipment>> AllEquipsInfo(int offset, int limit) {
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<Equipment>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<Equipment> equipmentList = equipmentMapper.selectAll();
        PageInfo<Equipment> pageInfo = new PageInfo<>(equipmentList);
        result.setCode(OK);
        result.setMsg("器材列表(附器材信息)查询成功");
        result.setData(pageInfo);
        return result;
    }

    @Transactional
    public Result<PageInfo<Equipment>> selectByKeyWord(String keyword,int offset,int limit){
        if (offset < 1) {
            throw new PageNumberException("起使页码无效");
        }
        Result<PageInfo<Equipment>> result = new Result<>();
        PageHelper.startPage(offset, limit);
        List<Equipment> equipmentList = equipmentMapper.selectByKeyWord(keyword);
        PageInfo<Equipment> pageInfo = new PageInfo<>(equipmentList);
        result.setCode(OK);
        result.setMsg("模糊查询成功");
        result.setData(pageInfo);
        return result;
    }

    @Transactional
    public Result<Equipment> selectEquipById(int id) {
        Result<Equipment> result = new Result<>();
        Equipment equipment = equipmentMapper.selectEquipById(id);
        if (equipment == null) {
            result.setCode(Result.ERROR);
            result.setMsg("未查询到id为" + id + "的器材");
            return result;
        }
        result.setCode(OK);
        result.setMsg("查询器材成功");
        result.setData(equipment);
        return result;
    }

    @Transactional
    public Result<?> insertEquip(Equipment equipment) {
        Result<?> result = new Result<>();
        // 检查类型，这个类型应该从另外一张表里查询并判断是否合法
        // 这里留空
        if (equipment.getType() == -1) {
            result.setCode(Result.ERROR);
            result.setMsg("器材类型非法");
            return result;
        }
        if (StringUtils.isBlank(equipment.getLabel())) {
            result.setCode(Result.ERROR);
            result.setMsg("标签名不能为空");
            return result;
        }
        if (equipment.getPurchaseDate() == null) {
            // 给个默认时间，就是当前时间
            equipment.setPurchaseDate(new Timestamp(System.currentTimeMillis()));
        }
        if (equipment.getAvailable() != 0 && equipment.getAvailable() != 1 && equipment.getAvailable() != 2) {
            // 0不可用1可用2检修/维护
            result.setCode(Result.ERROR);
            result.setMsg("器材状态非法");
            return result;
        }
        equipmentMapper.insertEquip(equipment);
        result.setCode(OK);
        result.setMsg("新增器材成功");
        return result;
    }

    @Transactional
    public Result<?> updateEquip(Equipment equipment) {
        Result<?> result = new Result<>();
        equipmentMapper.updateEquip(equipment);
        result.setCode(OK);
        result.setMsg("成功修改器材信息");
        return result;
    }

    @Transactional
    public Result<?> deleteEquip(int id) {
        Result<?> result = new Result<>();
        equipmentMapper.deleteEquip(id);
        result.setCode(OK);
        result.setMsg("删除器材成功");
        return result;
    }
}
