import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    organization: '',
    subject: '',
    rating: '',
    city: '',
    pincode: '',
    state: '',
    country: ''
  });

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/form/post`, formData); // Removed 'response'
    alert('Form submitted successfully!');
    fetchRecords(); // Fetch updated records
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit form');
  }
};


  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/form/get`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-3">
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <hr />
      <h2 className="text-center">Submitted Records</h2>
      <ul className="list-group">
        {records.map((record) => (
          <li key={record.id} className="list-group-item">
            {record.firstName} {record.lastName} - {record.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
