// __tests__/SignupPage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SignupPage from '../SignupPage';
import axios from 'axios';

jest.mock('axios');  // Mock axios to prevent actual API calls

describe('SignupPage', () => {
  test('renders signup form correctly', () => {
    render(<SignupPage />);

    // Check if the form elements are present
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('submits form and makes API call', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User signed up successfully' } });

    render(<SignupPage />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Sign Up'));

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`,
      { name: 'John', email: 'john@example.com', password: 'password123' }
    );
  });
});
