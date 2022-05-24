import React, { useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { Equip } from '@/services/typings'
import { PlusOutlined } from '@ant-design/icons'
import { deleteEquip, getEquipList } from '@/services/equip'
import dayjs from '@/utils/dayjs'
import EquipDetail from './components/equipDetail'
import EditForm from './components/EditForm'
const Equipment: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [equip, setEquip] = useState<Equip | null>(null)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<Equip | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<Equip>[] = useMemo(() => {
    return [
      {
        title: '器材编号',
        key: 'equipId',
        dataIndex: 'equipId',
      },
      {
        title: '器材名称',
        key: 'label',
        dataIndex: 'label'
      },
      {
        title: '状态',
        key: 'available',
        dataIndex: 'available',
        valueType: 'select',
        valueEnum: {
          0: { text: <span style={{ color: '#ff4d4f' }}>不可用</span>, status: 'Error' },
          1: { text: <span style={{ color: '#52c41a' }}>正常</span>, status: 'Success' },
          2: { text: <span style={{ color: '#1890ff' }}>维护中</span>, status: 'Processing' },
        }
      }, {
        title: '购买日期',
        key: 'purchaseDate',
        dataIndex: 'purchaseDate',
        render: (_, equip: Equip) => {
          return dayjs(equip.purchaseDate).format('YYYY-MM-DD HH:ss')
        }
      }, {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        render: (_, equip: Equip) => {
          return [
            <Button
              key="look"
              type="link"
              onClick={() => {
                setEquip(equip)
                // setShowDetail(true)
              }}
            >
              详情
            </Button>,
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                setDefaultValues({ ...equip })
                setVisible(true)
              }}
            >
              编辑
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => {
                handleDelete(equip.equipId)
              }}
            >
              删除
            </Button>
          ]
        }
      }
    ]
  }, [actionRef])

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除吗',
      cancelText: '取消',
      okText: '确认',
      maskClosable: false,
      onCancel: () => { },
      onOk: async () => {
        try {
          const { code, msg = '删除失败!请重试' } = await deleteEquip(id)
          if (code === 200) {
            message.success(msg)
            actionRef.current?.reload()
            return
          }
          message.warn(msg)
        } catch (err) {
          message.error('删除失败!请重试')
          return
        }
      }
    })
  }
  return (
    <>
      <ProTable<Equip>
        rowKey="equipId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>器材管理</h2>}
        actionRef={actionRef}
        columns={columns}
        search={false}
        options={{
          // search: {
          //   allowClear: true,
          //   style: { width: 300 },
          //   placeholder: '按器材编号查询',
          //   enterButton: <Button type="primary">查询</Button>
          // },
          fullScreen: true
        }}
        request={async (param) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {
            code,
            data: {
              list,
              total
            } } = await getEquipList({
              offset: param.current!,
              limit: param.pageSize!
            })
          return {
            data: list,
            total: total,
            success: code === 200
          }
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          // pageSize: 10,
          showTotal: (total, range) => {
            return `总共${total}条`
          },
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setType(0)
              setDefaultValues(null)
              setVisible(true)
            }}
          >
            添加器材
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
      <EquipDetail
        equip={equip}
        setEquip={setEquip}
      />
    </>
  )
}

export default Equipment