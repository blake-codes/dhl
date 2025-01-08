import { BrowserRouter, Route, Routes } from "react-router-dom";
import TrackingForm from "./components/TrackingForm";
import { GlobalStyles } from "./styles/globalStyles";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/ Home";
import Login from "./pages/Login";
import Track from "./pages/Track";
import Dashboard from "./pages/Dashboard";
import AddShipmentOrder from "./pages/AddShipmentOrder";
import Order from "./pages/Order";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking/:id" element={<TrackingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/track" element={<Track />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-shipment-order" element={<AddShipmentOrder />} />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
