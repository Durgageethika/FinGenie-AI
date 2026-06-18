import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background:
          "linear-gradient(90deg,#0f2027,#203a43,#2c5364)"
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand"
          to="/dashboard"
        >
          💳 Finnova Bank
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/customers">
            Customers
          </Link>

          <Link className="nav-link" to="/accounts">
            Accounts
          </Link>

          <Link className="nav-link" to="/loans">
            Loans
          </Link>

          <Link className="nav-link" to="/investments">
            Investments
          </Link>

          <Link className="nav-link" to="/transactions">
            Transactions
          </Link>

          <Link className="nav-link" to="/fraudalerts">
            Fraud Alerts
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;