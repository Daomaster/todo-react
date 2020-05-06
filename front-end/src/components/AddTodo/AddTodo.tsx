import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

interface AddTodoProps {
  onAddTodo: (description: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [form] = Form.useForm();

  const finishHandler = () => {
    onAddTodo(form.getFieldValue('description'));

    form.resetFields();
  };

  return (
    <Form form={form} onFinish={finishHandler} layout="horizontal">
      <Row gutter={20}>
        <Col xs={22} sm={22} md={15} lg={17} xl={20}>
          <Form.Item
            name={'description'}
            rules={[
              { required: true, message: 'You need to have a actual todo :)' },
            ]}
          >
            <Input placeholder="What do you want to do next?" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTodo;
