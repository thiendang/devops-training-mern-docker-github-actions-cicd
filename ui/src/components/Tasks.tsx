import React from 'react';
import EditTaskModal from './EditTaskModal';

interface ITasks {
  tasks: any[];
  deleteTask: Function;
  taskEdited: Function;
}

const STATUS = {
  'To Be Done': 'primary',
  'In Progress': 'warning',
  Completed: 'success',
};

export const Tasks = ({ tasks, deleteTask, taskEdited }: ITasks) => {
  console.log('tasks length:::', tasks);
  if (tasks.length === 0) return null;

  const TaskRow = (task: any, index: number) => {
    return (
      <tr className="fw-normal">
        <th>
          <img
            src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-${
              index + 1
            }.webp`}
            className="shadow-1-strong rounded-circle"
            alt={`avatar ${index + 1}`}
            style={{ width: '55px', height: 'auto' }}
          />
          <span className="ms-2">{task.assignee}</span>
        </th>
        <td className="align-middle">
          <span>{task.task}</span>
        </td>
        <td className="align-middle">
          <h6 className="mb-0">
            <span
              className={`badge bg-${
                STATUS[task.status as keyof typeof STATUS]
              }`}
            >
              {task.status}
            </span>
          </h6>
        </td>
        <td className="align-middle">
          <div className="row">
            <div className="col-md-3">
              {task.status !== 'Completed' && (
                <EditTaskModal task={task} taskEdited={taskEdited} />
              )}
            </div>
            <div className="col-md-3">
              <button
                type="button"
                onClick={(e) => deleteTask(task._id)}
                className="btn btn-danger right"
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const taskTable = tasks.map((task, index) => TaskRow(task, index));

  return (
    <div
      className="card-body"
      data-mdb-perfect-scrollbar="true"
      style={{ position: 'relative', height: '400px' }}
    >
      <table className="table mb-0">
        <thead>
          <tr>
            <th scope="col">Team member</th>
            <th scope="col">Task</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{taskTable}</tbody>
      </table>
    </div>
  );
};
