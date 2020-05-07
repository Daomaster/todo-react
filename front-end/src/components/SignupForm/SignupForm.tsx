import React from 'react';
import styles from '../LoginForm/LoginForm.module.less';
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
  const [form] = Form.useForm();
  const history = useHistory();
  const [signup, { loading, error }] = useMutation<
    CreateUser,
    CreateUserVariables
  >(CREATE_USER, {
    onCompleted(login) {
      localStorage.setItem('token', login.createUser.token);
      history.push('/todo');
    },
  });

  const signupHandler = async () => {
    const username = form.getFieldValue('username');
    const password = form.getFieldValue('password');

    // sign up with the credentials
    const input: CreateUserInput = {
      username: username,
      password: password,
    };

    try {
      await signup({ variables: { createInput: input } });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div data-testid="SignupForm">
      <Card className={styles.LoginContainer}>
        <Form
          name="signup"
          form={form}
          className={styles.LoginForm}
          onFinish={signupHandler}
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
