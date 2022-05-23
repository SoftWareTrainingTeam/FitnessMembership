import React, { useEffect } from 'react'
import {
  // Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select
} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import cityList from '@/constant/cityList';
import { addVip, updateVip } from '@/services/vip';
import { ActionType } from '@ant-design/pro-table';
import { Vip } from '@/services/typings';
moment.locale('zh-cn');

type IProps = {
  type: 0 | 1,
  visible: boolean,
  defaultValues: Vip | null
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
      values.birthday = moment(values.birthday).valueOf()
      values.address = (values.address as string[]).join('-')
      let res
      if (type) {
        res = await updateVip({
          ...values,
          registTime: Date.now(),
          memberId: defaultValues?.memberId
        })
      } else {
        res = await addVip({ ...values, registTime: Date.now() })
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
    if (defaultValues) {
      defaultValues.birthday = moment(defaultValues.birthday)
      defaultValues.address = (defaultValues.address as string).split('-')
      form.setFieldsValue(defaultValues)
    } else {
      form.resetFields()
    }
  }, [defaultValues])
  return (
    <Modal
      getContainer={false}
      visible={visible}
      title={type ? '编辑会员信息' : '注册会员'}
      maskClosable={false}
      onCancel={() => setVisible(false)}
      okText={type ? '确认修改' : '确认注册'}
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
        {/* 姓名 */}
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入真实姓名!',
            },
          ]}
        >
          <Input type="text" placeholder="请输入真实姓名" />
        </Form.Item>
        {/* 性别 */}
        <Form.Item
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请选择您的性别!' }]}
        >
          <Select placeholder="请选择性别">
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
            <Select.Option value="其他">其他</Select.Option>
          </Select>
        </Form.Item>
        {/* 住址 */}
        <Form.Item
          name="address"
          label="住址"
          rules={[
            {
              required: true,
              message: '请输入住址!'
            },
          ]}
        >
          <Cascader options={cityList} placeholder="请输入住址" />
        </Form.Item>
        {/* 出生日期 */}

        <Form.Item
          name="birthday"
          label="出生日期"
          rules={[{ required: true, message: '请选择出生日期!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        {/* 联系电话 */}
        <Form.Item
          name="telNumber"
          label="联系电话"
          rules={[
            {
              required: true,
              message: '请输入您的联系电话!'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '电话号码格式不正确!'
            }
          ]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        {/* <Form.Item
          wrapperCol={{ offset: 4 }}
        >
          <Button type="primary" htmlType="submit">
            {type ? '确认修改' : '确认注册'}
          </Button>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}

export default EditForm