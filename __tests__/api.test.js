// // __tests__/api.test.js
// import axios from 'axios';
// import { fetchProperties, deleteProperty } from '../api';  // Assuming you have these service functions

// jest.mock('axios');

// describe('API Service', () => {
//   it('fetches properties from the API', async () => {
//     const mockProperties = [{ _id: '1', name: 'Property One' }];
//     axios.get.mockResolvedValue({ data: mockProperties });

//     const properties = await fetchProperties();
//     expect(properties).toEqual(mockProperties);
//   });

//   it('deletes a property using the API', async () => {
//     axios.delete.mockResolvedValue({});

//     await deleteProperty('1');
//     expect(axios.delete).toHaveBeenCalledWith('/api/properties/1');
//   });
// });
