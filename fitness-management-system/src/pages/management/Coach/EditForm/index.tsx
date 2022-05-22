import React, { useEffect } from 'react'
import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select
} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ActionType } from '@ant-design/pro-table';
import { Coach } from '@/services/typings';
import { addCoach, updateCoach } from '@/services/coach';
moment.locale('zh-cn');

type IProps = {
  type: 0 | 1,
  visible: boolean,
  defaultValues: Coach | null
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
      values.coachBirth = moment(values.coachBirth).format('X')
      // values.coachType = values.coachType * 1
      // values.coachLevel = values.coachLevel * 1
      let res
      if (type) {
        res = await updateCoach({
          ...values,
          coachId: defaultValues?.coachId,
          entryTime: Date.now()
        })
      } else {
        res = await addCoach({ ...values, entryTime: Date.now() })
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
      defaultValues.coachBirth = moment(defaultValues.coachBirth)
      form.setFieldsValue(defaultValues)
    } else {
      form.resetFields()
    }
  }, [defaultValues])
  return (
    <Modal
      getContainer={false}
      visible={visible}
      title={type ? '编辑教练信息' : '添加教练'}
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
        {/* 姓名 */}
        <Form.Item
          name="coachName"
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
          name="coachSex"
          label="性别"
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Select placeholder="请选择性别">
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
            <Select.Option value="其他">其他</Select.Option>
          </Select>
        </Form.Item>
        {/* 出生日期 */}
        <Form.Item
          name="coachBirth"
          label="出生日期"
          rules={[{ required: true, message: '请选择出生日期!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        {/* 联系电话 */}
        <Form.Item
          name="coachTel"
          label="联系电话"
          rules={[
            {
              required: true,
              message: '请输入联系电话!'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '电话号码格式不正确!'
            }
          ]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        {/* 教练类型 */}
        <Form.Item
          name="coachType"
          label="教练类型"
          rules={[{ required: true, message: '请选择类型!' }]}
        >
          <Select placeholder="请选择类型">
            <Select.Option value="1">巡场</Select.Option>
            <Select.Option value="2">团操</Select.Option>
            <Select.Option value="3">私人</Select.Option>
          </Select>
        </Form.Item>
        {/* 教练等级 */}
        <Form.Item
          name="coachLevel"
          label="教练等级"
          rules={[{ required: true, message: '请选择教练等级!' }]}
        >
          <Select placeholder="请选择教练等级">
            <Select.Option value="1">初级</Select.Option>
            <Select.Option value="2">中级</Select.Option>
            <Select.Option value="3">高级</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditForm