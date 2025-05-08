// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import RevenueChart from '../components/RevenueChart';
import { getCustomers } from '../utils/storage';
import { getPayments } from '../utils/paymentStorage';

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setMembers(getCustomers());
    setPayments(getPayments());
  }, []);

  const totalMembers = members.length;

  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const getPaymentsThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return payments.filter(p => {
      const d = new Date(p.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
  };

  const paymentsThisMonth = getPaymentsThisMonth();

  const customersPaidThisMonth = new Set(paymentsThisMonth.map(p => p.customerId));

  const duePaymentsCount = members.filter(m => !customersPaidThisMonth.has(m.id)).length;

  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getCustomerName = (id) => {
    const c = members.find(m => m.id === id);
    return c ? c.name : 'Unknown';
  };

  return (
    <div>
      <h2 className="mb-4"></h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Members</h5>
              <p className="card-text fs-4">{totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text fs-4">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Payments Due</h5>
              <p className="card-text fs-4">{duePaymentsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="card mb-4">
        <div className="card-header">Recent Payments</div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p.id}>
                  <td>{getCustomerName(p.customerId)}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.date}</td>
                  <td>{p.method}</td>
                </tr>
              ))}
              {recentPayments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No recent payments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart */}
      <RevenueChart />
    </div>
  );
}
