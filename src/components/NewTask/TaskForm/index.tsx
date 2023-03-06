import { useRef } from 'react';

import styles from './styles.module.css';

type TProps = {
  onEnterTask: (taskText: string) => Promise<void>;
  loading: boolean;
};

const TaskForm = ({ onEnterTask, loading }: TProps) => {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current?.value || '';

    if (enteredValue.trim().length > 0) {
      onEnterTask(enteredValue);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
