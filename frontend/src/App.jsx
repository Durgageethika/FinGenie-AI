import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Loans from "./pages/Loans";
import Investments from "./pages/Investments";
import Transactions from "./pages/Transactions";
import FraudAlerts from "./pages/FraudAlerts";
import About from "./pages/About";

function Layout() {

  const location = useLocation();

  const showLayout = location.pathname !== "/";

  return (
    <>
      {showLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/fraudalerts" element={<FraudAlerts />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {showLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;