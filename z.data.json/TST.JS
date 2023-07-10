import React, { useState, useEffect } from "react";
import EventCards from "../../eventCards/EventCards";
import { Col, Row } from "react-bootstrap";
import img from '../../Assests/card_1.jpg';
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Events() {
  const { id } = useParams();
  const [serviceId, setServiceId] = useState(null);
  const [serviceNames, setServiceNames] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setServiceNames(id);
      try {
        const response = await axios.get("http://localhost:3001/secervisdetails");
        const data = response.data;

        const relevantService = data.find(service => service.serviceName === id);

        if (relevantService) {
          setServiceId(relevantService.serviceId);
          // console.log(serviceId);
          

          //corrected code
          const response = await axios.get(`http://localhost:3001/secervisdetails/ServiceproviderDetails/${serviceId}`);
          
          setCompanyName(response.data);
          console.log(companyName);
        //  console.log(response.data);
          // Now you can work with the providerResponse data
          // For example, you can loop through the array of objects and log the CompanyName:
        

          // console.log(providerResponse);
         
        //  console.log(providerData);

          // console.log(providerData.CompanyName);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  return (
    <div style={{ marginTop: "10%" }}>
      <h1>{serviceNames}</h1>
      {serviceId && <p>Service ID: {serviceId}</p>}
     
      {companyName.map((company) => (
        <p>{company.CompanyName}</p>
            ))}

<Row style={{width:"100%", padding:"0 4% 0 "}}>
  {companyName.map((company) => {
    return (
      <Col lg={3} md={6}>


<Card style={{ width: '18rem', top: "10vh", color: "black", backgroundColor: '#1B1B1B', fontWeight: "700", color: "white" }}>
  <Card.Img variant="top" alt="holder.js/100px180" src={img} />
  <Card.Body>
    <Card.Title style={{ color: "white" }}>{company.CompanyName}</Card.Title>
    <Card.Text>

    </Card.Text>
    <Button variant="primary" style={{ backgroundColor: "#17599C" }}
     onClick={() => {
      navigate(`portfolio/${company.ServiceproviderID}`);
      console.log(company.ServiceproviderID);
    }}
    >View Portfolio</Button>
  </Card.Body>
</Card>

      </Col>
    );
  })}
</Row>


    </div>
  );
}