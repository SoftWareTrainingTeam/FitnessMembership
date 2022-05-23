import React, { useMemo, useRef, useState } from 'react'
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table'
import { Button, Modal, message } from 'antd'
import type { EquipCate } from '@/services/typings'
import { PlusOutlined } from '@ant-design/icons'
import { deleteEquipCate, getEquipCateList } from '@/services/category'
import EditForm from './EditForm'
const Category: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<0 | 1>(0)   //0添加， 1修改
  const [defaultValues, setDefaultValues] = useState<EquipCate | null>(null)
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<EquipCate>[] = useMemo(() => {
    return [
      {
        title: '分类名称',
        key: 'type',
        dataIndex: 'type'
      },
      {
        title: '生产厂家',
        key: 'producer',
        dataIndex: 'producer'
      }, {
        title: '产品型号',
        key: 'productNumber',
        dataIndex: 'productNumber',
      }, {
        title: '产品价格￥',
        key: 'price',
        dataIndex: 'price',
      }, {
        title: '操作',
        key: 'memberId',
        width: '20%',
        align: 'center',
        render: (_, cate: EquipCate) => {
          return [
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setType(1)
                setDefaultValues({ ...cate})
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
                handleDelete(cate.typeId)
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
          const { code, msg = '删除失败!请重试' } = await deleteEquipCate(id)
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
      <ProTable<EquipCate>
        rowKey="typeId"
        cardBordered
        dateFormatter="string"
        headerTitle={<h2>分类管理</h2>}
        actionRef={actionRef}
        columns={columns}
        search={false}
        options={{
          search: {
            allowClear: true,
            style: { width: 300 },
            placeholder: '支持姓名，电话号码模糊查询',
            enterButton: <Button type="primary">查询</Button>
          },
          fullScreen: true
        }}
        request={async (param) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {
            code,
            data: {
              list,
              total
            } } = await getEquipCateList({
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
            添加分类
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
    </>
  )
}

export default Category