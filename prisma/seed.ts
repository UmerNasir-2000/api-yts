// import {getTitleDetailsByIMDBId} from 'movier';

import { PrismaClient } from '@prisma/client';
import { Axios } from 'axios';

const axios = new Axios();

async function seed() {
  const prisma = new PrismaClient();

  const fetchedMovies = await axios.get(
    'https://yts.mx/api/v2/list_movies.json?quality=3D&limit=50',
  );

  console.log('fetchedMovies', JSON.stringify(fetchedMovies));
}

seed();
