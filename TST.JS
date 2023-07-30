</div>
      <div className="class-contentext">
        {classOptions.map((classOption) => (
          <div key={classOption.classId} className="class-folder">
            <h2>{classOption.className}.</h2>
            {classOption.Assignments.map((assigndata) => (
              <div key={assigndata.assignmentId}>
                {editingAssignment && editingAssignment.assignmentId === assigndata.assignmentId ? (
                  /* Editable form for the assignment */
                  <div className="assignment-item">
                    <input
                      type="text"
                      value={editingAssignment.title}
                      onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })}
                    />
                    <textarea
                      value={editingAssignment.content}
                      onChange={(e) => setEditingAssignment({ ...editingAssignment, content: e.target.value })}
                    ></textarea>
                    <div className="classli-buttons">
                      <div className="classli-removebtn">
                        <button onClick={handleSaveAssignment}>Save</button>
                      </div>
                      <div className="classli-editbtn">
                        <button onClick={() => setEditingAssignment(null)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Display the assignment details */
                  <div className="assignment-item">
                    <p>{assigndata.title}</p>
                    <p>{assigndata.content}</p>
                    <div className="classli-buttons">
                      <div className="classli-removebtn">
                        <button onClick={() => handleRemoveAssignmentClick(assigndata.assignmentId)}>Remove</button>
                      </div>
                      <div className="classli-editbtn">
                        <button onClick={() => handleEditAssignment(assigndata.assignmentId)}>Edit</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
