import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./studentstab.css";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import mainimage from "../images/student03.png";

const StudentRowPDFDocument = ({ student }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      padding: "1cm",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "0.5cm",
    },
    studentInfo: {
      marginBottom: "0.5cm",
    },
    separator: {
      fontSize: "14px",
      textAlign: "center",
      marginBottom: "0.5cm",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Student Data</Text>
          <View style={styles.studentInfo}>
            <Text style={{ fontSize: "16px" }}>
              Student ID: {student.studentId}, Name: {student.firstname}{" "}
              {student.lastname}
            </Text>
            <Text style={{ fontSize: "14px" }}>Telephone: {student.tel}</Text>
            <Text style={{ fontSize: "14px" }}>
              Parent Telephone: {student.telparent}
            </Text>
            <Text style={{ fontSize: "14px" }}>Fether: {student.fether}</Text>
            <Text style={{ fontSize: "14px" }}>Rating: {student.rating}</Text>
            <Text style={styles.separator}>
              -----------------------------------
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const StudentsTab = () => {
  const [studentData, setStudentData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3001/student")
      .then((response) => response.json())
      .then((data) => setStudentData(data))
      .catch((error) => console.error("Error fetching student data:", error));

    fetch("http://localhost:3001/getassignmentlist")
      .then((response) => response.json())
      .then((data) => {
        // Convert data to an array if it's not already
        const assignmentArray = Array.isArray(data) ? data : [data];
        setAssignmentData(assignmentArray);
      })
      .catch((error) =>
        console.error("Error fetching assignment data:", error)
      );
  }, []);

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      padding: "1cm",
    },
    header: {
      marginBottom: "1cm",
      textAlign: "center",
    },
    headerImage: {
      width: "100%",
      height: "auto",
      maxWidth: "200px", // Adjust the size as needed
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "0.5cm",
    },
    studentInfo: {
      marginBottom: "0.5cm",
    },
    separator: {
      fontSize: "14px",
      textAlign: "center",
      marginBottom: "0.5cm",
    },
  });

  const PDFDocument = ({ studentData }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <img src={mainimage} width={500} alt="hero" />
            <Text style={styles.title}>Student Data</Text>
            {studentData.map((student, index) => (
              <View key={index} style={styles.studentInfo}>
                <Text style={{ fontSize: "16px" }}>
                  Student ID: {student.studentId}, Name: {student.firstname}{" "}
                  {student.lastname}
                </Text>
                <Text style={{ fontSize: "14px" }}>
                  Telephone: {student.tel}
                </Text>
                <Text style={{ fontSize: "14px" }}>
                  Parent Telephone: {student.telparent}
                </Text>
                <Text style={{ fontSize: "14px" }}>
                  Fether: {student.fether}
                </Text>
                <Text style={{ fontSize: "14px" }}>
                  Rating: {student.rating}
                </Text>
                <Text style={styles.separator}>
                  -----------------------------------
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className="usertable-container">
      <div className="print-option">
        <PDFDownloadLink
          document={<PDFDocument studentData={studentData} />}
          fileName="students.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : <button>Download Class Report</button>
          }
        </PDFDownloadLink>
      </div>
      <table className="usertable">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Telephone</th>
            <th>Parent Telephone</th>
            <th>Father</th>
            <th>Rating</th>
            <th>Print Row PDF</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => (
            <tr key={index}>
              <td>{student.studentId}</td>
              <td>
                {student.firstname} {student.lastname}
              </td>
              <td>{student.tel}</td>
              <td>{student.telparent}</td>
              <td>
                <div className="submiss">
                  <h1>{student.fether}</h1>
                  <h2>
                    <i className="fi fi-rr-feather"></i>
                  </h2>
                </div>
              </td>
              <td>
                <div className="submiss2">
                  <h1>{student.rating}</h1>
                  <h2>
                    <i className="fi fi-sr-star"></i>
                  </h2>
                </div>
              </td>
              <td>
                <PDFDownloadLink
                  document={<StudentRowPDFDocument student={student} />}
                  fileName={`student_${student.studentId}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <button>Student Report</button>
                  }
                </PDFDownloadLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTab;
