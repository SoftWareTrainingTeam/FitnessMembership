import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  message,
  Modal,
  Select
} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ActionType } from '@ant-design/pro-table';
import { Equip, EquipCate } from '@/services/typings';
import { getAllEquipCateList } from '@/services/category';
import { addEquip, updateEquip } from '@/services/equip';
moment.locale('zh-cn');

type IProps = {
  type: 0 | 1,
  visible: boolean,
  defaultValues: Equip | null
  actionRef: React.MutableRefObject<ActionType | undefined>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EditForm: React.FC<IProps> = (
  {
    visible = false,
    setVisible,
    actionRef,
    defaultValues,
    type
  }
) => {
  const [cateList, setCateList] = useState<EquipCate[]>([])
  const [form] = Form.useForm()
  // 获取分类
  const getCateList = async () => {
    const { code, data } = await getAllEquipCateList()
    if (code === 200) {
      setCateList(data.list)
    }
  }
  // 表单提交
  const handleSubmit = async (values: any) => {
    try {
      let res
      if (type) {
        res = await updateEquip({
          ...values,
          purchaseDate: Date.now(),
          equipId: defaultValues?.equipId
        })
      } else {
        res = await addEquip({ 
          ...values, 
          purchaseDate: Date.now()
        })
      }
      if (res.code === 200) {
        message.success(res.msg)
        setVisible(false)
        actionRef.current?.reload()
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('操作失败!请重试')
    }
  }
  // 设置表单初始值
  useEffect(() => {
    getCateList()
    if (defaultValues) {
      form.setFieldsValue(defaultValues)
    } else {
      form.resetFields()
    }
  }, [defaultValues])
  return (
    <Modal
      getContainer={false}
      visible={visible}
      title={type ? '修改器材信息' : '添加器材'}
      maskClosable={false}
      onCancel={() => setVisible(false)}
      okText={type ? '确认修改' : '确认添加'}
      okButtonProps={{
        htmlType: 'submit',
        form: 'register'
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        {/* 名称*/}
        <Form.Item
          name="label"
          label="器材名称"
          rules={[
            {
              required: true,
              message: '请输入器材名称!',
            },
          ]}
        >
          <Input type="text" placeholder="请输入器材名称" />
        </Form.Item>
        {/* 状态 */}
        <Form.Item
          name="available"
          label="状态"
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <Select placeholder="请选择状态">
            <Select.Option value="0">不可用</Select.Option>
            <Select.Option value="1">正常</Select.Option>
            <Select.Option value="2">维护中</Select.Option>
          </Select>
        </Form.Item>
        {/* 住址 */}
        <Form.Item
          name="type"
          label="器材分类"
          rules={[
            {
              required: true,
              message: '请选择分类!'
            },
          ]}
        >
          <Select
            placeholder="选择器材分类"
          >
            {
              cateList.map(cate => {
                return (
                  <Select.Option
                    key={cate.typeId}
                    value={cate.typeId}
                  >
                    {`分类：${cate.type} · 厂家：${cate.producer} · 价格：${cate.price}`}
                  </Select.Option>
                )
              })
            }
            {/* <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option> */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditForm