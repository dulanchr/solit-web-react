// Assignmentlist.jsx
import React from "react";

const Assignmentlist = ({ assignment, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(assignment.id);
  };

  const handleEdit = () => {
    // Implement editing logic here and update the assignment data accordingly
    // You can create an edit form or a modal to gather updated data from the user
    // and then call the onEdit function to update the assignment.
  };

  return (
    <div className="classassignmentlist-item">
      <h1>{assignment.title}</h1>
      <h2>{assignment.content}</h2>
      <p>{assignment.description}</p>
      <p>{assignment.deadline}</p>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Assignmentlist;
