import React, { useState } from 'react'
import { Button, Input, List, message, Modal } from 'antd'
import { Vip } from '@/services/typings'
import { getVipList } from '@/services/vip'
import { addMemberToCourse } from '@/services/course'
import { ActionType } from '@ant-design/pro-table'
const AddModal: React.FC<{
  courseId: string
  visible: boolean,
  actionRef: React.MutableRefObject<ActionType | undefined>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  courseId,
  visible,
  actionRef,
  setVisible
}) => {
    const [vipList, setVipList] = useState<Vip[]>([])
    // 搜索会员
    async function searchVip(keyword: string) {
      if (!keyword || keyword.trim() === '') {
        setVipList([])
        return
      }
      const res = await getVipList({ startPage: 1, pageSize: 10, keyword })
      res.code === 200 && setVipList(res.data?.list || [])
    }
    // 添加
    async function handleAdd(memberId: string) {
      const res = await addMemberToCourse(courseId, memberId)
      if (res.code === 200) {
        message.success(res.msg)
        actionRef.current?.reload()
        setVisible(false)
      } else if (res.code === 400) {
        message.warn(res.msg)
      } else {
        message.error('添加失败!')
      }
    }
    return (
      <Modal
        title="添加学员"
        visible={visible}
        destroyOnClose
        maskClosable={false}
        onCancel={() =>{ 
          setVipList([])
          setVisible(false)
        }}
        footer={null}
      >
        <Input
          placeholder="搜索会员"
          size="large"
          onChange={e => {
            searchVip(e.target.value)
          }}
        />
        <List
          itemLayout="horizontal"
          locale={{ emptyText: '没有查询到该会员' }}
          dataSource={vipList}
          renderItem={item => {
            return <List.Item
              actions={[
              <Button type="link" onClick={() => handleAdd(item.memberId)}>添加</Button>
            ]}
            >
              <span>{item.name}</span>
              <span>{item.telNumber}</span>
            </List.Item>
          }}
        >
        </List>
      </Modal>
    )
  }

export default AddModal