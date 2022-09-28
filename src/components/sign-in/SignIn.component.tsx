import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './SignIn.component.scss';
import { fetchLoginStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

interface Props {
  fetchLoginStart: (auth: any) => void;
}

const SignIn = ({fetchLoginStart}: Props) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const onFinish = ({username, password}: any) => {
    fetchLoginStart({username, password});
    info();
  };

  const info = () => {
    message.info('This is a normal message');
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="sign-in">
      <h2 className="text-center">Ya tengo una cuenta</h2>
      <span className="text-center" style={{padding: '10px'}}>Inia sesión con tu usuario y contraseña</span>
      <Form
        {...layout}
        layout="horizontal"
        style={{
          float: 'left',
        }}
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
        form={form} onFinish={onFinish}
      >
        <Form.Item wrapperCol={{offset: 1}} label="Usuario" name="username">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}} label="Contraseña" name="password">
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          ></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Iniciar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchLoginStart: (auth: any) => dispatch(fetchLoginStart(auth)),
})

export default connect(null, mapDispatchToProps)(SignIn);
