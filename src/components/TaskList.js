import React from "react";

const TaskList = ({ tasks, handleBox, handleDelete, isLogView }) => {
  return (
    <div className="Todo-List">
      {isLogView ? (
        tasks.length === 0 ? (
          <div className="No-Tasks">No logs available yet!</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="Task">
              <span>{task.text}</span>
              <div className="Task-Times">
                <span>Created: {task.createdAt}</span>
                {task.completedAt && <span>Completed: {task.completedAt}</span>}
                <span>Deleted: {task.deletedAt}</span>
              </div>
            </div>
          ))
        )
      ) : tasks.length === 0 ? (
        <div className="No-Tasks">No tasks yet. Add one above!</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="Task">
            <input
              type="checkbox"
              onChange={() => handleBox(task.id)}
              checked={task.status === "Completed"}
            />
            <span>{task.text}</span>
            <button className="Delete" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
