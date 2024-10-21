// __tests__/PropertyDetailsPage.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PropertyDetailsPage from '../PropertyDetailsPage';
import axios from 'axios';

jest.mock('axios');  // Mock axios to prevent actual API calls

describe('PropertyDetailsPage', () => {
  const mockProperty = {
    _id: '1',
    name: 'Property One',
    price: '100000',
    location: 'Location One',
    amenities: ['Pool', 'Gym'],
    image: 'image1.jpg'
  };

  test('renders property details correctly', async () => {
    axios.get.mockResolvedValue({ data: mockProperty });

    render(
      <MemoryRouter initialEntries={['/properties/1']}>
        <Route path="/properties/:id">
          <PropertyDetailsPage />
        </Route>
      </MemoryRouter>
    );

    const propertyName = await screen.findByText('Property One');
    expect(propertyName).toBeInTheDocument();

    const propertyPrice = await screen.findByText('Price: 100000');
    expect(propertyPrice).toBeInTheDocument();

    const propertyLocation = await screen.findByText('Location: Location One');
    expect(propertyLocation).toBeInTheDocument();

    const propertyAmenities = await screen.findByText('Amenities: Pool, Gym');
    expect(propertyAmenities).toBeInTheDocument();
  });
});
