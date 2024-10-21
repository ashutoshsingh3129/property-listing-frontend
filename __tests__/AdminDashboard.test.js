// __tests__/AdminDashboard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../AdminDashboard';
import axios from 'axios';

jest.mock('axios');  // Mock axios to prevent actual API calls

describe('AdminDashboard', () => {
  const mockProperties = [
    { _id: '1', name: 'Property One' },
    { _id: '2', name: 'Property Two' }
  ];

  test('renders properties in admin dashboard', async () => {
    axios.get.mockResolvedValue({ data: mockProperties });

    render(<AdminDashboard />);

    const propertyOne = await screen.findByText('Property One');
    const propertyTwo = await screen.findByText('Property Two');

    expect(propertyOne).toBeInTheDocument();
    expect(propertyTwo).toBeInTheDocument();
  });

  test('deletes a property when delete button is clicked', async () => {
    axios.get.mockResolvedValue({ data: mockProperties });
    axios.delete.mockResolvedValue({});

    render(<AdminDashboard />);

    const deleteButton = await screen.findByText('Delete', { selector: 'button' });

    fireEvent.click(deleteButton);

    expect(axios.delete).toHaveBeenCalledWith('/api/admin/properties/1');
  });
});
