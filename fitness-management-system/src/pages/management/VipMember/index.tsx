import React, { useMemo, useRef, useState } from 'react'
import { deleteVip, getVipList } from '@/services/vip'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Vip } from '@/services/typings'
import dayjs from '@/utils/dayjs'
import { PlusOutlined } from '@ant-design/icons'
import EditForm from '@/components/EditForm'
const VipMember: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<Vip | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<Vip>[] = useMemo(() => {
    return [
      {
        title: '会员账号',
        key: 'memberId',
        dataIndex: 'memberId'
      },
      {
        title: '会员姓名',
        key: 'name',
        dataIndex: 'name'
      }, {
        title: '性别',
        key: 'sex',
        search: false,
        dataIndex: 'sex',
      }, {
        title: '住址',
        key: 'address',
        dataIndex: 'address',
        search: false,
      }, {
        title: '联系电话',
        key: 'telNumber',
        dataIndex: 'telNumber',
        search: false
      }, {
        title: '注册时间',
        key: 'registTime',
        dataIndex: 'registTime',
        search: false,
        render: (_, vip: Vip) => {
          return dayjs(vip.registTime).format('YYYY-MM-DD HH:ss')
        }
      }, {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        search: false,
        render: (_, vip: Vip) => {
          return [
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                setVisible(true)
                setDefaultValues(vip)
              }}
            >
              编辑
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => {
                handleDelete(vip.memberId)
              }}
            >
              注销
            </Button>
          ]
        }
      }
    ]
  }, [actionRef])

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认注销吗',
      cancelText: '取消',
      okText: '确认',
      maskClosable: false,
      onCancel: () => { },
      onOk: async () => {
        try {
          const res = await deleteVip(id)
          if (res.code === 200) {
            message.success('注销成功!')
            actionRef.current?.reload()
            return
          }
          throw Error('注销失败!请重试')
        } catch (err) {
          message.error('注销失败!请重试')
          return
        }
      }
    })
  }
  return (
    <div>
      <ProTable<Vip>
        rowKey="memberId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>会员管理</h2>}
        actionRef={actionRef}
        columns={columns}
        request={async (param) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {
            code,
            data: { list, total }
          } = await getVipList(param.current, param.pageSize)
          return {
            data: list,
            total,
            success: code === 200
          }
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 6,
          showTotal: (total, range) => {
            return `总共${total}条`
          },
        }}
        search={{
          // filterType: "light",
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setType(0)
              setVisible(true)
            }}
          >
            注册会员
          </Button>,
        ]}
      />
      <EditForm
        type={type}
        visible={visible}
        actionRef={actionRef}
        setVisible={setVisible}
        defaultValues={defaultValues}
      />
    </div>
  )
}

export default VipMember