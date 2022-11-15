import React from "react";
import { useDeleteTaskMutation } from "store/services/tasks";

export const ListItem = ({ id, title, readOnly }) => {
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleDelete = () => deleteTask(id);

  return (
    <div className="list__item">
      <span>{title}</span>
      {!readOnly && (
        <button onClick={handleDelete} disabled={isDeleting}>
          DELETE
        </button>
      )}
    </div>
  );
};
