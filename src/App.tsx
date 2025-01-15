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
import EditShipmentOrder from "./pages/EditShipmentOrder";
import AddMovement from "./pages/AddMovement";
import ProtectedRoute from "./components/ProtectedRoute";
import Ship from "./pages/Ship";
import Messages from "./pages/Messages";
import CustomerService from "./pages/CustomerService";
import MessageDetails from "./pages/MessageDetails";
import EnterpriseLogistics from "./pages/EnterpriseLogistics";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking/:id" element={<TrackingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/track/:trackingNumber" element={<Track />} />
          <Route path="/ship" element={<Ship />} />
          <Route path="/help" element={<CustomerService />} />
          <Route path="/services" element={<EnterpriseLogistics />} />
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-shipment-order" element={<AddShipmentOrder />} />
            <Route
              path="/edit-order/:trackingNumber"
              element={<EditShipmentOrder />}
            />
            <Route
              path="/add-movement/:trackingNumber"
              element={<AddMovement />}
            />
          </Route>
          <Route element={<ProtectedRoute redirectTo="/" requireAdmin />}>
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:id" element={<MessageDetails />} />
          </Route>

          <Route path="/order/:trackingNumber" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
