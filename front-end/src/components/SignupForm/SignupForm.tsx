import React from 'react';
import styles from '../Login/LoginForm.module.less';
import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  CreateUser,
  CreateUserVariables,
} from '../../lib/graphql/types/CreateUser';
import { CREATE_USER } from '../../lib/graphql/query';
import { CreateUserInput } from '../../../types/globalTypes';

const SignupForm: React.FC = () => {
  const history = useHistory();
  const usernameEl = React.createRef<Input>();
  const passwordEl = React.createRef<Input>();
  const [signup] = useMutation<CreateUser, CreateUserVariables>(CREATE_USER, {
    onCompleted(login) {
      localStorage.setItem('token', login.createUser.token);
      history.push('/todo');
    },
  });

  const signupHandler = async (event: React.FormEvent) => {
    // prevent the default
    event.preventDefault();

    if (!usernameEl.current || !passwordEl.current) {
      return;
    }

    const username = usernameEl.current.input.value;
    const password = passwordEl.current.input.value;

    // sign up with the credentials
    const input: CreateUserInput = {
      username: username,
      password: password,
    };

    await signup({ variables: { createInput: input } });
  };

  return (
    <div data-testid="Signup">
      <Card className={styles.LoginContainer}>
        <Form
          name="normal_login"
          className={styles.LoginForm}
          onSubmitCapture={signupHandler}
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
              Sign up
            </Button>
            Or <a href="/login">already registered!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignupForm;
