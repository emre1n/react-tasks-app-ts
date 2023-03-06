import Section from '../../UI/Section';
import TaskItem from '../TaskItem';
import styles from './styles.module.css';

import { TtaskModel } from '@libs/models/task.model';

type TProps = {
  items: TtaskModel[];
  error: any;
  onFetch: () => Promise<void>;
  loading: boolean;
};

const Tasks = ({ items, error, onFetch, loading }: TProps) => {
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (items.length > 0) {
    taskList = (
      <ul>
        {items.map((task: TtaskModel) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (error) {
    content = <button onClick={onFetch}>Try again</button>;
  }

  if (loading) {
    content = <p>Loading tasks...</p>;
  }

  return (
    <Section>
      <div className={styles.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
