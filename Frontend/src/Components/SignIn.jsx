import { useState } from 'react';
import toast from 'react-hot-toast';

export const SignIn = ({ setIsSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <h3 className="mb-3 fw-bold text-center">LOGIN</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">Alumni ID</label>
          <input
            type="email"
            className="form-control p-2"
            id="email"
            name="email"
            placeholder="Enter your Alumni ID"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-medium">Password</label>
          <input
            type="password"
            className="form-control p-2"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#" className="text-decoration-none">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100 p-2 mb-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            'Log in'
          )}
        </button>
        
        <div className="text-center">
          <p className="mb-0">Don't have an account? <a href="#" className="text-decoration-none" onClick={(e) => {e.preventDefault(); setIsSignUp(true);}}>Sign up</a></p>
        </div>
      </form>
    </div>
  );
};