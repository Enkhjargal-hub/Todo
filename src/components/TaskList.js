import React from "react";

const TaskList = ({ tasks, handleBox, handleDelete, isLogView }) => {
  if (tasks.length === 0) {
    return <div className="No-Tasks">{isLogView ? "No logs available yet!" : "No tasks yet. Add one above!"}</div>;
  }

  return (
    <div className="Todo-List">
      {tasks.map((task) => (
        <div key={task.id} className="Task">
          {!isLogView && (
            <>
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                onChange={() => handleBox(task.id)}
              />
              <span>{task.text}</span>
              <button className="Delete" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </>
          )}
          {isLogView && (
            <div>
              <span>{task.text}</span>
              <div className="Task-Times">
                <span>Created: {task.createdAt}</span>
                {task.completedAt && <span>Completed: {task.completedAt}</span>}
                <span>Deleted: {task.deletedAt}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
