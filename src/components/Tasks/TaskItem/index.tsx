import styles from './styles.module.css';

type TProps = {
  children: string;
};

const TaskItem = ({ children }: TProps) => {
  return <li className={styles.task}>{children}</li>;
};

export default TaskItem;
