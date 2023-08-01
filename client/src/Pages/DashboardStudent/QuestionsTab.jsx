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
  const [removingQuestionId, setRemovingQuestionId] = useState(null);

  const handleRemoveQuestionClick = (questionId) => {
    setConfirmRemove(true);
    setRemovingQuestionId(questionId);
  };

  const handleCancelClick = () => {
    setConfirmRemove(false);
    setRemovingQuestionId(null);
  };

  const [myQuestions, setMyQuestions] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:3001/question/${id}`)
      .then((response) => {
        // Check if response.data is an array before setting it
        if (Array.isArray(response.data)) {
          setMyQuestions(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching class options:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveAssignment = async (questionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/question/remove/${questionId}`,
        {}
      );
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleRemoveAssignmentConfirm = async () => {
    if (removingQuestionId) {
      await handleRemoveAssignment(removingQuestionId);
      setConfirmRemove(false);
      setRemovingQuestionId(null);
    }
  };

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
              value={formData.contentpdf}
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
        {myQuestions.map((classOption) => (
          <div key={classOption.questionId} className="class-folder">
            <h2
              style={{
                marginTop: "2vh",
                fontSize: "1.5rem",
                color: "#232323",
                opacity: "0.5",
              }}
            >
              {classOption.description}
            </h2>
            {classOption.Answers.length === 0 ? (
              <div className="myqueanswelist">
                <h1
                  style={{
                    marginTop: "0vh",
                    fontSize: "1rem",
                    color: "#00000020",
                  }}
                >
                  No Answers Here Yet <i class="fi fi-rs-sad-tear"></i>
                </h1>
              </div>
            ) : (
              <div className="myqueanswelist">
                <h1
                  style={{
                    marginTop: "0vh",
                    fontSize: "1.2rem",
                    color: "#00000060",
                  }}
                >
                  Answers :
                </h1>
                {classOption.Answers.map((answer) => (
                  <>
                    {" "}
                    <div key={answer.answerId} className="answermyques">
                      <h1
                        style={{
                          marginTop: "0vh",
                          fontSize: "1.2rem",
                          color: "#00000080",
                        }}
                      >
                        <i class="fi fi-bs-bullet"></i>
                        {answer.reply}
                      </h1>
                      {answer.User && (
                        <h1
                          style={{
                            marginTop: "0vh",
                            fontSize: "0.7rem",
                            color: "#00000080",
                            fontWeight: "100",
                          }}
                        >
                          posted by, {answer.User.email}
                        </h1>
                      )}
                    </div>
                  </>
                ))}
              </div>
            )}
            {/* {classOption.Answer.map((answeData) => (
              <div key={answeData.answerId}>
                <div className="asssignment-item">
                  <p
                    style={{
                      marginTop: "2vh",
                      fontSize: "1.5rem",
                      color: "#000",
                      opacity: "0.5",
                    }}
                  >
                    {answeData.reply}
                  </p>
                  <p
                    style={{
                      marginTop: "2vh",
                      fontSize: "1rem",
                      color: "#000",
                      opacity: "0.5",
                    }}
                  >
                    {answeData.contentpdf}
                  </p>
                </div>
              </div>
            ))} */}
            <div className="classli-buttons">
              <div className="classli-removebtn">
                <button
                  onClick={() =>
                    handleRemoveQuestionClick(classOption.questionId)
                  }
                >
                  Remove Question
                </button>
              </div>
            </div>
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
                <i className="fi fi-rr-envelope-download"></i>
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
