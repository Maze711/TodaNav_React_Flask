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
      timestamp: "April 30, 2025 10:00 AM",
    },
    {
      id: 2,
      img: News2,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
      timestamp: "May 5, 2025 10:00 AM",
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
    timestamp: "",
  });

  const handleShow = () => {
    const now = new Date();
    const formatted = now.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setFormData((prev) => ({ ...prev, timestamp: formatted }));
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      title: "",
      image: "",
      type: "",
      body: "",
      timestamp: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new news item to the list on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNews = {
      id: newsList.length + 1,
      img: formData.image || News1,
      type: formData.type,
      content: formData.body,
      timestamp: formData.timestamp,
    };
    setNewsList((prev) => [newNews, ...prev]);
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

        <div
          className="d-flex flex-wrap px-1"
          style={{ gap: "20px", justifyContent: "start" }}
        >
          {newsList.map((news) => (
            <div
              key={news.id}
              className="p-2"
              style={{
                flex: "0 0 calc(50% - 20px)",
                maxWidth: "calc(50% - 20px)",
                boxSizing: "border-box",
              }}
            >
              <img
                className="rounded-5 w-100"
                src={news.img}
                alt={`News ${news.id}`}
                style={{ objectFit: "cover", height: "180px" }}
              />
              <p className="mt-2 small text-muted">Uploaded: {news.timestamp}</p>
              <p className="mt-1 small" style={{ textAlign: "justify" }}>
                <strong>{news.type}:</strong> {news.content}
              </p>
              <div className="d-flex gap-2 mt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => console.log(`Edit news id: ${news.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => console.log(`Delete news id: ${news.id}`)}
                >
                  Delete
                </Button>
              </div>
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
  