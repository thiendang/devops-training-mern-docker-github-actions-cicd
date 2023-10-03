import React from 'react';
import { useForm } from 'react-hook-form';
import { TaskService } from '../services/TaskService';

export default function CreateTask(props: any) {
  const { register, handleSubmit } = useForm();

  const taskService = new TaskService();

  const onSubmit = (data: any, e: any) => {
    taskService.createTask(data).then((response) => {
      props.taskCreated();
      e.target.reset();
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <div className="col-md-12 mrgnbtm">
            <h2 className="text-center">To Do App</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group mrgnbtm col-md-12">
                  <label htmlFor="exampleInputEmail1">Task</label>
                  <input
                    {...register('task')}
                    placeholder="Create a Task"
                    className="form-control"
                    name="task"
                    id="task"
                  />
                </div>
                <div className="form-group mrgnbtm col-md-12">
                  <label htmlFor="exampleInputPassword1">Assignee</label>
                  <input
                    {...register('assignee')}
                    placeholder="Assignee"
                    className="form-control"
                    name="assignee"
                    id="assignee"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group mrgnbtm col-md-12">
                  <label htmlFor="exampleInputEmail1">Status</label>
                  <select className="form-control" {...register('status')}>
                    <option>To Be Done</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="form-group mrgnbtm col-md-12">
                  <input
                    type="submit"
                    className="btn form-control btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
