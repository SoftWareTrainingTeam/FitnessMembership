package com.fitness.dao;

import com.fitness.entity.Equipment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author yao 2022/5/17
 */
@Mapper
public interface EquipmentMapper {
    /**
     * 检索所有的健身器材
     *
     * @return
     */
    List<Equipment> selectAllEquip();

    List<Equipment> selectAll();

    /**
     * 模糊查询
     * @param keyword
     * @return
     */
    List<Equipment> selectByKeyWord(@Param("keyword") String keyword);

    /**
     * 增加健身器材
     *
     * @param equipment 传入一个器材对象
     * @return
     */
    int insertEquip(Equipment equipment);

    /**
     * 我想了一下，并不是所有字段都可以改的
     * 比如：id、类型和购入时间
     * 或者说不同权限能改的应该是不一样的
     *
     * @param equipment
     * @return
     */
    int updateEquip(Equipment equipment);

    /**
     * 删除器材
     *
     * @param id
     * @return
     */
    int deleteEquip(int id);

    /**
     * 根据id查器材
     *
     * @param id
     * @return
     */
    Equipment selectEquipById(int id);

}
