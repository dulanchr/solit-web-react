import React, { useState, useEffect } from "react";
import "../DashboardTutor/coursestab.css";
import "../DashboardTutor/assignmentstab.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuestionsTab() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    description: "",
    contentpdf: "",
    userId: id,
    likes: "0",
  });

  const [formErrors, setFormErrors] = useState({
    description: "",
    contentpdf: "",
    userId: id,
    likes: "0",
  });
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleRemoveAssignmentClick = () => {};
  const [classOptions, setclassOptions] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCancelClick = () => {};

  const handleRemoveAssignmentConfirm = async () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/question",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log("Question created:", data);
        setFormData({
          description: "",
          contentpdf: "",
          userId: id,
          likes: "0",
        });
      }
    } catch (error) {
      console.error("Error posting the question:", error);
    }
  };

  return (
    <div className="coursecontorls">
      <div className="addcourses">
        <h2 style={{ marginTop: "0vh", fontSize: "1.5rem", color: "#232323" }}>
          Post a Question
        </h2>
        <form className="addc-form" onSubmit={handleSubmit}>
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
              <span className="error">{formErrors.contentpdf}</span>
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
              My Questions
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
              <p>Delete the Question</p>
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
