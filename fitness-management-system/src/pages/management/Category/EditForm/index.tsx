import React, { useEffect } from 'react'
import {
  Form,
  Input,
  message,
  Modal
} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ActionType } from '@ant-design/pro-table';
import { EquipCate } from '@/services/typings';
import { addEquipCate, updateEquipCate } from '@/services/category';
moment.locale('zh-cn');

type IProps = {
  type: 0 | 1,
  visible: boolean,
  defaultValues: EquipCate | null
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
  const [form] = Form.useForm()

  // 表单提交
  const handleSubmit = async (values: any) => {
    try {
      let res
      console.log(values);
      if (type) {
        res = await updateEquipCate({
          ...values,
          typeId: defaultValues?.typeId
        })
      } else {
        res = await addEquipCate({ ...values })
      }
      if (res.code === 200) {
        message.success(res.msg)
        setVisible(false)
        actionRef.current?.reload()
      } else {
        message.error(res.msg || '操作失败!请重试')
      }
    } catch (err) {
      message.error('操作失败!请重试')
    }
  }
  // 设置表单初始值
  useEffect(() => {
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
      title={type ? '修改分类信息' : '添加分类'}
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
        {/* 分类名称 */}
        <Form.Item
          name="type"
          label="分类名称"
          rules={[
            {
              required: true,
              message: '请输入分类名称!',
            },
          ]}
        >
          <Input type="text" placeholder="请输入分类名称" />
        </Form.Item>
        {/* 住址 */}
        <Form.Item
          name="producer"
          label="生产厂家"
          rules={[
            {
              required: true,
              message: '请输入生产厂家!'
            },
          ]}
        >
          <Input type="text" placeholder="请输入生产厂家" />
        </Form.Item>
        {/* 产品型号 */}

        <Form.Item
          name="productNumber"
          label="产品型号"
          rules={[{ required: true, message: '请输入产品型号!' }]}
        >
          <Input type="text" placeholder="请输入产品型号" />
        </Form.Item>
        {/* 价格 */}
        <Form.Item
          name="price"
          label="价格"
          rules={[
            {
              required: true,
              message: '请输入价格!'
            }
          ]}
        >
          <Input type="number" placeholder="请输入价格" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditForm