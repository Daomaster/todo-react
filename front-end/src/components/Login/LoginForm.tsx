import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LoginForm.module.less';
import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Login, LoginVariables } from '../../lib/graphql/types/Login';
import { LOGIN } from '../../lib/graphql/query';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const usernameEl = React.createRef<Input>();
  const passwordEl = React.createRef<Input>();
  const [login, { loading, error }] = useMutation<Login, LoginVariables>(
    LOGIN,
    {
      onCompleted({ login }) {
        localStorage.setItem('auth', JSON.stringify(login));
        history.push('/todo');
      },
    }
  );

  const loginHandler = async (event: React.FormEvent) => {
    // prevent the default
    event.preventDefault();

    if (!usernameEl.current || !passwordEl.current) {
      return;
    }

    const username = usernameEl.current.input.value;
    const password = passwordEl.current.input.value;

    await login({ variables: { username: username, password: password } });
  };

  return (
    <div data-testid="Login">
      <Card className={styles.LoginContainer}>
        <Form
          name="normal_login"
          className={styles.LoginForm}
          onSubmitCapture={loginHandler}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              ref={usernameEl}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              ref={passwordEl}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.LoginFormBtn}
            >
              Log in
            </Button>
            Or <a href="./">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
