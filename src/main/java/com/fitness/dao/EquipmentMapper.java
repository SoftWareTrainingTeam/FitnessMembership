package com.fitness.dao;

import com.fitness.entity.Equipment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author yao 2022/5/17
 */
@Mapper
public interface EquipmentMapper {
    /**
     * 检索所有的健身器材
     * @return
     */
    List<Equipment> selectAllEquip();
}
