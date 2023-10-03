import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Tasks } from './Tasks';
import CreateTask from './CreateTask';
import { TaskService } from '../services/TaskService';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState<number>(0);
  const [isTaskEdited, setTaskEdited] = useState(false);

  const taskService = new TaskService();

  useEffect(() => {
    taskService.getAllTasks().then((tasks) => {
      console.log(tasks);
      setTasks(tasks);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfTasks, isTaskEdited]);

  function delTask(taskId: number) {
    taskService.deleteTask(taskId).then((response) => {
      console.log(response);
      setNumberOfTasks(numberOfTasks - 1);
    });
  }

  function taskCreated() {
    setNumberOfTasks(numberOfTasks + 1);
  }

  function taskEdited(res: any) {
    setTaskEdited(res);
  }

  return (
    <div className="App">
      <section className="gradient-custom" style={{ height: '100vh' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card rounded-3">
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: 'relative' }}
                >
                  <CreateTask taskCreated={taskCreated}></CreateTask>
                  <div className="mrgnbtm">
                    <Tasks
                      tasks={tasks}
                      deleteTask={delTask}
                      taskEdited={taskEdited}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
