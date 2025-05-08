import React, { useEffect, useState } from 'react';
import { getCustomers, saveCustomers } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', membershipType: '', startDate: '', isActive: true });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const data = getCustomers();
    setCustomers(data);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updated = customers.map(c =>
        c.id === editId ? { ...form, id: editId } : c
      );
      setCustomers(updated);
      saveCustomers(updated);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newCustomer = { ...form, id: uuidv4() };
      const updated = [...customers, newCustomer];
      setCustomers(updated);
      saveCustomers(updated);
    }

    setForm({ name: '', phone: '', membershipType: '', startDate: '', isActive: true });
  };

  const handleEdit = (id) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setForm(customer);
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const updated = customers.filter(c => c.id !== id);
    setCustomers(updated);
    saveCustomers(updated);
  };

  return (
    <div>
      <h2 className="mb-4">Customer Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="membershipType"
              value={form.membershipType}
              onChange={handleChange}
              required
            >
              <option value="">Membership</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-1">
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />
              <label className="form-check-label">Active</label>
            </div>
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-primary" type="submit">
              {isEditing ? 'Update' : 'Add'} Customer
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Membership</th>
            <th>Start Date</th>
            <th>Status</th>
            <th style={{ width: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.membershipType}</td>
              <td>{c.startDate}</td>
              <td>
                <span className={`badge ${c.isActive ? 'bg-success' : 'bg-secondary'}`}>
                  {c.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(c.id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
