import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './SignIn.component.scss';
import { fetchLoginSuccess } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { User } from '../../interfaces/user/User';
import { login } from '../../data/rest/auth/auth.service';
import { userInformation } from '../../data/rest/user.service';

interface Props {
  fetchLoginSuccess: (auth: any) => void;
}

const SignIn = ({fetchLoginSuccess}: Props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const onFinish = async ({username, password}: any) => {
    try {
      await login(username, password);
      const user: User = await userInformation(username);
      fetchLoginSuccess(user);
      message.info(`Bienvenido a Bodega Store`);
      navigate('/carrito', {replace: true});
    } catch (e) {
      message.error(`Credenciales inválidas`);
    }
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchLoginSuccess: (auth: any) => dispatch(fetchLoginSuccess(auth)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
