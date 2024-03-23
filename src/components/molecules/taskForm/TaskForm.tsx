import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskTag, PointEstimate, Status } from 'src/api/response/typings';
import { TaskFormProps } from './typings';

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [estimateTime, setEstimateTime] = useState<PointEstimate>(
    PointEstimate.ZERO
  );
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      name: taskTitle,
      pointEstimate: PointEstimate[estimateTime],
      assigneeId: assignee,
      dueDate: dueDate?.toUTCString() || '',
      status: Status[Status.BACKLOG],
      tags: tags.map((tag) => tag as TaskTag),
    };

    onSubmit(newTask);
  };

  return (
    <div className="bg-neutral3 text-offWhite p-8 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
            className="block w-full rounded-md bg-neutral3 py-1.5 text-neutral1 text-xl"
            required
          />
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral1">
              Estimate Time
            </label>
            <select
              value={estimateTime}
              onChange={(e) =>
                setEstimateTime(
                  PointEstimate[e.target.value as keyof typeof PointEstimate]
                )
              }
              className="mt-1 p-2 w-full border rounded-md bg-neutral3 text-neutral1"
            >
              {Object.values(PointEstimate)
                .filter((value) => typeof value === 'string')
                .map((estimate) => (
                  <option key={estimate} value={estimate}>
                    {estimate}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral1">
              Assignee
            </label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md bg-neutral3 text-neutral1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral1">
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="mt-1 p-2 w-full border rounded-md bg-neutral3 text-neutral1"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral1">
              Tags
            </label>
            <select
              value={tags}
              multiple
              onChange={(e) =>
                setTags(
                  Array.from(
                    e.target.selectedOptions,
                    (option) => option.value as string
                  )
                )
              }
              className="mt-1 p-2 w-full border rounded-md bg-neutral3 text-neutral1"
              required
            >
              {Object.values(TaskTag)
                .filter((value) => typeof value === 'string')
                .map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-white px-4 py-2 rounded-md" onClick={onClose}>
            Cancel{' '}
          </button>
          <button
            type="submit"
            className="bg-primary4 text-white px-4 py-2 rounded-md"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
