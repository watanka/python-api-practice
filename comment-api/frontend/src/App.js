import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostCreate from './PostCreate';
import './App.css';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts/create" element={<PostCreate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
