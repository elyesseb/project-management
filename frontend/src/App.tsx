import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import UserGuard from "./components/UserGuard";
import EditProjectForm from "./components/EditProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/projects/edit/:id" element={<EditProjectForm />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route
          path="/dashboard"
          element={
            <UserGuard>
              <Dashboard />
            </UserGuard>
          }
        />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </>
  );
}

export default App;
