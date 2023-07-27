import React, { useState, useEffect } from "react";
import "./servicelist.css";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [newServiceType, setNewServiceType] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
Jobs
  useEffect(() => {
    fetch("http://localhost:3001/service")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setServices([]);
      });
  }, []);

  const handleAddJobClick = (service) => {
    setSelectedService(service);
    setShowForm(true);
    setTitle("");
    setPrice("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!/^\d+(\.\d+)?$/.test(price) || parseFloat(price) <= 0) {
      setErrorMessage("Please enter a valid price.");
      return;
    }

    const jobData = {
      serviceid: selectedService.serviceid,
      title: title,
      price: parseFloat(price),
    };

    fetch("http://localhost:3001/job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then((jobData) => {
        const updatedService = {
          ...selectedService,
          Jobs: [...selectedService.Jobs, jobData],
        };
        const updatedServices = services.map((service) =>
          service.serviceid === updatedService.serviceid
            ? updatedService
            : service
        );
        setServices(updatedServices);
        setShowForm(false);
        setSelectedService(null);
        setTitle("");
        setPrice("");
        setSuccessMessage("Job added successfully!");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Failed to add the job. Please try again.");
        setSuccessMessage("");
      });
  };

  const handleAddNewServiceClick = () => {
    setShowNewServiceForm(true);
    setNewServiceType("");
    setNewDescription("");
  };

  const handleCancelNewService = () => {
    setShowNewServiceForm(false);
    setNewServiceType("");
    setNewDescription("");
  };

  const handleAddService = (event) => {
    event.preventDefault();
    if (!newServiceType || !newDescription) {
      setErrorMessage("Please enter both service type and description.");
      return;
    }

    const newServiceData = {
      servicetype: newServiceType,
      description: newDescription,
      Jobs: [],
    };

    fetch("http://localhost:3001/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newServiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        setServices([...services, data]);
        setShowNewServiceForm(false);
        setNewServiceType("");
        setNewDescription("");
        setSuccessMessage("New service added successfully!");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Failed to add the new service. Please try again.");
        setSuccessMessage("");
      });
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedService(null);
    setTitle("");
    setPrice("");
    setErrorMessage("");
  };

  const handleEditJobClick = (job) => {
    setEditingJob(job);
    setEditedTitle(job.title);
    setEditedPrice(job.price);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    if (!/^\d+(\.\d+)?$/.test(editedPrice) || parseFloat(editedPrice) <= 0) {
      setErrorMessage("Please enter a valid price.");
      return;
    }

    const updatedJobData = {
      ...editingJob,
      title: editedTitle,
      price: parseFloat(editedPrice),
    };

    fetch(`http://localhost:3001/job/${editingJob.jobid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJobData),
    })
      .then((response) => response.json())
      .then((updatedJob) => {
        const updatedService = {
          ...selectedService,
          Jobs: selectedService.Jobs.map((job) =>
            job.jobid === updatedJob.jobid ? updatedJob : job
          ),
        };
        const updatedServices = services.map((service) =>
          service.serviceid === updatedService.serviceid
            ? updatedService
            : service
        );
        setServices(updatedServices);
        setEditingJob(null);
        setEditedTitle("");
        setEditedPrice("");
        setSuccessMessage("Job updated successfully!");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Failed to update the job. Please try again.");
        setSuccessMessage("");
      });
  };
  const handleDeleteJob = (job) => {
    fetch(`http://localhost:3001/job/${job.jobid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state to remove the deleted job from the selected service
        const updatedService = {
          ...selectedService,
          Jobs: selectedService.Jobs.filter((j) => j.jobid !== job.jobid),
        };
        const updatedServices = services.map((service) =>
          service.serviceid === updatedService.serviceid
            ? updatedService
            : service
        );
        setServices(updatedServices);
        setSuccessMessage("Job deleted successfully!");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Failed to delete the job. Please try again.");
        setSuccessMessage("");
      });
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setEditedTitle("");
    setEditedPrice("");
    setErrorMessage("");
  };

  return (
    <div className="job-list">
      <h2>Service List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : services.length > 0 ? (
        <div className="service-cards">
          {services.map((service) => (
            <div className="service-card" key={service.serviceid}>
              <h3>{service.servicetype}</h3>
              <p>{service.description}</p>
              <button onClick={() => handleAddJobClick(service)}>
                Add Job
              </button>
              <div className="jobs">
                {service.Jobs && service.Jobs.length > 0 ? (
                  service.Jobs.map((job) =>
                    editingJob && editingJob.jobid === job.jobid ? (
                      <form key={job.jobid} onSubmit={handleEditFormSubmit}>
                        <div>
                          <label htmlFor="editedTitle">Job Title:</label>
                          <input
                            type="text"
                            id="editedTitle"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="editedPrice">Price (Rs):</label>
                          <input
                            type="text"
                            id="editedPrice"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                            required
                          />
                        </div>
                        {errorMessage && (
                          <p className="error-message">{errorMessage}</p>
                        )}
                        <div>
                          <button type="submit">Save</button>
                          <button type="button" onClick={handleCancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="job-card" key={job.jobid}>
                        <h4>{job.title}</h4>
                        <p>Rs. {job.price}</p>
                        <div>
                          <button onClick={() => handleEditJobClick(job)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteJob(job)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No jobs found.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No services found.</p>
      )}

      {showForm && selectedService && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Job Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price (Rs):</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {showNewServiceForm ? (
        <form onSubmit={handleAddService}>
          <div>
            <label htmlFor="newServiceType">Service Type:</label>
            <input
              type="text"
              id="newServiceType"
              value={newServiceType}
              onChange={(e) => setNewServiceType(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newDescription">Description:</label>
            <input
              type="text"
              id="newDescription"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <button type="submit">Submit New Service</button>
            <button type="button" onClick={handleCancelNewService}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleAddNewServiceClick}>Add New Service</button>
      )}
    </div>
  );
};

export default ServiceList;