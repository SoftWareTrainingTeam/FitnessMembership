package com.fitness.service;

import com.fitness.dao.EquipmentMapper;
import com.fitness.entity.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yao 2022/5/17
 */
@Service
public class EquipService {

    @Autowired
    EquipmentMapper equipmentMapper;

    public List<Equipment> showEquips(){
        return equipmentMapper.selectAllEquip();
    }
}
