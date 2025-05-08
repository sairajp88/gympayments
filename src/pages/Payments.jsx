import React, { useEffect, useState } from 'react';
import { getCustomers } from '../utils/storage';
import { getPayments, savePayments } from '../utils/paymentStorage';
import { v4 as uuidv4 } from 'uuid';

export default function Payments() {
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    customerId: '',
    amount: '',
    date: '',
    method: 'Cash',
  });

  useEffect(() => {
    setCustomers(getCustomers());
    setPayments(getPayments());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPayment = {
      id: uuidv4(),
      ...form,
      amount: parseFloat(form.amount),
    };

    const updated = [...payments, newPayment];
    setPayments(updated);
    savePayments(updated);

    setForm({
      customerId: '',
      amount: '',
      date: '',
      method: 'Cash',
    });
  };

  const getCustomerName = (id) => {
    const c = customers.find(c => c.id === id);
    return c ? c.name : 'Unknown';
  };

  return (
    <div>
      <h2 className="mb-4">Payment Management</h2>

      {/* Add Payment Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <select
              className="form-select"
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="method"
              value={form.method}
              onChange={handleChange}
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-success" type="submit">Add Payment</button>
          </div>
        </div>
      </form>

      {/* Payment History Table */}
      <div className="card">
        <div className="card-header">All Payments</div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{getCustomerName(p.customerId)}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.date}</td>
                  <td>{p.method}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
