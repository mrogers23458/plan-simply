import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import SignupPage from "./pages/signup/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { AppStateProvider } from "./providers/AppStateProvider";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppStateProvider>
    </div>
  );
}

export default App;
