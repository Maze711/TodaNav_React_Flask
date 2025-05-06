import { useState } from 'react';
import toast from 'react-hot-toast';

export const SignUp = ({ setIsSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Fill all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('Agree to Terms');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Account created!');
    } catch (error) {
      toast.error('Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <h3 className="mb-3 fw-bold text-center">Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label htmlFor="firstName" className="form-label fw-medium">First Name</label>
            <input
              type="text"
              className="form-control p-2"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="lastName" className="form-label fw-medium">Last Name</label>
            <input
              type="text"
              className="form-control p-2"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">Email</label>
          <input
            type="email"
            className="form-control p-2"
            id="email"
            name="email"
            placeholder="Enter your email"
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm Password</label>
          <input
            type="password"
            className="form-control p-2"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="agreeTerms">
              I agree to <a href="#" className="text-decoration-none">Terms</a>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100 p-2 mb-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            'Create Account'
          )}
        </button>
        
        <div className="text-center">
          <p className="mb-0">Already have an account? <a href="#" className="text-decoration-none" onClick={(e) => {e.preventDefault(); setIsSignUp(false);}}>Sign in</a></p>
        </div>
      </form>
    </div>
  );
};