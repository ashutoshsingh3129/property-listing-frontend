import axios from 'axios';

// Create a reusable Axios function
export const axiosRequest = async (method, url, data = {}, params = {} ,header) => {
  try {
    // Set up headers
    let headers={...header}
     
    headers['Authorization']= `Bearer ${localStorage.getItem('token')}`, // Assuming you're using a Bearer token
    

    // Make the axios request
     url=process.env.REACT_APP_API_BASE_URL+url
     console.log("uuu",url)
    const response = await axios({
      method,     // The HTTP method (GET, POST, PUT, DELETE)
      url,        // The request URL
      data,       // Request body (for POST, PUT)
      params,     // Query parameters (for GET, DELETE)
      headers,    // Headers (includes authorization token)
    });

    // Return the response data
    return response.data;

  } catch (error) {
    // Handle any errors
    console.error('Error in axiosRequest:', error);
    throw error; // Optionally re-throw the error to be handled by the calling function
  }
};

// Example usage of the function
const fetchData = async () => {
  const method = 'GET'; // You can change this to POST, PUT, DELETE, etc.
  const url = 'https://api.example.com/resource'; // Your API endpoint
  const params = { page: 1, limit: 10 }; // Query parameters
  const token = 'your-jwt-token'; // Your authorization token

  try {
    const data = await axiosRequest({ method, url, params, token });
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
