import React from 'react';
import styles from './AddTodo.module.less';

const AddTodo: React.FC = () => (
  <div className={styles.AddTodo} data-testid="AddTodo">
    AddTodo Component
  </div>
);

export default AddTodo;
