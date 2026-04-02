import React, { useState } from 'react';
import './App.css';

function App() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Errors state
  const [errors, setErrors] = useState({});
  
  // Success message state
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes (Controlled Components)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (validateForm()) {
      // Simulate successful submission
      console.log('Form Submitted Successfully:', formData);
      
      setSuccessMessage('✅ Registration successful! Welcome aboard.');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setErrors({});
      
      // Clear success message after 4 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  };

  return (
    <div className="form-app">
      <div className="form-container">
        <h1>User Registration</h1>
        <p className="subtitle">Please fill in your details</p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;