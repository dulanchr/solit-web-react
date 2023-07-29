import React, { useState, useEffect } from "react";
import "./coursestab.css";
import "./assignmentstab.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignmentsTab() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    classId: "",
    title: "",
    description: "",
    content: "",
    deadline: "",
  });

  const [formErrors, setFormErrors] = useState({
    classId: "",
    title: "",
    description: "",
    content: "",
    deadline: "",
  });

  const [classOptions, setClassOptions] = useState([]);

  const [classAssignments, setClassAssignments] = useState({});

  const isLoggedIn = () => {
    return !!getAccessToken();
  };

  const fetchData = () => {
    axios
      .get("http://localhost:3001/class")
      .then((response) => {
        setClassAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching class options:", error);
      });

    fetch("http://localhost:3001/class")
      .then((response) => response.json())
      .then((data) => {
        setClassAssignments(data);
        setClassOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching class options:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn()) {
      console.log("User not logged in. Please log in to create assignments.");
      return;
    }
    let hasErrors = false;
    const newFormErrors = {
      classId: "",
      title: "",
      description: "",
      content: "",
      deadline: "",
    };

    if (formData.classId === "") {
      newFormErrors.classId = "Required.";
      hasErrors = true;
    }

    if (formData.title.trim() === "") {
      newFormErrors.title = "Required.";
      hasErrors = true;
    }

    if (formData.description.trim() === "") {
      newFormErrors.description = "Required.";
      hasErrors = true;
    }

    if (formData.content.trim() === "") {
      newFormErrors.content = "Required.";
      hasErrors = true;
    } else if (!isValidUrl(formData.content.trim())) {
      newFormErrors.content = "Enter a valid link.";
      hasErrors = true;
    }

    if (formData.deadline && formData.deadline.trim() === "") {
      newFormErrors.deadline = "Required";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/assignment",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Assignment created:", data);
        setFormData({
          classId: "",
          title: "",
          description: "",
          content: "",
          deadline: "",
        });
        fetchData(); // Refetch the assignments data after creating a new assignment
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleRemoveAssignment = async (assignmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/assignment/${assignmentId}`,
        {
          // headers: {
          //   Authorization: `Bearer ${getAccessToken()}`,
          // },
        }
      );
      if (response.status === 200) {
        // Assignment was deleted successfully, so you may want to update the state
        // and refresh the assignment list to reflect the changes.
        // For example, you can refetch the assignments data after deletion.
        fetchData(); // Refetch the assignments data after deletion
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [removingAssignmentId, setRemovingAssignmentId] = useState(null);

  const handleRemoveAssignmentClick = (assignmentId) => {
    setConfirmRemove(true);
    setRemovingAssignmentId(assignmentId);
  };

  const handleCancelClick = () => {
    setConfirmRemove(false);
    setRemovingAssignmentId(null);
  };

  const handleRemoveAssignmentConfirm = async () => {
    if (removingAssignmentId) {
      await handleRemoveAssignment(removingAssignmentId);
      setConfirmRemove(false);
      setRemovingAssignmentId(null);
    }
  };
  return (
    <div className="coursecontorls">
      <div className="addcourses">
        <h2 style={{ marginTop: "0vh", fontSize: "1.5rem", color: "#232323" }}>
          Add Assignments:
        </h2>
        <form className="addc-form" onSubmit={handleSubmit}>
          <div className="addc-form-group">
            <label htmlFor="classId">Class:</label>
            <select
              id="classId"
              name="classId"
              value={formData.classId}
              onChange={handleChange}
            >
              <option value="">-- Select Class --</option>
              {classOptions.map((option) => (
                <option key={option.classId} value={option.classId}>
                  {option.className}
                </option>
              ))}
            </select>
            {formErrors.classId && (
              <span className="error">{formErrors.classId}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the title"
            />
            {formErrors.title && (
              <span className="error">{formErrors.title}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
            ></textarea>
            {formErrors.description && (
              <span className="error">{formErrors.description}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter the drive link (URL)"
            />
            {formErrors.content && (
              <span className="error">{formErrors.content}</span>
            )}
          </div>
          <div className="addc-form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
            {formErrors.deadline && (
              <span className="error">{formErrors.deadline}</span>
            )}
          </div>
          <button type="submit" className="addc-btn">
            Add
          </button>
        </form>
      </div>
      <div className="class-contentext">
        {classOptions.map((classOption) => (
          <div key={classOption.classId} className="class-folder">
            <h2
              style={{
                marginTop: "2vh",
                fontSize: "1.5rem",
                color: "#232323",
                opacity: "0.5",
              }}
            >
              {classOption.className}
              {"."}
            </h2>
            {classOption.Assignments.map((assigndata) => (
              <div key={assigndata.assignmentId}>
                <div className="asssignment-item">
                  <p
                    style={{
                      marginTop: "2vh",
                      fontSize: "1.5rem",
                      color: "#000",
                      opacity: "0.5",
                    }}
                  >
                    {assigndata.title}
                  </p>
                  <p
                    style={{
                      marginTop: "2vh",
                      fontSize: "1rem",
                      color: "#000",
                      opacity: "0.5",
                    }}
                  >
                    {assigndata.content}
                  </p>
                  <div className="classli-buttons">
                    <div className="classli-removebtn">
                      <button
                        onClick={() =>
                          handleRemoveAssignmentClick(assigndata.assignmentId)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Confirmation popup */}
      {confirmRemove && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Delete the assignment!</p>
              <h1>
                <i class="fi fi-rr-envelope-download"></i>
              </h1>
              <p>Please note that this action can't be reversed!</p>
              <button onClick={handleRemoveAssignmentConfirm}>Ok</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
