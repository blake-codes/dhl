import { BrowserRouter, Route, Routes } from "react-router-dom";
import TrackingForm from "./components/TrackingForm";
import { GlobalStyles } from "./styles/globalStyles";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/ Home";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking/:id" element={<TrackingForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
