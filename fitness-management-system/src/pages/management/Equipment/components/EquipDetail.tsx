import { Equip } from "@/services/typings";
import dayjs from "@/utils/dayjs";
import { Button, Drawer } from "antd";
import React from "react";
import styles from './index.less'
const EquipDetail: React.FC<
  {
    equip: Equip | null,
    setEquip: React.Dispatch<React.SetStateAction<Equip | null>>
    // showDetail: boolean,
    // setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  }
> = ({
  equip,
  setEquip
  // showDetail,
  // setShowDetail
}) => {
    return (
      <Drawer
        placement="right"
        title={`器材详情-${equip?.label}`}
        visible={!!equip}
        destroyOnClose
        onClose={() => setEquip(null)}
        maskClosable={false}
        footer={<Button type="primary" onClick={() => setEquip(null)}>退出</Button>}
      >
        <ul className={styles.list}>
          <li>器材名称：{equip?.label}</li>
          <li>
            器材状态：
            {
              equip?.available === 0
                ? '不可用' 
                : equip?.available === 1
                ? '正常' : '维修中'
              
            }
          </li>
          <li>分类：{equip?.equipType?.type}</li>
          <li>器材型号：{equip?.equipType?.productNumber}</li>
          <li>生产厂家：{equip?.equipType?.producer}</li>
          <li>价格：{equip?.equipType?.price}</li>
          <li>购置日期：{dayjs(equip?.purchaseDate).format('YYYY-MM-DD')}</li>
        </ul>
      </Drawer>
    )
  }
export default EquipDetail