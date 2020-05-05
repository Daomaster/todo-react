import React from 'react';
import styles from './Login.module.less';
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
    return <div data-testid="Login">
        <Card className={styles.LoginContainer}>
            <Form
                name="normal_login"
                className={styles.LoginForm}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.LoginFormBtn}>
                        Log in
                    </Button>
                    Or <a href="./">register now!</a>
                </Form.Item>
            </Form>
        </Card>
    </div>
};

export default Login;
