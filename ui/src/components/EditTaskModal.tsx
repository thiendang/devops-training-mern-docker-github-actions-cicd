import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { TaskService } from '../services/TaskService';

interface IEditTaskModal {
  task: any;
  taskEdited: Function;
}

export default function EditTaskModal({ task, taskEdited }: IEditTaskModal) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const taskService = new TaskService();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    taskService.editTask(data).then((response) => {
      taskEdited(response);
      setShow(false);
    });
  };

  return (
    <>
      <button className="btn btn-warning text-white" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group mrgnbtm col-md-3 d-none">
                <label htmlFor="taskId">Id</label>
                <input
                  {...register('id')}
                  type="text"
                  className="form-control"
                  defaultValue={task.id}
                  name="id"
                  id="id"
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group mrgnbtm col-md-12">
                <label htmlFor="task">Task</label>
                <input
                  {...register('task')}
                  type="text"
                  className="form-control"
                  defaultValue={task.task}
                  name="task"
                  id="task"
                  placeholder="Create a Task"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group mrgnbtm col-md-12">
                <label htmlFor="assignee">Assignee</label>
                <input
                  {...register('assignee')}
                  type="text"
                  className="form-control"
                  defaultValue={task.assignee}
                  name="assignee"
                  id="assignee"
                  placeholder="Assignee"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group mrgnbtm col-md-12">
                <label htmlFor="status">Status:</label>
                <select
                  {...register('status')}
                  name="status"
                  defaultValue={task.status}
                  className="form-control"
                  id="status"
                >
                  <option>To Be Done</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group mrgnbtm mrgnbtm col-md-12">
                <input type="submit" className="btn btn-primary w-100" />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
