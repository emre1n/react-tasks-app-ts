import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from 'hooks/useHttp';

import { TtaskModel } from '@libs/models/task.model';

function App() {
  const [tasks, setTasks] = useState<TtaskModel[]>([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj: { [key: string]: { text: string } }) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks({
      requestConfig: {
        url: 'https://react-http-58a0c-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      },
      applyData: transformTasks,
    });
  }, [fetchTasks]);

  const taskAddHandler = (task: TtaskModel) => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
