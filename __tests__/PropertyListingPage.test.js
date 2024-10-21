// __tests__/PropertyListingPage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyListingPage from '../PropertyListingPage';
import axios from 'axios';

jest.mock('axios');  // Mock axios to prevent actual API calls

describe('PropertyListingPage', () => {
  const mockProperties = [
    { _id: '1', name: 'Property One', price: '100000', location: 'Location One', image: 'image1.jpg' },
    { _id: '2', name: 'Property Two', price: '200000', location: 'Location Two', image: 'image2.jpg' }
  ];

  test('renders property listings correctly', async () => {
    axios.get.mockResolvedValue({ data: mockProperties });

    render(<PropertyListingPage />);

    // Ensure the property names and details appear on the screen
    const propertyOne = await screen.findByText('Property One');
    const propertyTwo = await screen.findByText('Property Two');

    expect(propertyOne).toBeInTheDocument();
    expect(propertyTwo).toBeInTheDocument();
  });

  test('filters properties based on user input', async () => {
    axios.get.mockResolvedValue({ data: mockProperties });

    render(<PropertyListingPage />);

    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'Location One' } });

    const propertyOne = await screen.findByText('Property One');
    expect(propertyOne).toBeInTheDocument();
  });
});
