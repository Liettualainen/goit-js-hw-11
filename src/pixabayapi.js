import axios from 'axios';
export { pixabayApiImages };

// const axios = require('axios');
  
  const url = 'https://pixabay.com/api/';
  const key = '30904237-89ef4380cd88db989fbe73792';  

async function pixabayApiImages (name, page, perPage) {
  perPage = 40;
  try {
    const response = await axios(`${url}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
