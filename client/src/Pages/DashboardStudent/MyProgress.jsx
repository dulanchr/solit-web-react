import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProgress = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/userinfo");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myprog-profile-form">
      <h1>Profile Detail Form</h1>
      <form>
        <div className="myprog-form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            defaultValue={userInfo.firstname}
            required
          />
        </div>

        <div className="myprog-form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            defaultValue={userInfo.lastname}
            required
          />
        </div>

        <div className="myprog-form-group">
          <label htmlFor="father">Father's Name:</label>
          <input
            type="text"
            id="father"
            name="father"
            defaultValue={userInfo.father}
          />
        </div>

        {/* ... Add other form fields here ... */}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MyProgress;
