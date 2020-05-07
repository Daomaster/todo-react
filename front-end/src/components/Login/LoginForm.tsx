import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import styles from './LoginForm.module.less';
import { Login, LoginVariables } from '../../lib/graphql/types/Login';
import { LOGIN } from '../../lib/graphql/query';

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [login, { loading, error }] = useMutation<Login, LoginVariables>(
    LOGIN,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login.token);
        history.push('/todo');
      },
    }
  );

  const loginHandler = async () => {
    const username = form.getFieldValue('username');
    const password = form.getFieldValue('password');

    try {
      await login({ variables: { username, password } });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div data-testid="Login">
      <Card className={styles.LoginContainer}>
        <Form
          name="login"
          form={form}
          className={styles.LoginForm}
          onFinish={loginHandler}
        >
          <Form.Item
            name="username"
            validateStatus={error ? 'error' : ''}
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateStatus={error ? 'error' : ''}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading ? loading : false}
              type="primary"
              htmlType="submit"
              className={styles.LoginFormBtn}
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
