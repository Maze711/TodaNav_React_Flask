import React, { useState } from "react";
import { SideNav } from "../../../Components/SideNav";
import { useSidebar } from "../../../contexts/SideBarContext";
import { Button, Modal, Form } from "react-bootstrap";
import News1 from "../../../assets/img/News1.jpg";
import News2 from "../../../assets/img/BgforBooking.jpg";

export const AdminNews = () => {
  const { isOpen } = useSidebar();

  // Sample news list similar to Home.jsx
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      img: News1,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
    },
    {
      id: 2,
      img: News2,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
    },
  ]);

  // Modal visibility state
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    type: "",
    body: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      title: "",
      image: "",
      type: "",
      body: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For now, just log the form data on submit and close modal
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New News Item:", formData);
    // Here you can add logic to add the new news item to the list or send to backend
    handleClose();
  };

  return (
    <div className="d-flex">
      <SideNav />
      <div
        className="content-area flex-grow-1 min-vh-100"
        style={{
          marginLeft: isOpen ? "250px" : "89px",
          padding: "20px",
          transition: "margin-left 0.3s",
        }}
      >
        <h4>Admin News Section</h4>
        <Button variant="primary" onClick={handleShow} className="mb-3">
          Add News
        </Button>

        <div className="d-flex overflow-auto px-1" style={{ gap: "20px" }}>
          {newsList.map((news) => (
            <div
              key={news.id}
              className="p-2"
              style={{
                flex: "0 0 auto",
                maxWidth: "400px",
              }}
            >
              <img
                className="rounded-5 w-100"
                src={news.img}
                alt={`News ${news.id}`}
                style={{ objectFit: "cover", height: "180px" }}
              />
              <p className="mt-2 small" style={{ textAlign: "justify" }}>
                <strong>{news.type}:</strong> {news.content}
              </p>
            </div>
          ))}
        </div>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add News</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formType">
                <Form.Label>Type of News</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Road Incident">Road Incident</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Road Accident">Road Accident</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBody">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter news content"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add News
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
  