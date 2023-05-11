import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-test-api.aircall.io',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

const refreshInterval = 5 * 60 * 1000; 

const refreshAuthToken = async () => {
  try {
    const response = await axios.post('https://frontend-test-api.aircall.io/auth/refresh-token');
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  } catch (error) {
    console.error('Failed to refresh auth token:', error);
  }
};

// Call the refreshAuthToken function every 5 minutes
setInterval(refreshAuthToken, refreshInterval);

export default instance;
