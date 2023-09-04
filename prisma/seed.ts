// import {getTitleDetailsByIMDBId} from 'movier';

import { PrismaClient } from '@prisma/client';
import { Axios } from 'axios';

const axios = new Axios({ baseURL: 'https://yts.mx/api/v2/' });

async function seed() {
  const prisma = new PrismaClient();

  const { data } = await axios.get('list_movies.json?quality=3D&limit=50');

  console.log('response', data);
}

seed();
