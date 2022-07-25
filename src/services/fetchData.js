import axios from 'axios';

export async function fetchData() {
  try {
    const data = await axios.get(process.env.REACT_APP_API_HOST);
    console.log('data', data.data);
    return data.data;
  }
  catch (error) {
    console.error(`Error trying to fetch coordinates: ${error.message}`);
  }
}
