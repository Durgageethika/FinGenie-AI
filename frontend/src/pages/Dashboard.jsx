import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaUsers,
  FaUniversity,
  FaMoneyBillWave,
  FaChartLine,
  FaExchangeAlt,
  FaExclamationTriangle
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
    }

}, [navigate]);

const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
};

  const [customerCount, setCustomerCount] = useState(0);
  const [accountCount, setAccountCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);
  const [investmentCount, setInvestmentCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [fraudCount, setFraudCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const customers = await API.get("/customers");
      const accounts = await API.get("/accounts");
      const loans = await API.get("/loans");
      const investments = await API.get("/investments");
      const transactions = await API.get("/transactions");
      const fraudalerts = await API.get("/fraudalerts");

      setCustomerCount(customers.data.length);
      setAccountCount(accounts.data.length);
      setLoanCount(loans.data.length);
      setInvestmentCount(investments.data.length);
      setTransactionCount(transactions.data.length);
      setFraudCount(fraudalerts.data.length);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-5">

  <div>
    <h1 className="fw-bold">
      🏦 Finnova Banking Dashboard
    </h1>

    <p className="text-muted">
      Banking Management System
    </p>
  </div>

  <button
    className="btn btn-danger"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <FaUsers size={45} />
              <h4 className="mt-2">Customers</h4>
              <h2>{customerCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <FaUniversity size={45} />
              <h4 className="mt-2">Accounts</h4>
              <h2>{accountCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-warning text-dark shadow">
            <div className="card-body text-center">
              <FaMoneyBillWave size={45} />
              <h4 className="mt-2">Loans</h4>
              <h2>{loanCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white shadow">
            <div className="card-body text-center">
              <FaChartLine size={45} />
              <h4 className="mt-2">Investments</h4>
              <h2>{investmentCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-secondary text-white shadow">
            <div className="card-body text-center">
              <FaExchangeAlt size={45} />
              <h4 className="mt-2">Transactions</h4>
              <h2>{transactionCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <FaExclamationTriangle size={45} />
              <h4 className="mt-2">Fraud Alerts</h4>
              <h2>{fraudCount}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow p-4 mt-3">

        <h3 className="mb-3">
          Quick Navigation
        </h3>

        <div className="d-flex flex-wrap gap-2">

          <Link className="btn btn-primary" to="/customers">
            Customers
          </Link>

          <Link className="btn btn-success" to="/accounts">
            Accounts
          </Link>

          <Link className="btn btn-warning" to="/loans">
            Loans
          </Link>

          <Link className="btn btn-info" to="/investments">
            Investments
          </Link>

          <Link className="btn btn-secondary" to="/transactions">
            Transactions
          </Link>

          <Link className="btn btn-danger" to="/fraudalerts">
            Fraud Alerts
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;