import Section from '../../UI/Section';
import TaskForm from '../TaskForm';
import useHttp from 'hooks/useHttp';

import { TtaskModel } from '@libs/models/task.model';

type TProps = {
  onAddTask: (task: TtaskModel) => void;
};

const NewTask = ({ onAddTask }: TProps) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText: string, taskData: any) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText: string) => {
    sendTaskRequest({
      requestConfig: {
        url: 'https://react-http-58a0c-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      applyData: createTask.bind(null, taskText),
    });
  };

  return (
    <Section>
      <>
        <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
        {error && <p>{error}</p>}
      </>
    </Section>
  );
};

export default NewTask;
