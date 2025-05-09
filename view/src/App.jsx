import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Therapist from './pages/Therapist';
import BreathingExercise from './components/BreathingExercise';
import Challenge from './components/Challenge';
import MentalHealthResources from './components/Resources';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/therapist"
            element={
              <ProtectedRoute>
                <Therapist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/breathing"
            element={
              <ProtectedRoute>
                <BreathingExercise />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={

                <MentalHealthResources />

            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
