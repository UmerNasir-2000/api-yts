import axios from 'axios';

async function seed() {
  const response = await axios.get(
    'https://yts.mx/api/v2/list_movies.json?limit=50',
  );

  console.log('response.data >> ', response.data);
}

seed();
