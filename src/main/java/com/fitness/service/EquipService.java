package com.fitness.service;

import com.fitness.dao.EquipmentMapper;
import com.fitness.entity.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author yao 2022/5/17
 */
@Service
public class EquipService {

    @Autowired
    EquipmentMapper equipmentMapper;

    /**
     * 老师在文档里说扫描包的问题，实测还是要加上@Transactional注解，sqlSession对象才能被Spring管理
     * @return
     */
    @Transactional
    public List<Equipment> showEquips(){
        return equipmentMapper.selectAllEquip();
    }
}
