import { useState } from 'react';

import Section from '../../UI/Section';
import TaskForm from '../TaskForm';

import { TtaskModel } from '@libs/models/task.model';

type TProps = {
  onAddTask: (task: TtaskModel) => void;
};

const NewTask = ({ onAddTask }: TProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-58a0c-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      onAddTask(createdTask);
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
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
