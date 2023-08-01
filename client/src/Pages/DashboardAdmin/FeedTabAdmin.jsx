import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../DashboardTutor/feedtab.css";
import profilePicture from "./profile~1.jpg";
import FeedGrid from "../DashboardTutor/FeedGrid";

export default function FeedTabAdmin() {
  const { id } = useParams();

  return (
    <div>
      <div>
        <h1>You're now logged in as an admin</h1>
        <FeedGrid />
      </div>
    </div>
  );
}
