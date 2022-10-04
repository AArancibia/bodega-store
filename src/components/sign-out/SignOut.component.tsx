import React, { useState } from 'react';
import './SignOut.component.scss';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { fetchRegisterStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { UserRegister } from '../../interfaces/user/User';

interface Props {
  fetchRegisterStart: (user: UserRegister) => void;
}

const SignOut = ({fetchRegisterStart}: Props) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values: UserRegister) => {
    fetchRegisterStart(values);
  };


  return (
    <div className="sign-up">
      <h2 className="title text-center">No tengo una cuenta</h2>
      <span className="text-center" style={{padding: '10px'}}>Registrate aquí</span>
      <Form
        {...layout}
        layout="horizontal"
        style={{
          float: 'left',
        }}
        form={form} onFinish={onFinish}
      >
        <Form.Item wrapperCol={{offset: 1}} label="Usuario" name="username">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}
                   label="Contraseña" name="password">
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          ></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}
                   label="Confirmar contraseña" name="password2">
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          ></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Registrate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchRegisterStart: (user: UserRegister) => dispatch(fetchRegisterStart(user)),
})

export default connect(null, mapDispatchToProps)(SignOut);
