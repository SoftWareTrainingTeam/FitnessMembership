package com.fitness.dao;

import com.fitness.entity.EquipType;
import com.fitness.entity.Equipment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author yao 2022/5/23
 */
@Mapper
public interface EquipTypeMapper {

    /**
     * 查询所有健身器材类型信息
     * @return
     */
    List<EquipType> selectAll(int offset,int limit);

    List<EquipType> selectAll();

    /**
     * 模糊查询
     * @param keyword
     * @return
     */
    List<EquipType> selectByKeyWord(@Param("keyword") String keyword);

    EquipType selectTypeById(int id);

    EquipType selectTypeByType(String type);

    int insertType(EquipType equipType);

    int updateType(EquipType equipType);

    int deleteType(int id);
}
