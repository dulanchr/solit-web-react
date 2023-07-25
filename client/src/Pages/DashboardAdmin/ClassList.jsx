import React, { useEffect, useState } from "react";
import "./classlist.css";

export default function ClassList() {
  // State to hold the fetched class data
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch the class data from the API endpoint
    fetch("http://localhost:3001/classcards")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching class data:", error));
  }, []);

  const handleEdit = (classId) => {
    console.log("Editing class with ID:", classId);
  };

  const handleRemove = (classId) => {
    console.log("Removing class with ID:", classId);

    fetch(`http://localhost:3001/classcards/${classId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // If the class was successfully deleted from the database, update the state to remove the class from the UI.
        setClasses((prevClasses) =>
          prevClasses.filter((cls) => cls.id !== classId)
        );
      })
      .catch((error) => console.error("Error deleting class:", error));
  };

  return (
    <div className="classli-list">
      <h2>Class List</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id} className="classli-item">
            <div className="classli-info">
              <h3 className="classli-title">{cls.className}</h3>
              <p className="classli-location">Location: {cls.location}</p>
              <p className="classli-location">
                At, {cls.time} on {cls.date}
              </p>
            </div>
            <div className="classli-buttons">
              <div className="classli-removebtn">
                <button onClick={() => handleRemove(cls.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
